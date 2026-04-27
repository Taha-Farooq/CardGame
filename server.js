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
      removeFromRooms(socket);
      const roomId = String(message.roomId || "academy").slice(0, 30);
      const username = String(message.username || "Mage").slice(0, 20);
      const room = getOrCreateRoom(roomId);
      room.clients.add(socket);
      room.users.set(socket, username);
      socket.__roomId = roomId;
      socket.write(encodeWsFrame(JSON.stringify({ type: "chatHistory", chat: room.chat })));
      broadcastRoom(roomId, { type: "presence", users: [...room.users.values()] });
      return;
    }

    if (message.type === "chat") {
      const roomId = socket.__roomId;
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      const username = room.users.get(socket) || "Mage";
      const chatMsg = {
        username,
        text: String(message.text || "").slice(0, 180),
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
    }
  });

  socket.on("close", () => removeFromRooms(socket));
  socket.on("end", () => removeFromRooms(socket));
  socket.on("error", () => removeFromRooms(socket));
});

server.listen(PORT, () => {
  console.log(`Arcane Star Academy running at http://localhost:${PORT}`);
});
