const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

const rooms = new Map();
const SERVER_CHAT_LIMITS = {
  cooldownMs: 1800,
  windowMs: 15000,
  maxMessagesPerWindow: 5,
  maxCharsPerWindow: 520,
  maxLength: 180,
};

const BLOCKED_PATTERNS = [
  /discord/i,
  /snapchat|snap/i,
  /whatsapp/i,
  /telegram/i,
  /kik/i,
  /dm me|private chat|secret chat/i,
  /send pic|photo of you|selfie/i,
  /meet up|meet me|come alone/i,
  /sexual|sexy|nude|naked|hot pics/i,
  /http:\/\/|https:\/\//i,
  /\b\d{7,}\b/,
  /\b(fuck|bitch|slut|whore|cunt)\b/i,
];

const HARD_BAN_PATTERNS = [
  /meet (you|u) (outside|irl|in person)/i,
  /come to (my|the) (house|place)/i,
  /where do you live|address/i,
  /add me on|text me on|call me on/i,
  /send me your (number|phone|snap|discord)/i,
  /don't tell (your|ur) (parents|mom|dad)/i,
  /keep (this|it) secret/i,
];

function sendFile(req, res) {
  const rawPath = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const safePath = path.normalize(rawPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}

function wsAcceptKey(secWebSocketKey) {
  const magic = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
  return crypto.createHash("sha1").update(secWebSocketKey + magic).digest("base64");
}

function encodeWsFrame(str) {
  const payload = Buffer.from(str, "utf8");
  const length = payload.length;
  let header;
  if (length < 126) {
    header = Buffer.from([0x81, length]);
  } else if (length < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(length), 2);
  }
  return Buffer.concat([header, payload]);
}

function decodeWsFrame(buffer) {
  const second = buffer[1];
  const masked = (second & 0x80) !== 0;
  let len = second & 0x7f;
  let offset = 2;
  if (len === 126) {
    len = buffer.readUInt16BE(offset);
    offset += 2;
  } else if (len === 127) {
    len = Number(buffer.readBigUInt64BE(offset));
    offset += 8;
  }
  let payload = buffer.slice(offset, offset + len);
  if (masked) {
    const mask = buffer.slice(offset, offset + 4);
    offset += 4;
    payload = buffer.slice(offset, offset + len);
    for (let i = 0; i < payload.length; i++) {
      payload[i] ^= mask[i % 4];
    }
  }
  return payload.toString("utf8");
}

function broadcastRoom(roomId, data) {
  const room = rooms.get(roomId);
  if (!room) return;
  const text = JSON.stringify(data);
  const frame = encodeWsFrame(text);
  room.clients.forEach((client) => {
    if (!client.destroyed) client.write(frame);
  });
}

function getOrCreateRoom(roomId) {
  if (!rooms.has(roomId)) rooms.set(roomId, { clients: new Set(), users: new Map(), chat: [] });
  return rooms.get(roomId);
}

function normalizeForModeration(text) {
  const map = {
    "@": "a",
    "$": "s",
    "0": "o",
    "1": "i",
    "3": "e",
    "4": "a",
    "5": "s",
    "7": "t",
    "!": "i",
    "|": "i",
    "+": "t",
  };
  const normalized = String(text || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/./g, (ch) => map[ch] || ch)
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return normalized;
}

function evaluateChatContent(text) {
  const normalized = normalizeForModeration(text);
  if (!normalized) return { action: "block", reason: "Empty chat content after normalization." };
  if (HARD_BAN_PATTERNS.some((p) => p.test(normalized))) {
    return { action: "ban", reason: "Unsafe contact solicitation detected." };
  }
  if (BLOCKED_PATTERNS.some((p) => p.test(normalized))) {
    return { action: "block", reason: "Blocked language or off-platform contact pattern." };
  }
  return { action: "allow", reason: "" };
}

function evaluateChatBomb(text) {
  const raw = String(text || "");
  if (raw.length > SERVER_CHAT_LIMITS.maxLength) return "Message too long.";
  if ((raw.match(/\n/g) || []).length > 3) return "Message flood formatting blocked.";
  if (/(.)\1{14,}/.test(raw)) return "Repeated-character spam blocked.";
  return "";
}

function evaluateSocketRate(socket, textLength) {
  if (!socket.__chatWindow) socket.__chatWindow = [];
  const now = Date.now();
  socket.__chatWindow = socket.__chatWindow.filter((entry) => now - entry.ts <= SERVER_CHAT_LIMITS.windowMs);
  if (socket.__lastChatAt && now - socket.__lastChatAt < SERVER_CHAT_LIMITS.cooldownMs) {
    return { allow: false, reason: "Cooldown active." };
  }
  const messageCount = socket.__chatWindow.length;
  const charsInWindow = socket.__chatWindow.reduce((acc, item) => acc + item.len, 0);
  if (messageCount >= SERVER_CHAT_LIMITS.maxMessagesPerWindow) {
    return { allow: false, reason: "Too many messages in a short window." };
  }
  if (charsInWindow + textLength > SERVER_CHAT_LIMITS.maxCharsPerWindow) {
    return { allow: false, reason: "Chat bomb protection triggered." };
  }
  return { allow: true, reason: "" };
}

function registerSocketChat(socket, textLength) {
  const now = Date.now();
  socket.__lastChatAt = now;
  if (!socket.__chatWindow) socket.__chatWindow = [];
  socket.__chatWindow.push({ ts: now, len: textLength });
}

function getBaseRoom(roomId) {
  const cleaned = String(roomId || "academy-hall").trim().slice(0, 30);
  return cleaned.replace(/^(adult|youth|suspect)-/i, "").slice(0, 24) || "academy-hall";
}

