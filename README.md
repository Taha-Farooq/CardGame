# Arcane Star Academy (Prototype)

Original anime-inspired browser card battler prototype with a multi-world structure designed for future expansion.

## Run

Run as a browser game server (recommended):

1. Run `npm start`.
2. Open `http://localhost:3000`.
3. Pick a world and start battling.

Fallback: open `index.html` directly (offline mode, no online plaza).

## GitHub Pages Hosting

You can host this project on GitHub Pages because the core game is static.

1. Push files to your repo.
2. In GitHub repo settings, enable Pages from `main` branch root.
3. Open your Pages URL.

Notes:
- Core game works fully on Pages.
- Online Plaza runs in **GitHub Pages local mode** (tab-local sync via `BroadcastChannel`).
- Full multi-user room server mode requires running `server.js` on your own host.

## Current Features

- Turn-based card combat (energy, shield, combo, lifesteal, burst).
- Multi-world progression with unlockable worlds.
- Persistent save data in browser `localStorage`.
- Reward loop using gold and gems.
- Premium-style `Crowns` currency and exchange packs (gold -> crowns).
- Crown Shop with consumable battle items.
- Inventory system with usable items during battle.
- Family-friendly story journal with chapter progression.
- Rotating daily shop stock with category filters.
- World-linked quest board with crown and gold rewards.
- Parent controls: weekly crown spend cap and purchase confirmation toggle.
- Deck Lab to customize your active battle deck (4-12 cards).
- Story-gated world progression that unlocks through chapter progress.
- Rotating world events with bonus rewards per world.
- Companion Sanctum with summonable anime-style guardian muses.
- Active companion bonuses (HP, burst start, and bonus gold rewards).
- Companion active skills (once-per-battle tactical actions).
- Rate-up companion banner rotation with legendary pity counter.
- Affinity-based companion bond story scenes.
- Pet Pavilion with hatching, feeding, training, and active pet bonuses.
- Arcade mini-games with daily play limits and reward loops.
- Interactive mini-games: timing challenge, memory sequence, and lane-choice runner.
- Browser server with Online Plaza room join/chat/state sharing via WebSocket.
- Companion art gallery slots (`assets/waifus/`) with portrait rendering hooks.
- Shiny foil card variants and animated battle hit/attack effects.
- Rating-safe style controls: family-safe mode and teen fantasy glamour presentation.
- Safety Hub with age-band presets, stricter youth defaults, and chat safety filtering.

## Expansion Hooks

- Add more worlds to `worlds` in `script.js`.
- Add more cards to `baseDeck`.
- Replace gem-based unlocks with subscriptions, passes, or story keys.
- Move to a client/server architecture when you want real accounts and multiplayer.

## Legal Docs Included

- `LICENSE` (proprietary commercial license)
- `EULA.md`
- `TERMS.md`
- `PRIVACY.md`
