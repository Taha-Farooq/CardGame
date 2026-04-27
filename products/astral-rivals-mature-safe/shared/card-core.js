const DEFAULT_RULES = {
  minDeckSize: 4,
  maxDeckSize: 12,
  basePlayerHp: 100,
  baseEnergy: 1,
  burstReadyAt: 100,
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createCoreContext(overrides = {}) {
  return {
    rules: { ...DEFAULT_RULES, ...overrides },
  };
}

function validateDeck(deckIds, rules = DEFAULT_RULES) {
  const size = Array.isArray(deckIds) ? deckIds.length : 0;
  if (size < rules.minDeckSize) {
    return { ok: false, reason: `Deck must have at least ${rules.minDeckSize} cards.` };
  }
  if (size > rules.maxDeckSize) {
    return { ok: false, reason: `Deck cannot exceed ${rules.maxDeckSize} cards.` };
  }
  return { ok: true, reason: "" };
}

function applyDamage(target, amount) {
  const blocked = Math.min(target.shield || 0, amount);
  const finalDamage = Math.max(0, amount - blocked);
  return {
    blocked,
    finalDamage,
    next: {
      ...target,
      shield: Math.max(0, (target.shield || 0) - blocked),
      hp: Math.max(0, (target.hp || 0) - finalDamage),
    },
  };
}

function canUseBurst(player, rules = DEFAULT_RULES) {
  return (player?.burst || 0) >= rules.burstReadyAt;
}

module.exports = {
  DEFAULT_RULES,
  clamp,
  createCoreContext,
  validateDeck,
  applyDamage,
  canUseBurst,
};
