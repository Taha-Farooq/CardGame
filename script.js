const worlds = [
  { id: "academy", name: "Nebula Academy", difficulty: 1, unlockGemCost: 0, enemy: "Rookie Duelist", rewardGold: 35, rewardGems: 3, minStoryIndex: 0 },
  { id: "ember", name: "Cinder Railfields", difficulty: 2, unlockGemCost: 20, enemy: "Flare Ronin", rewardGold: 65, rewardGems: 5, minStoryIndex: 1 },
  { id: "tide", name: "Tideglass Station", difficulty: 3, unlockGemCost: 35, enemy: "Abyss Priestess", rewardGold: 100, rewardGems: 8, minStoryIndex: 2 },
  { id: "shade", name: "Umbral Terminus", difficulty: 4, unlockGemCost: 55, enemy: "Night Marshal", rewardGold: 145, rewardGems: 12, minStoryIndex: 3 },
];

const storyChapters = [
  {
    title: "Chapter 1 - Platform of Falling Light",
    text: "A harmless starshard rain lights up Nebula Academy's station canopy. You and your friends discover one shard pulsing with a strange symbol: the Crest of Eclipse.",
  },
  {
    title: "Chapter 2 - Vanishing Tickets",
    text: "Entire pages fade from magical route logs overnight. Professors whisper about an old spell thief called the Ink Eater returning from the Cinder Railfields.",
  },
  {
    title: "Chapter 3 - Echoes at Tideglass Station",
    text: "Ancient water mirrors show a masked figure gathering lost spells from every route. Their goal is not destruction, but to rewrite how magic chooses its students.",
  },
  {
    title: "Chapter 4 - Night at Umbral Terminus",
    text: "At Umbral Terminus, you learn the masked figure is Headmage Sol, believed gone for decades. Sol claims magic should belong to everyone, not only the gifted few.",
  },
  {
    title: "Chapter 5 - Promise of the Starline",
    text: "You and Sol duel beneath a meteor shimmer. No one is harmed; fighters faint and wake safely in healing wards. The final choice is yours: seal magic away, or share it wisely along every starline.",
  },
];

const currencyPacks = [
  { id: "starter", name: "Starter Crown Pouch", crowns: 50, bonusGems: 5, goldPrice: 250 },
  { id: "duelist", name: "Duelist Crown Crate", crowns: 125, bonusGems: 15, goldPrice: 560 },
  { id: "heroic", name: "Heroic Crown Vault", crowns: 300, bonusGems: 45, goldPrice: 1200 },
];

const shopCatalog = [
  { id: "potion", name: "Spark Tonic", crowns: 25, category: "consumables", description: "Heal 30 HP once per battle.", itemType: "heal30" },
  { id: "barrier", name: "Mirror Barrier", crowns: 35, category: "consumables", description: "Gain 18 shield instantly.", itemType: "shield18" },
  { id: "battery", name: "Prism Battery", crowns: 30, category: "consumables", description: "Gain +2 energy on use.", itemType: "energy2" },
  { id: "charm", name: "Comet Charm", crowns: 45, category: "consumables", description: "Gain +25 burst charge.", itemType: "burst25" },
  { id: "fox", name: "Kitsune Glider", crowns: 120, category: "mounts", description: "A cosmetic mount skin for future world travel.", itemType: "cosmetic" },
  { id: "robe", name: "Nova Academy Robe", crowns: 90, category: "outfits", description: "Exclusive outfit skin with star trim.", itemType: "cosmetic" },
  { id: "vfx", name: "Nebula Spell Trail", crowns: 110, category: "spell-fx", description: "Cosmetic spell effect skin.", itemType: "cosmetic" },
];

const shopCategories = ["all", "consumables", "mounts", "outfits", "spell-fx"];

const worldQuests = [
  { id: "q-academy-1", worldId: "academy", title: "Class Trial", requirement: "Win 1 battle in Sky Academy", targetWins: 1, rewardGold: 50, rewardCrowns: 20 },
  { id: "q-ember-1", worldId: "ember", title: "Ash Runner", requirement: "Win 2 battles in Ember Wastes", targetWins: 2, rewardGold: 100, rewardCrowns: 35 },
  { id: "q-tide-1", worldId: "tide", title: "Mirror Rescue", requirement: "Win 2 battles in Tide Shrine", targetWins: 2, rewardGold: 130, rewardCrowns: 45 },
  { id: "q-shade-1", worldId: "shade", title: "Citadel Oath", requirement: "Win 3 battles in Shade Citadel", targetWins: 3, rewardGold: 200, rewardCrowns: 80 },
];

const baseDeck = [
  { id: "bolt", name: "Star Bolt", cost: 1, type: "attack", value: 12, text: "Deal 12 damage." },
  { id: "guard", name: "Ward Guard", cost: 1, type: "guard", value: 8, text: "Gain 8 shield this turn." },
  { id: "focus", name: "Focus Sigil", cost: 0, type: "buff", value: 1, text: "Gain +1 energy." },
  { id: "slash", name: "Arc Slash", cost: 2, type: "attack", value: 20, text: "Deal 20 damage." },
  { id: "drain", name: "Moon Drain", cost: 2, type: "lifesteal", value: 14, text: "Deal 14 and heal 7." },
  { id: "combo", name: "Twin Comet", cost: 2, type: "combo", value: 10, text: "Deal 10. If used after attack, deal +10." },
];

const deckCatalog = [
  { id: "bolt", name: "Star Bolt", cost: 1, type: "attack", value: 12, text: "Deal 12 damage." },
  { id: "guard", name: "Ward Guard", cost: 1, type: "guard", value: 8, text: "Gain 8 shield this turn." },
  { id: "focus", name: "Focus Sigil", cost: 0, type: "buff", value: 1, text: "Gain +1 energy." },
  { id: "slash", name: "Arc Slash", cost: 2, type: "attack", value: 20, text: "Deal 20 damage." },
  { id: "drain", name: "Moon Drain", cost: 2, type: "lifesteal", value: 14, text: "Deal 14 and heal 7." },
  { id: "combo", name: "Twin Comet", cost: 2, type: "combo", value: 10, text: "Deal 10. If used after attack, deal +10." },
];

const worldEvents = [
  { id: "event-academy", worldId: "academy", title: "First Platform Festival", story: "Friendly duels and route drills all week.", bonusGold: 20, bonusGems: 2 },
  { id: "event-ember", worldId: "ember", title: "Solar Ember Surge", story: "Ion winds raise rewards for brave mages.", bonusGold: 35, bonusGems: 3 },
  { id: "event-tide", worldId: "tide", title: "Moon-Tide Transit", story: "Rare tide blossoms grant extra battle payout.", bonusGold: 45, bonusGems: 4 },
  { id: "event-shade", worldId: "shade", title: "Terminus Lantern Rite", story: "Terminus guardians grant elite trial rewards.", bonusGold: 60, bonusGems: 5 },
];

const companionCatalog = [
  { id: "luna", name: "Luna Vesper", rarity: "Epic", vibe: "Moonblade Muse", hpBonus: 12, burstStart: 10, goldBonusPct: 8, blurb: "A calm moon duelist with silver fan blades.", glamNote: "Elegant evening-festival style with silver accents.", skillType: "teamShield", skillValue: 15 },
  { id: "aiko", name: "Aiko Emberheart", rarity: "Rare", vibe: "Blaze Idol", hpBonus: 8, burstStart: 8, goldBonusPct: 6, blurb: "Performs blazing charm spells that hype the team.", glamNote: "Idol-inspired stage fashion and bold color palette.", skillType: "burstCharge", skillValue: 22 },
  { id: "mira", name: "Mira Tidecall", rarity: "Rare", vibe: "Ocean Songstress", hpBonus: 10, burstStart: 6, goldBonusPct: 5, blurb: "Her tide melodies shield friends in battle.", glamNote: "Flowing ocean-themed gown and pearl motifs.", skillType: "teamHeal", skillValue: 16 },
  { id: "nyx", name: "Nyx Starweaver", rarity: "Legendary", vibe: "Celestial Oracle", hpBonus: 18, burstStart: 15, goldBonusPct: 12, blurb: "A cosmic prodigy who reads fate from starlight.", glamNote: "Premium gala robe style with celestial ornaments.", skillType: "trueDamage", skillValue: 26 },
  { id: "kiko", name: "Kiko Sprouttail", rarity: "Common", vibe: "Forest Familiar", hpBonus: 5, burstStart: 4, goldBonusPct: 3, blurb: "Small, cheerful, and always scouting rare drops.", glamNote: "Nature streetwear look with playful leaf charm.", skillType: "energyBoost", skillValue: 1 },
  { id: "sera", name: "Sera Prismveil", rarity: "Epic", vibe: "Prism Shrine Keeper", hpBonus: 14, burstStart: 12, goldBonusPct: 9, blurb: "Channels rainbow sigils that empower every spell.", glamNote: "Runway-inspired prism couture with shrine motifs.", skillType: "doubleStrike", skillValue: 12 },
];

const companionArt = {
  luna: "assets/waifus/waifu_luna.png",
  aiko: "assets/waifus/waifu_aiko.png",
  mira: "assets/waifus/waifu_mira.png",
  nyx: "assets/waifus/waifu_nyx.png",
  kiko: "assets/waifus/waifu_kiko.png",
  sera: "assets/waifus/waifu_sera.png",
};

const bannerRotation = [
  { dateKey: "Mon", companionId: "nyx" },
  { dateKey: "Tue", companionId: "sera" },
  { dateKey: "Wed", companionId: "luna" },
  { dateKey: "Thu", companionId: "aiko" },
  { dateKey: "Fri", companionId: "nyx" },
  { dateKey: "Sat", companionId: "mira" },
  { dateKey: "Sun", companionId: "sera" },
];

const petCatalog = [
  { id: "puff", name: "Puffdrake", rarity: "Common", hpBonus: 6, energyBonus: 0, goldBonusPct: 4, blurb: "A tiny dragonlet that hoards shiny crowns." },
  { id: "nibble", name: "Nibblefox", rarity: "Rare", hpBonus: 8, energyBonus: 1, goldBonusPct: 5, blurb: "Quick paws and lucky instincts for loot runs." },
  { id: "glim", name: "Glimmoth", rarity: "Rare", hpBonus: 7, energyBonus: 1, goldBonusPct: 4, blurb: "A moon moth that boosts focus in battle." },
  { id: "auri", name: "Auripup", rarity: "Epic", hpBonus: 12, energyBonus: 1, goldBonusPct: 7, blurb: "A radiant spirit hound with warm healing aura." },
  { id: "myth", name: "Mythowl", rarity: "Legendary", hpBonus: 16, energyBonus: 2, goldBonusPct: 10, blurb: "An ancient owl that guides arcane masters." },
];

