const worlds = [
  { id: "academy", name: "Sky Academy", difficulty: 1, unlockGemCost: 0, enemy: "Rookie Duelist", rewardGold: 35, rewardGems: 3 },
  { id: "ember", name: "Ember Wastes", difficulty: 2, unlockGemCost: 20, enemy: "Flare Ronin", rewardGold: 65, rewardGems: 5 },
  { id: "tide", name: "Tide Shrine", difficulty: 3, unlockGemCost: 35, enemy: "Abyss Priestess", rewardGold: 100, rewardGems: 8 },
  { id: "shade", name: "Shade Citadel", difficulty: 4, unlockGemCost: 55, enemy: "Night Marshal", rewardGold: 145, rewardGems: 12 },
];

const storyChapters = [
  {
    title: "Chapter 1 - The Falling Light",
    text: "A harmless starshard rain lights up the Academy sky. You and your friends discover one shard pulsing with a strange symbol: the Crest of Eclipse.",
  },
  {
    title: "Chapter 2 - The Vanishing Lessons",
    text: "Entire pages fade from magical textbooks overnight. Professors whisper about an old spell thief called the Ink Eater returning from the Ember Wastes.",
  },
  {
    title: "Chapter 3 - Echoes in the Tide Shrine",
    text: "Ancient water mirrors show a masked figure gathering lost spells from every world. Their goal is not destruction, but to rewrite how magic chooses its students.",
  },
  {
    title: "Chapter 4 - Citadel of Night",
    text: "In Shade Citadel, you learn the masked figure is Headmage Sol, believed gone for decades. Sol claims magic should belong to everyone, not only the gifted few.",
  },
  {
    title: "Chapter 5 - The Promise Star",
    text: "You and Sol duel beneath a meteor shimmer. No one is harmed; fighters faint and wake safely in healing wards. The final choice is yours: seal magic away, or share it wisely.",
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
  },
  activeWorldId: null,
  player: { hp: 100, maxHp: 100, energy: 1, shield: 0, burst: 0 },
  enemy: { name: "Enemy", hp: 100, maxHp: 100, energy: 1, shield: 0 },
  hand: [],
  inventory: {},
  questProgress: {},
  completedQuestIds: [],
  weeklyCrownSpent: 0,
  weeklySpendResetTick: 0,
  activeShopCategory: "all",
  rotationSeed: 0,
  turnAttackPlayed: false,
  gameOver: false,
  log: [],
};

let state = loadState();

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
  return { ...baseDeck[Math.floor(Math.random() * baseDeck.length)] };
}

function log(msg) {
  state.log.unshift(msg);
  state.log = state.log.slice(0, 35);
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
  state.activeWorldId = world.id;
  state.gameOver = false;
  state.hand = [];
  state.turnAttackPlayed = false;
  state.log = [];
  state.player = { hp: 100, maxHp: 100, energy: 2, shield: 0, burst: 0 };
  state.enemy = {
    name: world.enemy,
    hp: 88 + world.difficulty * 25,
    maxHp: 88 + world.difficulty * 25,
    energy: 1 + world.difficulty,
    shield: 0,
  };
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
    dealt = damageTarget(state.enemy, card.value);
    state.enemy.hp -= dealt;
    state.player.hp = clamp(state.player.hp + Math.floor(card.value / 2), 0, state.player.maxHp);
    state.turnAttackPlayed = true;
    state.player.burst += 9;
  } else if (card.type === "combo") {
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
  const dealt = damageTarget(state.enemy, burstDamage);
  state.enemy.hp -= dealt;
  state.player.burst = 0;
  log(`Astral Burst lands for ${dealt}!`);
  if (state.enemy.hp <= 0) winBattle();
  render();
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
  log(`Victory! +${world.rewardGold} gold, +${world.rewardGems} gems, +${Math.ceil(world.rewardGems / 2)} crowns.`);
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
  localStorage.removeItem("arcane-star-save");
  state = structuredClone(initialState);
  render();
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

function renderWorlds() {
  const worldList = document.getElementById("worldList");
  worldList.innerHTML = "";

  worlds.forEach((world) => {
    const unlocked = state.profile.unlockedWorldIds.includes(world.id);
    const cleared = !!state.profile.clearedWorlds[world.id];

    const card = document.createElement("article");
    card.className = `world-card ${unlocked ? "" : "locked"}`.trim();

    const status = unlocked ? (cleared ? "Cleared" : "Unlocked") : `Locked (${world.unlockGemCost} gems)`;
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
    el.className = "card";
    el.innerHTML = `
      <h4>${card.name}</h4>
      <p>Cost: ${card.cost}</p>
      <p>${card.text}</p>
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
    return;
  }
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

function render() {
  document.getElementById("playerName").textContent = state.profile.name;
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
  renderWorlds();
  renderHand();
  renderProgress();
  renderStory();
  renderEconomy();
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

render();