function determineLobbyType(meta, socket) {
  const ageBand = meta.ageBand === "18plus" ? "18plus" : (meta.ageBand || "unknown");
  const confirmedMature = !!meta.confirmedMature && ageBand === "18plus";
  const suspectSignals = !!meta.isSuspect || (socket.__safetyScore || 0) >= 6;
  if (confirmedMature) return { lobbyType: "adult", reason: "Confirmed mature profile." };
  if (suspectSignals) return { lobbyType: "suspect", reason: "Safety review routing enabled." };
  if (ageBand === "18plus") return { lobbyType: "adult", reason: "Adult profile routed to adult lobby." };
  return { lobbyType: "youth", reason: "Youth-safe lobby enforcement." };
}

function sendModeration(socket, action, reason) {
  const msg = { type: "moderation", action, reason, ts: Date.now() };
  socket.write(encodeWsFrame(JSON.stringify(msg)));
}

function moveSocketToLobby(socket, username, baseRoom, lobbyType, reason = "") {
  removeFromRooms(socket);
  const roomId = `${lobbyType}-${baseRoom}`.slice(0, 30);
  const room = getOrCreateRoom(roomId);
  room.clients.add(socket);
  room.users.set(socket, username);
  socket.__roomId = roomId;
  socket.__baseRoom = baseRoom;
  socket.__lobbyType = lobbyType;
  socket.write(encodeWsFrame(JSON.stringify({ type: "chatHistory", chat: room.chat })));
  socket.write(encodeWsFrame(JSON.stringify({ type: "roomAssignment", roomId, lobbyType, reason })));
  broadcastRoom(roomId, { type: "presence", users: [...room.users.values()] });
}

function removeFromRooms(socket) {
  rooms.forEach((room, roomId) => {
    if (room.clients.has(socket)) {
      room.clients.delete(socket);
      const user = room.users.get(socket);
      room.users.delete(socket);
      if (user) {
        broadcastRoom(roomId, { type: "presence", users: [...room.users.values()] });
      }
      if (room.clients.size === 0) rooms.delete(roomId);
    }
  });
}

const server = http.createServer(sendFile);

server.on("upgrade", (req, socket) => {
  if (req.url !== "/ws") {
    socket.destroy();
    return;
  }
  const key = req.headers["sec-websocket-key"];
  if (!key) {
    socket.destroy();
    return;
  }

  const accept = wsAcceptKey(key);
  const responseHeaders = [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${accept}`,
    "",
    "",
  ];
  socket.write(responseHeaders.join("\r\n"));

  socket.on("data", (chunk) => {
    let message;
    try {
      message = JSON.parse(decodeWsFrame(chunk));
    } catch {
      return;
    }
    if (!message || typeof message !== "object") return;

    if (message.type === "joinRoom") {
      const requestedRoom = String(message.roomId || "academy").slice(0, 30);
      const username = String(message.username || "Mage").slice(0, 20);
      const baseRoom = getBaseRoom(requestedRoom);
      const meta = {
        ageBand: String(message.ageBand || "unknown"),
        isSuspect: !!message.isSuspect,
        confirmedMature: !!message.confirmedMature,
      };
      const assignment = determineLobbyType(meta, socket);
      moveSocketToLobby(socket, username, baseRoom, assignment.lobbyType, assignment.reason);
      return;
    }

    if (message.type === "chat") {
      const roomId = socket.__roomId;
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      const username = room.users.get(socket) || "Mage";
      const rawText = String(message.text || "");
      const bombReason = evaluateChatBomb(rawText);
      if (bombReason) {
        socket.__safetyScore = (socket.__safetyScore || 0) + 2;
        sendModeration(socket, "blocked", bombReason);
        return;
      }
      const rate = evaluateSocketRate(socket, rawText.length);
      if (!rate.allow) {
        socket.__safetyScore = (socket.__safetyScore || 0) + 1;
        sendModeration(socket, "rate_limited", rate.reason);
        return;
      }
      const moderation = evaluateChatContent(rawText);
      if (moderation.action === "ban") {
        socket.__safetyScore = 999;
        sendModeration(socket, "ban", moderation.reason);
        const baseRoom = socket.__baseRoom || "academy-hall";
        moveSocketToLobby(socket, username, baseRoom, "suspect", "Safety incident routed this user to suspect lobby.");
        return;
      }
      if (moderation.action === "block") {
        socket.__safetyScore = (socket.__safetyScore || 0) + 2;
        sendModeration(socket, "blocked", moderation.reason);
        if ((socket.__safetyScore || 0) >= 6 && socket.__lobbyType !== "suspect") {
          const baseRoom = socket.__baseRoom || "academy-hall";
          moveSocketToLobby(socket, username, baseRoom, "suspect", "Repeated safety violations triggered suspect routing.");
        }
        return;
      }
      registerSocketChat(socket, rawText.length);
      const chatMsg = {
        username,
        text: rawText.slice(0, 180),
        ts: Date.now(),
      };
      room.chat.push(chatMsg);
      room.chat = room.chat.slice(-30);
      broadcastRoom(roomId, { type: "chat", message: chatMsg });
      return;
    }

    if (message.type === "statePing") {
      const roomId = socket.__roomId;
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      const username = room.users.get(socket) || "Mage";
      broadcastRoom(roomId, { type: "statePing", from: username, status: String(message.status || "").slice(0, 80) });
      socket.write(
        encodeWsFrame(
          JSON.stringify({
            type: "statePing",
            from: "__server__",
            status: "pong",
            ts: Date.now(),
          })
        )
      );
    }
  });

  socket.on("close", () => removeFromRooms(socket));
  socket.on("end", () => removeFromRooms(socket));
  socket.on("error", () => removeFromRooms(socket));
});

server.listen(PORT, () => {
  console.log(`Arcane Star Academy running at http://localhost:${PORT}`);
});