const blockedChatPatterns = [
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
];

const hardBanPatterns = [
  /meet (you|u) (outside|irl|in person)/i,
  /come to (my|the) (house|place)/i,
  /where do you live|address/i,
  /add me on|text me on|call me on/i,
  /send me your (number|phone|snap|discord)/i,
  /don't tell (your|ur) (parents|mom|dad)/i,
  /keep (this|it) secret/i,
];

const under13QuickChatOptions = [
  "Good game!",
  "Need help in battle.",
  "Nice combo!",
  "Ready for next round?",
  "Let's keep it friendly.",
  "Brb soon.",
];

const initialState = {
  profile: {
    name: "Mage",
    gold: 0,
    gems: 0,
    crowns: 0,
    unlockedWorldIds: ["academy"],
    clearedWorlds: {},
    storyIndex: 0,
    weeklyCrownSpendCap: 300,
    requirePurchaseConfirm: true,
    familySafeStyle: true,
    ageBand: "unknown",
    isBanned: false,
    banReason: "",
  },
  activeWorldId: null,
  player: { hp: 100, maxHp: 100, energy: 1, shield: 0, burst: 0 },
  enemy: { name: "Enemy", hp: 100, maxHp: 100, energy: 1, shield: 0 },
  hand: [],
  deckList: ["bolt", "guard", "focus", "slash", "drain", "combo"],
  ownedCompanions: { kiko: { copies: 1, affinity: 1 } },
  activeCompanionId: "kiko",
  ownedPets: { puff: { copies: 1, level: 1, exp: 0 } },
  activePetId: "puff",
  inventory: {},
  questProgress: {},
  completedQuestIds: [],
  weeklyCrownSpent: 0,
  weeklySpendResetTick: 0,
  activeShopCategory: "all",
  rotationSeed: 0,
  turnAttackPlayed: false,
  summonWithoutLegendary: 0,
  companionSkillUsedThisBattle: false,
  miniGamePlaysToday: 0,
  miniGameDayKey: "",
  miniGameSession: null,
  moderationScore: 0,
  moderationStrikes: 0,
  moderationIncidents: [],
  chatRateLimitWindow: [],
  lastChatSentAt: 0,
  gameOver: false,
  log: [],
};

let state = loadState();
let online = {
  ws: null,
  bc: null,
  connected: false,
  roomId: "",
  users: [],
  chat: [],
  mode: "offline",
  username: "Mage",
  lastPingSentAt: 0,
  lastLatencyMs: null,
  lobbyType: "youth",
  lobbyReason: "",
  moderationSummary: null,
  moderationEvents: [],
  mutedUntil: 0,
  moderationActions: [],
  isModerator: false,
  moderatorAuthReason: "",
  moderatorName: "",
};

function applySafetyPreset() {
  const age = state.profile.ageBand;
  const under18 = age === "under13" || age === "13to17" || age === "unknown";
  state.profile.familySafeStyle = true;
  state.profile.requirePurchaseConfirm = under18;
  if (age === "under13") {
    state.profile.weeklyCrownSpendCap = Math.min(state.profile.weeklyCrownSpendCap, 120);
  } else if (age === "13to17") {
    state.profile.weeklyCrownSpendCap = Math.min(state.profile.weeklyCrownSpendCap, 220);
  }
}

function loadState() {
  const raw = localStorage.getItem("arcane-star-save");
  if (!raw) return structuredClone(initialState);
  try {
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(initialState),
      ...parsed,
      profile: { ...structuredClone(initialState.profile), ...(parsed.profile || {}) },
    };
  } catch {
    return structuredClone(initialState);
  }
}

function persist() {
  localStorage.setItem("arcane-star-save", JSON.stringify(state));
}

function ensureWeeklySpendWindow() {
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  if (!state.weeklySpendResetTick || now - state.weeklySpendResetTick >= sevenDays) {
    state.weeklySpendResetTick = now;
    state.weeklyCrownSpent = 0;
  }
}

function randomCard() {
  const deckIds = state.deckList?.length ? state.deckList : ["bolt", "guard", "focus", "slash", "drain", "combo"];
  const randomId = deckIds[Math.floor(Math.random() * deckIds.length)];
  const card = deckCatalog.find((c) => c.id === randomId) || deckCatalog[0];
  return { ...card, shiny: Math.random() < 0.1 };
}

function log(msg) {
  state.log.unshift(msg);
  state.log = state.log.slice(0, 35);
}

function pushOnlineLog(message) {
  online.chat.unshift(message);
  online.chat = online.chat.slice(0, 40);
}

function recordModerationIncident(type, reason, text = "") {
  const entry = {
    ts: Date.now(),
    type,
    reason,
    textPreview: (text || "").slice(0, 120),
    roomId: online.roomId || "",
    username: online.username || state.profile.name || "Mage",
    ageBand: state.profile.ageBand || "unknown",
  };
  state.moderationIncidents.unshift(entry);
  state.moderationIncidents = state.moderationIncidents.slice(0, 200);
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
  return String(text || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/./g, (ch) => map[ch] || ch)
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getLocalLobbyType() {
  const highRisk = state.profile.isBanned || state.moderationScore >= 6 || state.moderationStrikes >= 1;
  if (highRisk) return "suspect";
  if (state.profile.ageBand === "18plus") return "adult";
  return "youth";
}

function connectOnline() {
  const isGitHubPages = window.location.hostname.endsWith("github.io");
  if (isGitHubPages) {
    online.mode = "broadcast";
    online.connected = true;
    online.bc = new BroadcastChannel("arcane-star-plaza");
    online.bc.onmessage = (event) => {
      const data = event.data || {};
      if (data.type === "presence" && data.roomId === online.roomId) {
        online.users = data.users || [];
      } else if (data.type === "chat" && data.roomId === online.roomId) {
        pushOnlineLog(`[${new Date(data.ts).toLocaleTimeString()}] ${data.username}: ${data.text}`);
      } else if (data.type === "statePing" && data.roomId === online.roomId) {
        pushOnlineLog(`[Status] ${data.username}: ${data.status}`);
      }
      renderOnline();
    };
    pushOnlineLog("[System] GitHub Pages mode active (tab-local room sync).");
    renderOnline();
    return;
  }

  online.mode = "websocket";
  const proto = window.location.protocol === "https:" ? "wss" : "ws";
  const url = `${proto}://${window.location.host}/ws`;
  try {
    online.ws = new WebSocket(url);
  } catch {
    return;
  }

  online.ws.onopen = () => {
    online.connected = true;
    pushOnlineLog("[System] Connected to online plaza.");
    renderOnline();
  };
  online.ws.onclose = () => {
    online.connected = false;
    online.mode = "offline";
    pushOnlineLog("[System] Disconnected from online plaza.");
    renderOnline();
  };
  online.ws.onerror = () => {
    online.connected = false;
    online.mode = "offline";
    pushOnlineLog("[System] Online server unavailable.");
    renderOnline();
  };
  online.ws.onmessage = (event) => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch {
      return;
    }
    if (data.type === "presence") {
      online.users = data.users || [];
    } else if (data.type === "chatHistory") {
      const history = (data.chat || []).map((m) => `[${new Date(m.ts).toLocaleTimeString()}] ${m.username}: ${m.text}`);
      online.chat = history.reverse().slice(0, 40);
    } else if (data.type === "chat" && data.message) {
      pushOnlineLog(`[${new Date(data.message.ts).toLocaleTimeString()}] ${data.message.username}: ${data.message.text}`);
    } else if (data.type === "roomAssignment") {
      online.roomId = data.roomId || online.roomId;
      online.lobbyType = data.lobbyType || online.lobbyType;
      online.lobbyReason = data.reason || "";
      pushOnlineLog(`[Safety] Assigned to ${online.lobbyType} lobby.`);
    } else if (data.type === "moderation") {
      pushOnlineLog(`[Moderation] ${data.action}: ${data.reason}`);
      if (data.action === "muted") {
        online.mutedUntil = Math.max(online.mutedUntil || 0, Number(data.mutedUntil) || 0);
      }
      if (data.action === "ban") {
        applyAutoBan(data.reason || "Server safety ban");
      } else {
        recordModerationIncident(data.action || "blocked", data.reason || "Server moderation event", "");
      }
    } else if (data.type === "moderationDashboard") {
      online.moderationSummary = data.summary || null;
      online.moderationEvents = data.events || [];
      online.moderationActions = data.actions || [];
    } else if (data.type === "moderatorAuthState") {
      online.isModerator = !!data.ok;
      online.moderatorAuthReason = data.reason || "";
      online.moderatorName = data.moderatorName || "";
      pushOnlineLog(`[Moderation] Auth ${online.isModerator ? "granted" : "denied"}: ${online.moderatorAuthReason || "No details"}`);
    } else if (data.type === "statePing") {
      if (data.from === "__server__" && typeof data.ts === "number") {
        online.lastLatencyMs = Date.now() - data.ts;
      }
      pushOnlineLog(`[Status] ${data.from}: ${data.status}`);
    }
    renderOnline();
  };
}

function sendOnline(payload) {
  if (online.mode === "broadcast" && online.bc) {
    online.bc.postMessage(payload);
    return;
  }
  if (online.ws && online.ws.readyState === 1) {
    online.ws.send(JSON.stringify(payload));
  }
}

function requestModerationDashboard() {
  if (online.mode !== "websocket" || !online.connected || !online.isModerator) return;
  sendOnline({ type: "moderationDashboardRequest" });
}

function authenticateModerator() {
  if (online.mode !== "websocket" || !online.connected) {
    pushOnlineLog("[Moderation] Connect to live WebSocket mode before moderator login.");
    render();
    return;
  }
  const tokenInput = document.getElementById("moderatorTokenInput");
  const moderatorNameInput = document.getElementById("moderatorNameInput");
  const moderatorName = (moderatorNameInput?.value || "").trim().slice(0, 32);
  const token = (tokenInput?.value || "").trim();
  if (!moderatorName) {
    pushOnlineLog("[Moderation] Enter a moderator name.");
    return;
  }
  if (!token) {
    pushOnlineLog("[Moderation] Enter a moderator token.");
    return;
  }
  sendOnline({ type: "moderatorAuth", token, moderatorName });
}

function runModerationAction(action) {
  if (online.mode !== "websocket" || !online.connected || !online.isModerator) {
    pushOnlineLog("[Moderation] Moderator authentication required.");
    render();
    return;
  }
  const usernameInput = document.getElementById("moderationTargetInput");
  const incidentInput = document.getElementById("moderationIncidentInput");
  const targetUsername = (usernameInput?.value || "").trim().slice(0, 20);
  const incidentId = (incidentInput?.value || "").trim().slice(0, 80);
  if (!targetUsername) {
    pushOnlineLog("[Moderation] Enter a target username first.");
    render();
    return;
  }
  sendOnline({ type: "moderationAction", action, targetUsername, incidentId });
}

function joinOnlineRoom() {
  if (state.profile.isBanned) {
    pushOnlineLog(`[Moderation] Access restricted: ${state.profile.banReason || "Policy violation"}`);
    renderOnline();
    return;
  }
  const nameInput = document.getElementById("onlineNameInput");
  const roomInput = document.getElementById("roomIdInput");
  const username = (nameInput.value || state.profile.name || "Mage").trim().slice(0, 20);
  const rawRoom = (roomInput.value || "academy-hall").trim().slice(0, 30);
  const roomPrefix = `${getLocalLobbyType()}-`;
  const roomId = `${roomPrefix}${rawRoom}`.slice(0, 30);
  online.username = username;
  if (!online.connected) {
    pushOnlineLog("[System] Not connected yet, retry in a moment.");
    renderOnline();
    return;
  }
  online.roomId = roomId;
  if (online.mode === "broadcast") {
    online.users = [username];
    online.lobbyType = getLocalLobbyType();
    online.lobbyReason = "Broadcast mode local safety routing.";
    sendOnline({ type: "presence", roomId, users: online.users });
    pushOnlineLog(`[System] Joined room: ${roomId} (GitHub Pages local mode)`);
  } else {
    sendOnline({
      type: "joinRoom",
      roomId,
      username,
      ageBand: state.profile.ageBand,
      isSuspect: state.moderationScore >= 6 || state.moderationStrikes > 0 || state.profile.isBanned,
      confirmedMature: state.profile.ageBand === "18plus" && !state.profile.isBanned,
    });
    pushOnlineLog(`[System] Joined room: ${roomId}`);
  }
  renderOnline();
}

function sendChat() {
  if (state.profile.isBanned) {
    pushOnlineLog(`[Moderation] Chat blocked: ${state.profile.banReason || "Policy violation"}`);
    renderOnline();
    return;
  }
  const input = document.getElementById("chatInput");
  const text = (input.value || "").trim();
  if (!text) return;
  if (online.mutedUntil && Date.now() < online.mutedUntil) {
    const waitSec = Math.ceil((online.mutedUntil - Date.now()) / 1000);
    pushOnlineLog(`[Moderation] You are muted. Try again in ${waitSec}s.`);
    renderOnline();
    return;
  }
  if (state.profile.ageBand === "under13") {
    pushOnlineLog("[Safety] Under-13 profiles use quick chat only.");
    recordModerationIncident("blocked", "Under-13 free text blocked", text);
    renderOnline();
    render();
    return;
  }
  const rateLimit = evaluateRateLimit();
  if (!rateLimit.allow) {
    pushOnlineLog(`[Safety] ${rateLimit.reason}`);
    recordModerationIncident("rate_limited", rateLimit.reason, text);
    renderOnline();
    render();
    return;
  }
  const moderation = evaluateChatMessage(text);
  if (moderation.action === "ban") {
    applyAutoBan(moderation.reason);
    recordModerationIncident("auto_ban", moderation.reason, text);
    pushOnlineLog(`[Moderation] Auto-ban triggered: ${moderation.reason}`);
    renderOnline();
    return;
  }
  if (moderation.action === "block") {
    state.moderationScore += moderation.scoreDelta;
    recordModerationIncident("blocked", moderation.reason, text);
    if (state.moderationScore >= 10) {
      applyAutoBan("Repeated unsafe communication attempts");
      recordModerationIncident("auto_ban", "Repeated unsafe communication attempts", text);
      pushOnlineLog("[Moderation] Auto-ban triggered by repeated unsafe messaging.");
      renderOnline();
      return;
    }
    pushOnlineLog(`[Safety] Message blocked: ${moderation.reason}`);
    renderOnline();
    return;
  }
  if (online.mode === "broadcast") {
    sendOnline({ type: "chat", roomId: online.roomId, username: online.username, text, ts: Date.now() });
    pushOnlineLog(`[${new Date().toLocaleTimeString()}] ${online.username}: ${text}`);
  } else {
    sendOnline({ type: "chat", text });
  }
  markChatSent();
  input.value = "";
  persist();
}

function evaluateChatMessage(text) {
  const normalized = normalizeForModeration(text);
  if (!normalized) return { action: "allow", reason: "", scoreDelta: 0 };

  if (hardBanPatterns.some((p) => p.test(normalized))) {
    return { action: "ban", reason: "Attempted to move contact outside the game or arrange meetup", scoreDelta: 100 };
  }
  if (blockedChatPatterns.some((p) => p.test(normalized))) {
    return { action: "block", reason: "External contact/off-platform language is not allowed", scoreDelta: 4 };
  }
  return { action: "allow", reason: "", scoreDelta: 0 };
}

function evaluateRateLimit() {
  const now = Date.now();
  const cooldownMs = 2500;
  const windowMs = 20000;
  const maxMessagesPerWindow = 4;
  const sinceLast = now - (state.lastChatSentAt || 0);
  if (state.lastChatSentAt && sinceLast < cooldownMs) {
    const wait = ((cooldownMs - sinceLast) / 1000).toFixed(1);
    return { allow: false, reason: `Chat cooldown active. Try again in ${wait}s.` };
  }
  state.chatRateLimitWindow = (state.chatRateLimitWindow || []).filter((ts) => now - ts <= windowMs);
  if (state.chatRateLimitWindow.length >= maxMessagesPerWindow) {
    return { allow: false, reason: "Rate limit reached: max 4 messages every 20 seconds." };
  }
  return { allow: true, reason: "" };
}

function markChatSent() {
  const now = Date.now();
  state.lastChatSentAt = now;
  if (!Array.isArray(state.chatRateLimitWindow)) state.chatRateLimitWindow = [];
  state.chatRateLimitWindow.push(now);
  state.chatRateLimitWindow = state.chatRateLimitWindow.slice(-10);
}

function sendQuickChat(text) {
  if (state.profile.isBanned) {
    pushOnlineLog(`[Moderation] Chat blocked: ${state.profile.banReason || "Policy violation"}`);
    renderOnline();
    return;
  }
  if (online.mutedUntil && Date.now() < online.mutedUntil) {
    const waitSec = Math.ceil((online.mutedUntil - Date.now()) / 1000);
    pushOnlineLog(`[Moderation] You are muted. Try again in ${waitSec}s.`);
    renderOnline();
    return;
  }
  const rateLimit = evaluateRateLimit();
  if (!rateLimit.allow) {
    pushOnlineLog(`[Safety] ${rateLimit.reason}`);
    recordModerationIncident("rate_limited", rateLimit.reason, text);
    renderOnline();
    render();
    return;
  }
  if (online.mode === "broadcast") {
    sendOnline({ type: "chat", roomId: online.roomId, username: online.username, text, ts: Date.now() });
    pushOnlineLog(`[${new Date().toLocaleTimeString()}] ${online.username}: ${text}`);
  } else {
    sendOnline({ type: "chat", text });
  }
  markChatSent();
  persist();
  renderOnline();
  render();
}

function applyAutoBan(reason) {
  state.profile.isBanned = true;
  state.profile.banReason = reason;
  state.moderationStrikes += 1;
  state.profile.ageBand = "unknown";
  state.profile.familySafeStyle = true;
  state.profile.requirePurchaseConfirm = true;
  recordModerationIncident("auto_ban", reason, "");
  persist();
}

function exportIncidentLog() {
  const payload = {
    exportedAt: new Date().toISOString(),
    profile: {
      name: state.profile.name,
      ageBand: state.profile.ageBand,
      moderationScore: state.moderationScore,
      moderationStrikes: state.moderationStrikes,
      isBanned: state.profile.isBanned,
      banReason: state.profile.banReason || "",
    },
    incidents: state.moderationIncidents || [],
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `arcane-star-incidents-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  pushOnlineLog("[Safety] Incident log exported.");
  renderOnline();
}

function pingStatus() {
  const status = state.activeWorldId
    ? `In battle at ${worlds.find((w) => w.id === state.activeWorldId)?.name || "Unknown"}`
    : "Hanging in the academy";
  if (online.mode === "broadcast") {
    sendOnline({ type: "statePing", roomId: online.roomId, username: online.username, status });
    pushOnlineLog(`[Status] ${online.username}: ${status}`);
  } else {
    online.lastPingSentAt = Date.now();
    sendOnline({ type: "statePing", status });
  }
}

function renderOnline() {
  const status = document.getElementById("onlineStatus");
  const health = document.getElementById("onlineHealth");
  const presence = document.getElementById("roomPresence");
  const chat = document.getElementById("onlineChatLog");
  if (!status || !presence || !chat || !health) return;
  const bannedTag = state.profile.isBanned ? " | CHAT RESTRICTED" : "";
  const lobbyTag = online.lobbyType ? ` | Lobby: ${online.lobbyType}` : "";
  const mutedTag = online.mutedUntil && Date.now() < online.mutedUntil ? " | TEMP MUTED" : "";
  status.textContent = online.connected
    ? `Connected (${online.mode})${online.roomId ? ` | Room: ${online.roomId}` : ""}${lobbyTag}${mutedTag}${bannedTag}`
    : `Not connected${bannedTag}`;
  if (online.connected && online.mode === "websocket") {
    const latency = online.lastLatencyMs == null ? "connected" : `${online.lastLatencyMs} ms`;
    health.textContent = `Health: ${latency}${online.lobbyReason ? ` | ${online.lobbyReason}` : ""}`;
  } else if (online.connected && online.mode === "broadcast") {
    health.textContent = `Health: local-tab sync${online.lobbyReason ? ` | ${online.lobbyReason}` : ""}`;
  } else {
    health.textContent = "Health: unavailable";
  }
  presence.textContent = `Players: ${online.users.length ? online.users.join(", ") : "none"}`;
  chat.textContent = online.chat.join("\n");
}

function draw(count = 1) {
  for (let i = 0; i < count; i++) state.hand.push(randomCard());
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function startBattle(worldId) {
  const world = worlds.find((w) => w.id === worldId);
  if (!world) return;
  if (!meetsStoryGate(world)) {
    log(`Story gate: reach ${storyChapters[world.minStoryIndex].title} first.`);
    render();
    return;
  }
  state.activeWorldId = world.id;
  state.gameOver = false;
  state.hand = [];
  state.turnAttackPlayed = false;
  state.companionSkillUsedThisBattle = false;
  state.log = [];
  state.player = { hp: 100, maxHp: 100, energy: 2, shield: 0, burst: 0 };
  state.enemy = {
    name: world.enemy,
    hp: 88 + world.difficulty * 25,
    maxHp: 88 + world.difficulty * 25,
    energy: 1 + world.difficulty,
    shield: 0,
  };
  applyCompanionBattleStartBonus();
  applyPetBattleStartBonus();
  draw(3);
  log(`Entered ${world.name}. ${world.enemy} challenges you.`);
  render();
}

function damageTarget(target, amount) {
  const blocked = Math.min(target.shield, amount);
  target.shield -= blocked;
  return amount - blocked;
}

function playCard(index) {
  if (state.gameOver) return;
  const card = state.hand[index];
  if (!card) return;
  if (card.cost > state.player.energy) {
    log(`Not enough energy for ${card.name}.`);
    render();
    return;
  }

  state.player.energy -= card.cost;
  state.hand.splice(index, 1);
  let dealt = 0;

  if (card.type === "attack") {
    triggerAttackAnimation("player", "enemy");
    dealt = damageTarget(state.enemy, card.value);
    state.enemy.hp -= dealt;
    state.turnAttackPlayed = true;
    state.player.burst += 8;
  } else if (card.type === "guard") {
    state.player.shield += card.value;
    state.player.burst += 4;
  } else if (card.type === "buff") {
    state.player.energy += card.value;
  } else if (card.type === "lifesteal") {
    triggerAttackAnimation("player", "enemy");
    dealt = damageTarget(state.enemy, card.value);
    state.enemy.hp -= dealt;
    state.player.hp = clamp(state.player.hp + Math.floor(card.value / 2), 0, state.player.maxHp);
    state.turnAttackPlayed = true;
    state.player.burst += 9;
  } else if (card.type === "combo") {
    triggerAttackAnimation("player", "enemy");
    let value = card.value;
    if (state.turnAttackPlayed) value += 10;
    dealt = damageTarget(state.enemy, value);
    state.enemy.hp -= dealt;
    state.turnAttackPlayed = true;
    state.player.burst += 10;
  }

  if (dealt > 0) log(`${card.name} deals ${dealt} damage.`);
  else log(`${card.name} used.`);

  if (state.enemy.hp <= 0) {
    winBattle();
    return;
  }

  render();
}

function enemyTurn() {
  if (state.gameOver) return;

  const enemyActionRoll = Math.random();
  let actionText = "";
  if (enemyActionRoll < 0.2) {
    const shieldGain = 6 + Math.floor(Math.random() * 8);
    state.enemy.shield += shieldGain;
    actionText = `${state.enemy.name} braces for ${shieldGain} shield.`;
  } else {
    triggerAttackAnimation("enemy", "player");
    const dmg = 8 + Math.floor(Math.random() * 8) + Math.floor(state.enemy.energy * 1.5);
    const final = damageTarget(state.player, dmg);
    state.player.hp -= final;
    actionText = `${state.enemy.name} strikes for ${final} damage.`;
  }

  state.enemy.energy += 1;
  state.player.energy += 1;
  state.player.shield = 0;
  state.turnAttackPlayed = false;
  draw(1);
  log(actionText);

  if (state.player.hp <= 0) loseBattle();
  render();
}

function useBurst() {
  if (state.gameOver) return;
  if (state.player.burst < 100) {
    log("Burst not ready.");
    render();
    return;
  }
  const burstDamage = 42;
  triggerAttackAnimation("player", "enemy");
  const dealt = damageTarget(state.enemy, burstDamage);
  state.enemy.hp -= dealt;
  state.player.burst = 0;
  log(`Astral Burst lands for ${dealt}!`);
  if (state.enemy.hp <= 0) winBattle();
  render();
}

function triggerAttackAnimation(attacker, defender) {
  const attackerEl = document.getElementById(attacker === "player" ? "playerFighter" : "enemyFighter");
  const impactEl = document.getElementById(defender === "player" ? "playerImpact" : "enemyImpact");
  if (attackerEl) {
    attackerEl.classList.remove("attack-swing");
    void attackerEl.offsetWidth;
    attackerEl.classList.add("attack-swing");
  }
  if (impactEl) {
    impactEl.classList.remove("hit");
    void impactEl.offsetWidth;
    impactEl.classList.add("hit");
  }
}

function winBattle() {
  const world = worlds.find((w) => w.id === state.activeWorldId);
  if (!world) return;
  state.gameOver = true;
  state.profile.gold += world.rewardGold;
  state.profile.gems += world.rewardGems;
  state.profile.crowns += Math.ceil(world.rewardGems / 2);
  state.profile.clearedWorlds[world.id] = true;
  state.questProgress[world.id] = (state.questProgress[world.id] || 0) + 1;
  const event = getEventForWorld(world.id);
  const eventGold = event ? event.bonusGold : 0;
  const eventGems = event ? event.bonusGems : 0;
  const companion = getActiveCompanion();
  const pet = getActivePet();
  const baseGoldThisFight = world.rewardGold + eventGold;
  const companionGoldBonus = companion ? Math.floor(baseGoldThisFight * (companion.goldBonusPct / 100)) : 0;
  const petGoldBonus = pet ? Math.floor(baseGoldThisFight * (pet.goldBonusPct / 100)) : 0;
  state.profile.gold += eventGold + companionGoldBonus + petGoldBonus;
  state.profile.gems += eventGems;
  if (companion && state.ownedCompanions[companion.id]) {
    state.ownedCompanions[companion.id].affinity += 1;
  }
  grantPetExp(6 + world.difficulty * 2);
  log(`Victory! +${world.rewardGold + eventGold + companionGoldBonus + petGoldBonus} gold, +${world.rewardGems + eventGems} gems, +${Math.ceil(world.rewardGems / 2)} crowns.`);
  checkQuestCompletion(world.id);
  persist();
  render();
}

function loseBattle() {
  state.gameOver = true;
  log("Defeated. Train your deck and try again.");
  persist();
  render();
}

function unlockWorld(worldId) {
  const world = worlds.find((w) => w.id === worldId);
  if (!world || state.profile.unlockedWorldIds.includes(world.id)) return;
  if (!meetsStoryGate(world)) {
    log(`Complete story to unlock ${world.name}.`);
    render();
    return;
  }
  if (state.profile.gems < world.unlockGemCost) {
    log(`Need ${world.unlockGemCost} gems for ${world.name}.`);
    render();
    return;
  }
  state.profile.gems -= world.unlockGemCost;
  state.profile.unlockedWorldIds.push(world.id);
  log(`Unlocked ${world.name}.`);
  persist();
  render();
}

function resetSave() {
  if (state.miniGameSession?.timer) clearInterval(state.miniGameSession.timer);
  localStorage.removeItem("arcane-star-save");
  state = structuredClone(initialState);
  render();
}

function meetsStoryGate(world) {
  return state.profile.storyIndex >= (world.minStoryIndex || 0);
}

function getActiveCompanion() {
  return companionCatalog.find((c) => c.id === state.activeCompanionId) || null;
}

function getActivePet() {
  return petCatalog.find((p) => p.id === state.activePetId) || null;
}

function applyCompanionBattleStartBonus() {
  const companion = getActiveCompanion();
  if (!companion) return;
  state.player.maxHp += companion.hpBonus;
  state.player.hp += companion.hpBonus;
  state.player.burst = clamp(state.player.burst + companion.burstStart, 0, 100);
}

function applyPetBattleStartBonus() {
  const pet = getActivePet();
  if (!pet) return;
  const petData = state.ownedPets[pet.id];
  const level = petData?.level || 1;
  state.player.maxHp += pet.hpBonus + Math.floor(level / 2);
  state.player.hp += pet.hpBonus + Math.floor(level / 2);
  state.player.energy += pet.energyBonus;
}

function getRateUpCompanionId() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = days[new Date().getDay()];
  const entry = bannerRotation.find((item) => item.dateKey === today);
  return entry?.companionId || "nyx";
}

function useCompanionSkill() {
  if (state.gameOver || !state.activeWorldId) {
    log("Start a battle to use companion skills.");
    render();
    return;
  }
  if (state.companionSkillUsedThisBattle) {
    log("Companion skill already used this battle.");
    render();
    return;
  }
  const companion = getActiveCompanion();
  if (!companion) {
    log("No active companion selected.");
    render();
    return;
  }

  if (companion.skillType === "teamShield") {
    state.player.shield += companion.skillValue;
    log(`${companion.name} casts Moon Guard: +${companion.skillValue} shield.`);
  } else if (companion.skillType === "burstCharge") {
    state.player.burst = clamp(state.player.burst + companion.skillValue, 0, 100);
    log(`${companion.name} ignites the crowd: +${companion.skillValue} burst.`);
  } else if (companion.skillType === "teamHeal") {
    const before = state.player.hp;
    state.player.hp = clamp(state.player.hp + companion.skillValue, 0, state.player.maxHp);
    log(`${companion.name} sings a healing tide: +${state.player.hp - before} HP.`);
  } else if (companion.skillType === "trueDamage") {
    state.enemy.hp -= companion.skillValue;
    log(`${companion.name} threads fate: ${companion.skillValue} true damage.`);
  } else if (companion.skillType === "energyBoost") {
    state.player.energy += companion.skillValue;
    log(`${companion.name} energizes your turn: +${companion.skillValue} energy.`);
  } else if (companion.skillType === "doubleStrike") {
    const dealt = damageTarget(state.enemy, companion.skillValue);
    state.enemy.hp -= dealt;
    state.player.energy += 1;
    log(`${companion.name} triggers Prism Echo: ${dealt} bonus damage and +1 energy.`);
  }

  state.companionSkillUsedThisBattle = true;
  if (state.enemy.hp <= 0) winBattle();
  render();
}

function grantPetExp(amount) {
  const pet = getActivePet();
  if (!pet || !state.ownedPets[pet.id]) return;
  const data = state.ownedPets[pet.id];
  data.exp += amount;
  const needed = data.level * 15;
  if (data.exp >= needed) {
    data.exp -= needed;
    data.level += 1;
    log(`${pet.name} reached level ${data.level}.`);
  }
}

function buyCurrencyPack(packId) {
  const pack = currencyPacks.find((p) => p.id === packId);
  if (!pack) return;
  if (state.profile.gold < pack.goldPrice) {
    log(`Need ${pack.goldPrice} gold for ${pack.name}.`);
    render();
    return;
  }
  state.profile.gold -= pack.goldPrice;
  state.profile.crowns += pack.crowns;
  state.profile.gems += pack.bonusGems;
  log(`Purchased ${pack.name}: +${pack.crowns} crowns, +${pack.bonusGems} gems.`);
  persist();
  render();
}

function buyShopItem(itemId) {
  const item = shopCatalog.find((s) => s.id === itemId);
  if (!item) return;
  ensureWeeklySpendWindow();
  if (state.profile.requirePurchaseConfirm) {
    const ok = window.confirm(`Buy ${item.name} for ${item.crowns} crowns?`);
    if (!ok) return;
  }
  const projected = state.weeklyCrownSpent + item.crowns;
  if (projected > state.profile.weeklyCrownSpendCap) {
    log(`Blocked by weekly cap (${state.profile.weeklyCrownSpendCap} crowns).`);
    render();
    return;
  }
  if (state.profile.crowns < item.crowns) {
    log(`Need ${item.crowns} crowns for ${item.name}.`);
    render();
    return;
  }
  state.profile.crowns -= item.crowns;
  state.weeklyCrownSpent += item.crowns;
  state.inventory[item.id] = (state.inventory[item.id] || 0) + 1;
  log(`Bought ${item.name}.`);
  persist();
  render();
}

function applyItemEffect(item) {
  if (item.itemType === "heal30") {
    const before = state.player.hp;
    state.player.hp = clamp(state.player.hp + 30, 0, state.player.maxHp);
    log(`${item.name} restored ${state.player.hp - before} HP.`);
    return;
  }
  if (item.itemType === "shield18") {
    state.player.shield += 18;
    log(`${item.name} granted 18 shield.`);
    return;
  }
  if (item.itemType === "energy2") {
    state.player.energy += 2;
    log(`${item.name} granted +2 energy.`);
    return;
  }
  if (item.itemType === "burst25") {
    state.player.burst = clamp(state.player.burst + 25, 0, 100);
    log(`${item.name} charged burst by 25.`);
    return;
  }
  if (item.itemType === "cosmetic") {
    log(`${item.name} unlocked in your collection.`);
  }
}

function useInventoryItem(itemId) {
  if (state.gameOver || !state.activeWorldId) {
    log("Start a battle before using items.");
    render();
    return;
  }
  if (!state.inventory[itemId]) {
    log("Item unavailable.");
    render();
    return;
  }
  const item = shopCatalog.find((s) => s.id === itemId);
  if (!item) return;
  state.inventory[itemId] -= 1;
  if (state.inventory[itemId] <= 0) delete state.inventory[itemId];
  applyItemEffect(item);
  persist();
  render();
}

function advanceStory() {
  const maxIndex = storyChapters.length - 1;
  if (state.profile.storyIndex >= maxIndex) {
    log("Story complete for current chapter set.");
    render();
    return;
  }
  state.profile.storyIndex += 1;
  log(`Unlocked ${storyChapters[state.profile.storyIndex].title}.`);
  worlds.forEach((world) => {
    const prevWorld = worlds.find((w) => w.minStoryIndex === (world.minStoryIndex || 0) - 1);
    const prevCleared = !prevWorld || state.profile.clearedWorlds[prevWorld.id];
    if (meetsStoryGate(world) && prevCleared && !state.profile.unlockedWorldIds.includes(world.id)) {
      state.profile.unlockedWorldIds.push(world.id);
      log(`${world.name} is now available through the story.`);
    }
  });
  persist();
  render();
}

function checkQuestCompletion(worldId) {
  const matching = worldQuests.filter((q) => q.worldId === worldId);
  matching.forEach((quest) => {
    if (state.completedQuestIds.includes(quest.id)) return;
    const wins = state.questProgress[worldId] || 0;
    if (wins >= quest.targetWins) {
      state.completedQuestIds.push(quest.id);
      state.profile.gold += quest.rewardGold;
      state.profile.crowns += quest.rewardCrowns;
      log(`Quest complete: ${quest.title} (+${quest.rewardGold} gold, +${quest.rewardCrowns} crowns).`);
    }
  });
}

function getRotatingShopItems() {
  const daySeed = new Date().toDateString();
  if (!state.rotationSeed || state.rotationSeed !== daySeed) {
    state.rotationSeed = daySeed;
  }
  const base = [...shopCatalog];
  const items = [];
  const seedNum = Array.from(daySeed).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  for (let i = 0; i < 4 && base.length; i++) {
    const idx = (seedNum + i * 7) % base.length;
    items.push(base.splice(idx, 1)[0]);
  }
  return items;
}

function getEventForWorld(worldId) {
  const stock = getTodaysEvents();
  return stock.find((e) => e.worldId === worldId);
}

function getTodaysEvents() {
  const daySeed = new Date().toDateString();
  const seedNum = Array.from(daySeed).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return worldEvents.filter((_, index) => (seedNum + index) % 2 === 0);
}

function toggleDeckCard(cardId) {
  const inDeck = state.deckList.includes(cardId);
  if (inDeck) {
    if (state.deckList.length <= 4) {
      log("Deck must keep at least 4 cards.");
      render();
      return;
    }
    state.deckList = state.deckList.filter((id) => id !== cardId);
    log("Card removed from battle deck.");
  } else {
    if (state.deckList.length >= 12) {
      log("Deck is full (max 12 cards).");
      render();
      return;
    }
    state.deckList.push(cardId);
    log("Card added to battle deck.");
  }
  persist();
  render();
}

function getSummonPool() {
  return [
    { rarity: "Common", chance: 52 },
    { rarity: "Rare", chance: 30 },
    { rarity: "Epic", chance: 14 },
    { rarity: "Legendary", chance: 4 },
  ];
}

function rollCompanion() {
  const rateUpId = getRateUpCompanionId();
  const guaranteedLegendary = state.summonWithoutLegendary >= 39;
  if (guaranteedLegendary) {
    state.summonWithoutLegendary = 0;
    if (Math.random() < 0.65) {
      return companionCatalog.find((c) => c.id === rateUpId) || companionCatalog.find((c) => c.rarity === "Legendary") || companionCatalog[0];
    }
    const allLegendary = companionCatalog.filter((c) => c.rarity === "Legendary");
    return allLegendary[Math.floor(Math.random() * allLegendary.length)] || companionCatalog[0];
  }

  if (Math.random() < 0.15) {
    return companionCatalog.find((c) => c.id === rateUpId) || companionCatalog[0];
  }

  const pool = getSummonPool();
  const r = Math.random() * 100;
  let cursor = 0;
  let pickedRarity = "Common";
  pool.forEach((entry) => {
    cursor += entry.chance;
    if (r <= cursor && pickedRarity === "Common") pickedRarity = entry.rarity;
  });
  const candidates = companionCatalog.filter((c) => c.rarity === pickedRarity);
  const pulled = candidates[Math.floor(Math.random() * candidates.length)] || companionCatalog[0];
  if (pulled.rarity === "Legendary") state.summonWithoutLegendary = 0;
  else state.summonWithoutLegendary += 1;
  return pulled;
}

function addCompanionPull(companion) {
  if (!state.ownedCompanions[companion.id]) {
    state.ownedCompanions[companion.id] = { copies: 0, affinity: 1 };
  }
  state.ownedCompanions[companion.id].copies += 1;
  return state.ownedCompanions[companion.id].copies === 1;
}

function summonCompanions(count, totalCostOverride = null) {
  const costPer = 30;
  const total = totalCostOverride == null ? count * costPer : totalCostOverride;
  if (state.profile.gems < total) {
    log(`Need ${total} gems to summon x${count}.`);
    render();
    return;
  }
  state.profile.gems -= total;
  let newCount = 0;
  for (let i = 0; i < count; i++) {
    const pulled = rollCompanion();
    const isNew = addCompanionPull(pulled);
    if (isNew) newCount += 1;
    log(`Summoned ${pulled.name} (${pulled.rarity})${isNew ? " [NEW]" : ""}.`);
  }
  if (newCount > 0 && !state.activeCompanionId) {
    const firstOwnedId = Object.keys(state.ownedCompanions)[0];
    state.activeCompanionId = firstOwnedId || null;
  }
  persist();
  render();
}

function setActiveCompanion(companionId) {
  if (!state.ownedCompanions[companionId]) return;
  state.activeCompanionId = companionId;
  log(`Active companion set to ${companionCatalog.find((c) => c.id === companionId)?.name || companionId}.`);
  persist();
  render();
}

function hatchPet() {
  const cost = 40;
  if (state.profile.gems < cost) {
    log(`Need ${cost} gems to hatch an egg.`);
    render();
    return;
  }
  state.profile.gems -= cost;
  const pulled = petCatalog[Math.floor(Math.random() * petCatalog.length)];
  if (!state.ownedPets[pulled.id]) {
    state.ownedPets[pulled.id] = { copies: 0, level: 1, exp: 0 };
  }
  state.ownedPets[pulled.id].copies += 1;
  if (!state.activePetId) state.activePetId = pulled.id;
  log(`Hatched ${pulled.name} (${pulled.rarity}).`);
  persist();
  render();
}

function setActivePet(petId) {
  if (!state.ownedPets[petId]) return;
  state.activePetId = petId;
  log(`Active pet set to ${petCatalog.find((p) => p.id === petId)?.name || petId}.`);
  persist();
  render();
}

function feedActivePet() {
  const pet = getActivePet();
  if (!pet || !state.ownedPets[pet.id]) {
    log("No active pet selected.");
    render();
    return;
  }
  if (state.profile.gold < 25) {
    log("Need 25 gold to feed pet.");
    render();
    return;
  }
  state.profile.gold -= 25;
  grantPetExp(8);
  log(`${pet.name} enjoyed a snack. +8 pet EXP.`);
  persist();
  render();
}

function trainActivePet() {
  const pet = getActivePet();
  if (!pet || !state.ownedPets[pet.id]) {
    log("No active pet selected.");
    render();
    return;
  }
  if (state.profile.gold < 40) {
    log("Need 40 gold to train pet.");
    render();
    return;
  }
  state.profile.gold -= 40;
  grantPetExp(14);
  log(`${pet.name} completed training. +14 pet EXP.`);
  persist();
  render();
}

function ensureMiniGameDay() {
  const key = new Date().toDateString();
  if (state.miniGameDayKey !== key) {
    state.miniGameDayKey = key;
    state.miniGamePlaysToday = 0;
  }
}

function playMiniGame(kind) {
  if (kind === "rhythm") {
    startRhythmMiniGame();
    return;
  }
  if (kind === "memory") {
    startMemoryMiniGame();
    return;
  }
  if (kind === "runner") {
    startRunnerMiniGame();
    return;
  }
}

function canPlayMiniGame() {
  ensureMiniGameDay();
  if (state.miniGamePlaysToday >= 6) {
    log("Mini-game daily limit reached (6).");
    render();
    return false;
  }
  return true;
}

function rewardMiniGame(scoreTier, kind) {
  let rewardGold = 0;
  let rewardGems = 0;
  let petExp = 0;
  if (kind === "rhythm") {
    rewardGold = scoreTier === "great" ? 70 : scoreTier === "good" ? 52 : 34;
    rewardGems = scoreTier === "great" ? 4 : scoreTier === "good" ? 3 : 1;
    petExp = scoreTier === "great" ? 12 : scoreTier === "good" ? 9 : 6;
  } else if (kind === "memory") {
    rewardGold = scoreTier === "great" ? 78 : scoreTier === "good" ? 55 : 30;
    rewardGems = scoreTier === "great" ? 4 : scoreTier === "good" ? 2 : 1;
    petExp = scoreTier === "great" ? 14 : scoreTier === "good" ? 10 : 7;
  } else {
    rewardGold = scoreTier === "great" ? 75 : scoreTier === "good" ? 54 : 32;
    rewardGems = scoreTier === "great" ? 3 : scoreTier === "good" ? 2 : 1;
    petExp = scoreTier === "great" ? 13 : scoreTier === "good" ? 9 : 6;
  }
  state.profile.gold += rewardGold;
  state.profile.gems += rewardGems;
  state.miniGamePlaysToday += 1;
  grantPetExp(petExp);
  log(`Mini-game (${kind}) ${scoreTier}: +${rewardGold} gold, +${rewardGems} gems, +${petExp} pet EXP.`);
  persist();
  render();
}

function startRhythmMiniGame() {
  if (!canPlayMiniGame()) return;
  if (state.miniGameSession?.timer) clearInterval(state.miniGameSession.timer);
  state.miniGameSession = {
    type: "rhythm",
    markerPos: 0,
    markerDir: 1,
    timer: null,
  };
  render();
  state.miniGameSession.timer = setInterval(() => {
    if (!state.miniGameSession || state.miniGameSession.type !== "rhythm") return;
    state.miniGameSession.markerPos += 3 * state.miniGameSession.markerDir;
    if (state.miniGameSession.markerPos >= 100) {
      state.miniGameSession.markerPos = 100;
      state.miniGameSession.markerDir = -1;
    }
    if (state.miniGameSession.markerPos <= 0) {
      state.miniGameSession.markerPos = 0;
      state.miniGameSession.markerDir = 1;
    }
    renderMiniGameArea();
  }, 70);
}

function resolveRhythmMiniGame() {
  const s = state.miniGameSession;
  if (!s || s.type !== "rhythm") return;
  clearInterval(s.timer);
  const centerDistance = Math.abs(50 - s.markerPos);
  const tier = centerDistance <= 8 ? "great" : centerDistance <= 18 ? "good" : "ok";
  state.miniGameSession = null;
  rewardMiniGame(tier, "rhythm");
}

function startMemoryMiniGame() {
  if (!canPlayMiniGame()) return;
  if (state.miniGameSession?.timer) clearInterval(state.miniGameSession.timer);
  const symbols = ["Sun", "Moon", "Star", "Wave"];
  const seq = [];
  for (let i = 0; i < 4; i++) seq.push(symbols[Math.floor(Math.random() * symbols.length)]);
  state.miniGameSession = {
    type: "memory",
    sequence: seq,
    input: "",
  };
  render();
}

function resolveMemoryMiniGame(input) {
  const s = state.miniGameSession;
  if (!s || s.type !== "memory") return;
  const expected = s.sequence.map((x) => x[0]).join("");
  const cleaned = (input || "").toUpperCase().trim();
  let matches = 0;
  for (let i = 0; i < Math.min(expected.length, cleaned.length); i++) {
    if (expected[i] === cleaned[i]) matches += 1;
  }
  const tier = matches >= 4 ? "great" : matches >= 3 ? "good" : "ok";
  state.miniGameSession = null;
  rewardMiniGame(tier, "memory");
}

function startRunnerMiniGame() {
  if (!canPlayMiniGame()) return;
  if (state.miniGameSession?.timer) clearInterval(state.miniGameSession.timer);
  const safeLane = 1 + Math.floor(Math.random() * 3);
  state.miniGameSession = {
    type: "runner",
    safeLane,
  };
  render();
}

function resolveRunnerMiniGame(choiceLane) {
  const s = state.miniGameSession;
  if (!s || s.type !== "runner") return;
  const tier = Number(choiceLane) === s.safeLane ? "great" : Math.abs(Number(choiceLane) - s.safeLane) === 1 ? "good" : "ok";
  state.miniGameSession = null;
  rewardMiniGame(tier, "runner");
}

function renderWorlds() {
  const worldList = document.getElementById("worldList");
  worldList.innerHTML = "";

  worlds.forEach((world) => {
    const unlocked = state.profile.unlockedWorldIds.includes(world.id);
    const cleared = !!state.profile.clearedWorlds[world.id];
    const storyReady = meetsStoryGate(world);

    const card = document.createElement("article");
    card.className = `world-card ${unlocked ? "" : "locked"}`.trim();

    const status = storyReady
      ? (unlocked ? (cleared ? "Cleared" : "Unlocked") : `Locked (${world.unlockGemCost} gems)`)
      : `Story locked (need Chapter ${world.minStoryIndex + 1})`;
    card.innerHTML = `
      <h3>${world.name}</h3>
      <p>Enemy: ${world.enemy}</p>
      <p>Difficulty: ${world.difficulty}</p>
      <p>Status: ${status}</p>
    `;

    const action = document.createElement("button");
    if (unlocked) {
      action.textContent = "Battle";
      action.onclick = () => startBattle(world.id);
    } else {
      action.textContent = "Unlock";
      action.disabled = !storyReady;
      action.onclick = () => unlockWorld(world.id);
    }
    card.appendChild(action);
    worldList.appendChild(card);
  });
}

function renderHand() {
  const hand = document.getElementById("hand");
  hand.innerHTML = "";
  state.hand.forEach((card, index) => {
    const el = document.createElement("article");
    el.className = `card ${card.shiny ? "shiny" : ""}`.trim();
    el.innerHTML = `
      <h4>${card.name}</h4>
      <p>Cost: ${card.cost}</p>
      <p>${card.text}</p>
      <p>${card.shiny ? "Shiny Foil" : "Standard"}</p>
    `;
    const btn = document.createElement("button");
    btn.textContent = "Play";
    btn.disabled = state.gameOver;
    btn.onclick = () => playCard(index);
    el.appendChild(btn);
    hand.appendChild(el);
  });
}

function renderProgress() {
  const list = document.getElementById("progressionList");
  list.innerHTML = "";
  worlds.forEach((world) => {
    const item = document.createElement("li");
    const unlocked = state.profile.unlockedWorldIds.includes(world.id) ? "Yes" : "No";
    const cleared = state.profile.clearedWorlds[world.id] ? "Yes" : "No";
    item.textContent = `${world.name} | Unlocked: ${unlocked} | Cleared: ${cleared}`;
    list.appendChild(item);
  });
}

function renderStory() {
  const chapter = storyChapters[state.profile.storyIndex] || storyChapters[0];
  document.getElementById("storyChapterTitle").textContent = chapter.title;
  document.getElementById("storyChapterText").textContent = chapter.text;
  document.getElementById("nextStoryBtn").disabled = state.profile.storyIndex >= storyChapters.length - 1;
}

function renderEconomy() {
  ensureWeeklySpendWindow();
  document.getElementById("walletGold").textContent = state.profile.gold;
  document.getElementById("walletGems").textContent = state.profile.gems;
  document.getElementById("walletCrowns").textContent = state.profile.crowns;

  const packContainer = document.getElementById("currencyPacks");
  packContainer.innerHTML = "";
  currencyPacks.forEach((pack) => {
    const card = document.createElement("article");
    card.className = "shop-item";
    card.innerHTML = `
      <h4>${pack.name}</h4>
      <p>+${pack.crowns} crowns</p>
      <p>+${pack.bonusGems} gems bonus</p>
      <p>Cost: ${pack.goldPrice} gold</p>
    `;
    const btn = document.createElement("button");
    btn.textContent = "Buy Pack";
    btn.onclick = () => buyCurrencyPack(pack.id);
    card.appendChild(btn);
    packContainer.appendChild(card);
  });

  const filterContainer = document.getElementById("shopFilters");
  filterContainer.innerHTML = "";
  shopCategories.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.onclick = () => {
      state.activeShopCategory = category;
      render();
    };
    filterContainer.appendChild(btn);
  });

  const todayStock = getRotatingShopItems();
  const filtered = todayStock.filter((item) =>
    state.activeShopCategory === "all" ? true : item.category === state.activeShopCategory
  );

  const shopContainer = document.getElementById("crownShop");
  shopContainer.innerHTML = "";
  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "shop-item";
    card.innerHTML = `
      <h4>${item.name}</h4>
      <p>Category: ${item.category}</p>
      <p>${item.description}</p>
      <p>Price: ${item.crowns} crowns</p>
    `;
    const btn = document.createElement("button");
    btn.textContent = "Buy Item";
    btn.onclick = () => buyShopItem(item.id);
    card.appendChild(btn);
    shopContainer.appendChild(card);
  });

  const invContainer = document.getElementById("inventoryList");
  invContainer.innerHTML = "";
  const entries = Object.entries(state.inventory);
  if (!entries.length) {
    invContainer.innerHTML = "<article class='inv-item'><p>No items yet.</p></article>";
  } else {
    entries.forEach(([itemId, count]) => {
      const item = shopCatalog.find((s) => s.id === itemId);
      if (!item) return;
      const card = document.createElement("article");
      card.className = "inv-item";
      card.innerHTML = `
        <h4>${item.name}</h4>
        <p>x${count}</p>
        <p>${item.description}</p>
      `;
      const btn = document.createElement("button");
      btn.textContent = "Use";
      btn.onclick = () => useInventoryItem(item.id);
      card.appendChild(btn);
      invContainer.appendChild(card);
    });
  }

  const questContainer = document.getElementById("questList");
  questContainer.innerHTML = "";
  worldQuests.forEach((quest) => {
    const progress = state.questProgress[quest.worldId] || 0;
    const done = state.completedQuestIds.includes(quest.id);
    const worldName = worlds.find((w) => w.id === quest.worldId)?.name || quest.worldId;
    const card = document.createElement("article");
    card.className = "shop-item";
    card.innerHTML = `
      <h4>${quest.title}</h4>
      <p>World: ${worldName}</p>
      <p>${quest.requirement}</p>
      <p>Progress: ${Math.min(progress, quest.targetWins)}/${quest.targetWins}</p>
      <p>Reward: ${quest.rewardGold} gold, ${quest.rewardCrowns} crowns</p>
      <p>Status: ${done ? "Completed" : "In progress"}</p>
    `;
    questContainer.appendChild(card);
  });

  document.getElementById("spendingCapInput").value = state.profile.weeklyCrownSpendCap;
  document.getElementById("confirmPurchasesToggle").checked = state.profile.requirePurchaseConfirm;
  document.getElementById("spendStatus").textContent = `Spent this week: ${state.weeklyCrownSpent}/${state.profile.weeklyCrownSpendCap} crowns.`;
}

function renderDeckBuilder() {
  const container = document.getElementById("deckBuilder");
  container.innerHTML = "";
  document.getElementById("deckCount").textContent = state.deckList.length;

  deckCatalog.forEach((card) => {
    const active = state.deckList.includes(card.id);
    const el = document.createElement("article");
    el.className = `shop-item ${active ? "active" : ""}`.trim();
    el.innerHTML = `
      <h4>${card.name}</h4>
      <p>Cost: ${card.cost}</p>
      <p>${card.text}</p>
      <p>Status: ${active ? "In Deck" : "Out of Deck"}</p>
    `;
    const btn = document.createElement("button");
    btn.textContent = active ? "Remove" : "Add";
    btn.onclick = () => toggleDeckCard(card.id);
    el.appendChild(btn);
    container.appendChild(el);
  });
}

function renderEvents() {
  const container = document.getElementById("worldEventList");
  if (!container) return;
  container.innerHTML = "";
  const todayEvents = getTodaysEvents();
  if (!todayEvents.length) {
    container.innerHTML = "<article class='shop-item'><p>No active events today.</p></article>";
    return;
  }
  todayEvents.forEach((event) => {
    const worldName = worlds.find((w) => w.id === event.worldId)?.name || event.worldId;
    const el = document.createElement("article");
    el.className = "shop-item";
    el.innerHTML = `
      <h4>${event.title}</h4>
      <p>World: ${worldName}</p>
      <p>${event.story}</p>
      <p>Bonus: +${event.bonusGold} gold, +${event.bonusGems} gems per win</p>
    `;
    container.appendChild(el);
  });
}

function renderCompanions() {
  const container = document.getElementById("companionRoster");
  if (!container) return;
  container.innerHTML = "";

  const ownedIds = Object.keys(state.ownedCompanions || {});
  if (!ownedIds.length) {
    container.innerHTML = "<article class='shop-item'><p>No companions summoned yet.</p></article>";
    return;
  }

  ownedIds.forEach((id) => {
    const meta = companionCatalog.find((c) => c.id === id);
    if (!meta) return;
    const owned = state.ownedCompanions[id];
    const active = state.activeCompanionId === id;
    const card = document.createElement("article");
    card.className = `companion-card ${active ? "active" : ""}`.trim();
    card.innerHTML = `
      <img class="portrait" src="${companionArt[id] || ""}" alt="${meta.name} portrait" onerror="this.style.display='none'" />
      <h4>${meta.name}</h4>
      <p>Rarity: ${meta.rarity}</p>
      <p>Vibe: ${meta.vibe}</p>
      <p>${meta.blurb}</p>
      <p>${state.profile.familySafeStyle ? "Style: All-ages presentation enabled." : `Style: ${meta.glamNote}`}</p>
      <p>Copies: ${owned.copies}</p>
      <p>Affinity: ${owned.affinity}</p>
      <p>Bonus: +${meta.hpBonus} HP, +${meta.burstStart} burst, +${meta.goldBonusPct}% gold</p>
      <p>Skill: ${meta.skillType} (${meta.skillValue})</p>
    `;
    const btn = document.createElement("button");
    btn.textContent = active ? "Active" : "Set Active";
    btn.disabled = active;
    btn.onclick = () => setActiveCompanion(id);
    card.appendChild(btn);
    container.appendChild(card);
  });
}

function renderArtGallery() {
  const gallery = document.getElementById("artGallery");
  if (!gallery) return;
  gallery.innerHTML = "";
  companionCatalog.forEach((c) => {
    const card = document.createElement("article");
    card.className = "art-card";
    card.innerHTML = `
      <img class="portrait" src="${companionArt[c.id] || ""}" alt="${c.name} splash art" onerror="this.style.opacity='0.35'" />
      <h4>${c.name}</h4>
      <p>${c.vibe}</p>
      <p>File: ${companionArt[c.id] || "missing"}</p>
    `;
    gallery.appendChild(card);
  });
}

function renderBondScenes() {
  const container = document.getElementById("bondSceneList");
  if (!container) return;
  container.innerHTML = "";

  const ownedIds = Object.keys(state.ownedCompanions || {});
  if (!ownedIds.length) {
    container.innerHTML = "<article class='bond-scene'><p>Summon companions to unlock bond stories.</p></article>";
    return;
  }

  ownedIds.forEach((id) => {
    const companion = companionCatalog.find((c) => c.id === id);
    const owned = state.ownedCompanions[id];
    if (!companion || !owned) return;

    const affinity = owned.affinity || 0;
    const unlockedStage = affinity >= 20 ? 3 : affinity >= 10 ? 2 : affinity >= 3 ? 1 : 0;
    const snippets = [
      "Reach affinity 3 to unlock this scene.",
      `${companion.name} invites you to after-class training and shares her dream for the academy.`,
      `${companion.name} opens up about her fears, and you promise to face the next world together.`,
      `${companion.name} performs a special festival oath scene, celebrating your team bond.`,
    ];
    const card = document.createElement("article");
    card.className = "bond-scene";
    card.innerHTML = `
      <h4>${companion.name} Bond Arc</h4>
      <p>Affinity: ${affinity}</p>
      <p>Unlocked stage: ${unlockedStage}/3</p>
      <p>${snippets[unlockedStage]}</p>
    `;
    container.appendChild(card);
  });
}

function renderPets() {
  const roster = document.getElementById("petRoster");
  if (!roster) return;
  roster.innerHTML = "";
  const ownedIds = Object.keys(state.ownedPets || {});
  if (!ownedIds.length) {
    roster.innerHTML = "<article class='pet-card'><p>No pets hatched yet.</p></article>";
    return;
  }
  ownedIds.forEach((id) => {
    const meta = petCatalog.find((p) => p.id === id);
    const data = state.ownedPets[id];
    if (!meta || !data) return;
    const active = state.activePetId === id;
    const card = document.createElement("article");
    card.className = `pet-card ${active ? "active" : ""}`.trim();
    card.innerHTML = `
      <h4>${meta.name}</h4>
      <p>Rarity: ${meta.rarity}</p>
      <p>${meta.blurb}</p>
      <p>Copies: ${data.copies}</p>
      <p>Level: ${data.level} | EXP: ${data.exp}/${data.level * 15}</p>
      <p>Bonuses: +${meta.hpBonus} HP, +${meta.energyBonus} energy, +${meta.goldBonusPct}% gold</p>
    `;
    const btn = document.createElement("button");
    btn.textContent = active ? "Active Pet" : "Set Active";
    btn.disabled = active;
    btn.onclick = () => setActivePet(id);
    card.appendChild(btn);
    roster.appendChild(card);
  });
}

function renderMiniGameArea() {
  const area = document.getElementById("miniGamePlayArea");
  if (!area) return;
  const s = state.miniGameSession;
  if (!s) {
    area.innerHTML = "<p>Pick a mini-game to start an interactive challenge.</p>";
    return;
  }

  if (s.type === "rhythm") {
    area.innerHTML = `
      <p>Stop the marker in the blue target zone for best rewards.</p>
      <div class="mini-game-track">
        <div class="mini-game-target"></div>
        <div class="mini-game-marker" style="left:${s.markerPos}%"></div>
      </div>
      <button id="rhythmStopBtn">Stop Marker</button>
    `;
    document.getElementById("rhythmStopBtn").onclick = () => resolveRhythmMiniGame();
    return;
  }

  if (s.type === "memory") {
    const shown = s.sequence.map((x) => x[0]).join(" - ");
    area.innerHTML = `
      <p>Memorize this sequence and enter initials (e.g., SMWS):</p>
      <p><strong>${shown}</strong></p>
      <input id="memoryInput" type="text" maxlength="4" />
      <button id="memorySubmitBtn">Submit</button>
    `;
    document.getElementById("memorySubmitBtn").onclick = () => {
      const value = document.getElementById("memoryInput").value;
      resolveMemoryMiniGame(value);
    };
    return;
  }

  area.innerHTML = `
    <p>Choose a lane: one lane is safest and gives best rewards.</p>
    <div class="actions">
      <button id="lane1Btn">Lane 1</button>
      <button id="lane2Btn">Lane 2</button>
      <button id="lane3Btn">Lane 3</button>
    </div>
  `;
  document.getElementById("lane1Btn").onclick = () => resolveRunnerMiniGame(1);
  document.getElementById("lane2Btn").onclick = () => resolveRunnerMiniGame(2);
  document.getElementById("lane3Btn").onclick = () => resolveRunnerMiniGame(3);
}

function render() {
  document.getElementById("playerName").textContent = state.profile.name;
  document.getElementById("activeCompanionName").textContent = getActiveCompanion()?.name || "None";
  document.getElementById("goldCount").textContent = state.profile.gold;
  document.getElementById("gemCount").textContent = state.profile.gems;
  document.getElementById("playerHp").textContent = Math.max(0, state.player.hp);
  document.getElementById("enemyHp").textContent = Math.max(0, state.enemy.hp);
  document.getElementById("playerHpBar").max = state.player.maxHp;
  document.getElementById("playerHpBar").value = Math.max(0, state.player.hp);
  document.getElementById("enemyHpBar").max = state.enemy.maxHp;
  document.getElementById("enemyHpBar").value = Math.max(0, state.enemy.hp);
  document.getElementById("playerEnergy").textContent = state.player.energy;
  document.getElementById("enemyEnergy").textContent = state.enemy.energy;
  document.getElementById("enemyName").textContent = state.enemy.name;
  document.getElementById("battleTitle").textContent = state.activeWorldId
    ? `${worlds.find((w) => w.id === state.activeWorldId).name} Battle`
    : "Choose a world to start";
  document.getElementById("battleLog").textContent = state.log.join("\n");
  document.getElementById("burstBtn").disabled = state.player.burst < 100 || state.gameOver;
  document.getElementById("companionSkillBtn").disabled = state.gameOver || !state.activeWorldId || state.companionSkillUsedThisBattle;
  const rateUp = companionCatalog.find((c) => c.id === getRateUpCompanionId());
  document.getElementById("bannerStatus").textContent = `Rate-up banner: ${rateUp?.name || "None"} (${rateUp?.rarity || "N/A"})`;
  document.getElementById("pityStatus").textContent = `Legendary pity: ${state.summonWithoutLegendary}/40 summons`;
  ensureMiniGameDay();
  const activePet = getActivePet();
  const activePetData = activePet ? state.ownedPets[activePet.id] : null;
  document.getElementById("activePetStatus").textContent = activePet
    ? `Active Pet: ${activePet.name} (Lv ${activePetData?.level || 1})`
    : "Active Pet: None";
  document.getElementById("miniGameStatus").textContent = `Mini-games today: ${state.miniGamePlaysToday}/6`;
  const styleToggle = document.getElementById("familyStyleToggle");
  if (styleToggle) styleToggle.checked = !!state.profile.familySafeStyle;
  const styleStatus = document.getElementById("styleModeStatus");
  if (styleStatus) {
    styleStatus.textContent = state.profile.familySafeStyle
      ? "Style Mode: Family-safe (all-ages)"
      : "Style Mode: Teen fantasy glamour (still rating-safe)";
  }
  const ageSelect = document.getElementById("ageBandSelect");
  if (ageSelect) ageSelect.value = state.profile.ageBand || "unknown";
  const safetyMode = document.getElementById("safetyModeStatus");
  if (safetyMode) {
    const label = state.profile.ageBand === "18plus" ? "Adult safety profile" : "Youth safety profile";
    safetyMode.textContent = `Safety Profile: ${label}`;
  }
  const chatSafety = document.getElementById("chatSafetyStatus");
  if (chatSafety) {
    const strikeInfo = `Risk score: ${state.moderationScore} | Strikes: ${state.moderationStrikes}`;
    chatSafety.textContent = `Chat blocks contact sharing, external apps/links, and meetup language. ${strikeInfo}`;
  }
  const banStatus = document.getElementById("banStatus");
  if (banStatus) {
    banStatus.textContent = state.profile.isBanned
      ? `Moderation: Chat access restricted. Reason: ${state.profile.banReason || "Policy violation"}`
      : "Moderation: No active sanctions.";
  }
  const incidentLogStatus = document.getElementById("incidentLogStatus");
  if (incidentLogStatus) {
    const count = (state.moderationIncidents || []).length;
    incidentLogStatus.textContent = `Incident log entries: ${count}`;
  }
  const chatInput = document.getElementById("chatInput");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const quickChatBar = document.getElementById("quickChatBar");
  const tempMuted = online.mutedUntil && Date.now() < online.mutedUntil;
  if (chatInput) {
    chatInput.disabled = !!state.profile.isBanned || state.profile.ageBand === "under13" || tempMuted;
    chatInput.placeholder = state.profile.ageBand === "under13"
      ? "Under-13 quick chat enabled"
      : (tempMuted ? "Temporarily muted by server moderation" : "Send room message");
  }
  if (chatSendBtn) chatSendBtn.disabled = !!state.profile.isBanned || tempMuted;
  if (quickChatBar) {
    quickChatBar.innerHTML = "";
    if (state.profile.ageBand === "under13" && !state.profile.isBanned) {
      under13QuickChatOptions.forEach((text) => {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.onclick = () => sendQuickChat(text);
        quickChatBar.appendChild(btn);
      });
    }
  }
  const modeBadge = document.getElementById("serverModeBadge");
  if (modeBadge) {
    modeBadge.classList.remove("mode-live", "mode-pages", "mode-offline");
    if (!online.connected) {
      modeBadge.textContent = "Offline";
      modeBadge.classList.add("mode-offline");
    } else if (online.mode === "broadcast") {
      modeBadge.textContent = "Pages Local";
      modeBadge.classList.add("mode-pages");
    } else {
      modeBadge.textContent = "Live WebSocket";
      modeBadge.classList.add("mode-live");
    }
  }
  const moderationSummary = document.getElementById("moderationSummary");
  if (moderationSummary) {
    if (!online.moderationSummary) {
      moderationSummary.textContent = "No moderation data yet.";
    } else {
      const counts = online.moderationSummary.lobbyCounts || {};
      moderationSummary.textContent = `Rooms: ${online.moderationSummary.rooms} | Youth: ${counts.youth || 0} | Suspect: ${counts.suspect || 0} | Adult: ${counts.adult || 0} | Events: ${online.moderationSummary.eventCount || 0}`;
    }
  }
  const moderationLog = document.getElementById("moderationLog");
  if (moderationLog) {
    moderationLog.textContent = (online.moderationEvents || []).map((event) => {
      const t = new Date(event.ts).toLocaleTimeString();
      return `[${t}] ${event.id || "inc-?"} | ${event.eventType} | ${event.username || "unknown"} | ${event.lobbyType || "unknown"} | ${event.reason || "n/a"} | score=${event.safetyScore ?? 0}`;
    }).join("\n") || "No moderation events received yet.";
  }
  const moderationActionLog = document.getElementById("moderationActionLog");
  if (moderationActionLog) {
    moderationActionLog.textContent = (online.moderationActions || []).map((event) => {
      const t = new Date(event.ts).toLocaleTimeString();
      return `[${t}] ${event.id || "act-?"} | ${event.action} | by=${event.moderatorName || "unknown-moderator"} | target=${event.targetUsername || "unknown"} | incident=${event.incidentId || "n/a"}`;
    }).join("\n") || "No moderator actions yet.";
  }
  const authStatus = document.getElementById("moderatorAuthStatus");
  if (authStatus) {
    authStatus.textContent = online.isModerator
      ? `Moderator auth: authenticated as ${online.moderatorName || "unknown"} (${online.moderatorAuthReason || "ok"})`
      : `Moderator auth: not authenticated${online.moderatorAuthReason ? ` (${online.moderatorAuthReason})` : ""}`;
  }
  const refreshModerationBtn = document.getElementById("refreshModerationBtn");
  const modUnmuteBtn = document.getElementById("modUnmuteBtn");
  const modEscalateBtn = document.getElementById("modEscalateBtn");
  if (refreshModerationBtn) refreshModerationBtn.disabled = !online.isModerator;
  if (modUnmuteBtn) modUnmuteBtn.disabled = !online.isModerator;
  if (modEscalateBtn) modEscalateBtn.disabled = !online.isModerator;
  renderWorlds();
  renderHand();
  renderProgress();
  renderStory();
  renderEconomy();
  renderDeckBuilder();
  renderEvents();
  renderCompanions();
  renderArtGallery();
  renderBondScenes();
  renderPets();
  renderMiniGameArea();
  persist();
}

document.getElementById("drawBtn").onclick = () => {
  if (state.gameOver || !state.activeWorldId) return;
  draw(3);
  log("Drew 3 cards.");
  render();
};

document.getElementById("endTurnBtn").onclick = () => enemyTurn();
document.getElementById("burstBtn").onclick = () => useBurst();
document.getElementById("resetBtn").onclick = () => resetSave();
document.getElementById("nextStoryBtn").onclick = () => advanceStory();
document.getElementById("saveCapBtn").onclick = () => {
  const raw = document.getElementById("spendingCapInput").value;
  const value = Math.max(0, Number(raw || 0));
  state.profile.weeklyCrownSpendCap = value;
  log(`Weekly crown cap set to ${value}.`);
  persist();
  render();
};
document.getElementById("confirmPurchasesToggle").onchange = (event) => {
  state.profile.requirePurchaseConfirm = !!event.target.checked;
  persist();
  render();
};
document.getElementById("familyStyleToggle").onchange = (event) => {
  state.profile.familySafeStyle = !!event.target.checked;
  persist();
  render();
};
document.getElementById("applySafetyBtn").onclick = () => {
  const age = document.getElementById("ageBandSelect").value;
  state.profile.ageBand = age;
  applySafetyPreset();
  log("Safety preset updated.");
  persist();
  render();
};
document.getElementById("summonSingleBtn").onclick = () => summonCompanions(1);
document.getElementById("summonTenBtn").onclick = () => summonCompanions(10, 270);
document.getElementById("companionSkillBtn").onclick = () => useCompanionSkill();
document.getElementById("hatchPetBtn").onclick = () => hatchPet();
document.getElementById("feedPetBtn").onclick = () => feedActivePet();
document.getElementById("trainPetBtn").onclick = () => trainActivePet();
document.getElementById("rhythmGameBtn").onclick = () => playMiniGame("rhythm");
document.getElementById("memoryGameBtn").onclick = () => playMiniGame("memory");
document.getElementById("runnerGameBtn").onclick = () => playMiniGame("runner");
document.getElementById("joinRoomBtn").onclick = () => joinOnlineRoom();
document.getElementById("chatSendBtn").onclick = () => sendChat();
document.getElementById("pingStatusBtn").onclick = () => pingStatus();
document.getElementById("exportIncidentsBtn").onclick = () => exportIncidentLog();
document.getElementById("refreshModerationBtn").onclick = () => requestModerationDashboard();
document.getElementById("moderatorAuthBtn").onclick = () => authenticateModerator();
document.getElementById("modUnmuteBtn").onclick = () => runModerationAction("unmute");
document.getElementById("modEscalateBtn").onclick = () => runModerationAction("escalate_suspect");

connectOnline();
setInterval(() => {
  requestModerationDashboard();
}, 12000);

render();
