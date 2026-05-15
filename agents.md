# Arcane Star Academy — Agent Instructions

**Project:** Arcane Star Academy (Card Battler)
**Stack:** Node.js (Express + Socket.IO), Vanilla JS + HTML frontend
**Entry point:** `server.js`
**Port:** 3000 (default) — Hub overrides to 3001 via `PORT` env var
**Hub tab:** CardGame

---

## What this project is

Browser-based multiplayer card battler with companion gacha, online rooms, safety moderation, and economy systems. Players collect companions, battle, and trade through a real-time multiplayer lobby.

Key systems:
- **Online Plaza** — Socket.IO room system with presence + chat
- **Safety Hub** — Age-band safety presets, content filtering, incident log export
- **Moderator Console** — Live telemetry, ban/warn/review workflows with token auth
- **Automation bots** — `automation/` directory; `npm run bots:cycle` runs the council cycle
- **GitHub Actions** — `bot-cycle.yml` auto-cycles bots; `pages.yml` deploys frontend

---

## How to run

```powershell
# Via Hub (recommended)
# Click the CardGame entry in the Hub left panel

# Manual start
cd "C:\Users\Taha\Desktop\CURSUR\card game"
npm start
# Open http://localhost:3000
```

---

## Key files

| File | Role |
|------|------|
| `server.js` | Express + Socket.IO server — all API routes and socket events |
| `index.html` | Single-page frontend — all game UI |
| `styles.css` | UI styles |
| `automation/` | Bot scripts and council-cycle automation |
| `automation/backlog.json` | Machine-readable feature backlog |
| `scripts/bot-council-cycle.js` | Bot cycle runner (`npm run bots:cycle`) |
| `scripts/sync-core-to-products.js` | Core-to-product sync (`npm run split:sync-core`) |
| `.github/workflows/bot-cycle.yml` | GitHub Actions bot cycle |
| `.github/workflows/pages.yml` | GitHub Pages deploy |

---

## Adding new features

### New Socket.IO event
1. Add handler in `server.js` inside the `io.on('connection', ...)` block
2. Emit from `index.html` JS using `socket.emit('event-name', data)`
3. Listen for server response: `socket.on('event-response', handler)`

### New REST endpoint
1. Add `app.get('/api/...')` or `app.post('/api/...')` in `server.js`
2. Call from `index.html` via `fetch('/api/...')`

### New UI panel
1. Add a `<section class="panel ...">` block in `index.html`
2. Wire buttons to `socket.emit()` or `fetch()` calls in the inline `<script>` at bottom of `index.html`

---

## Safety and moderation

- Age-band presets are applied on `applySafetyBtn` click — adjust thresholds in `server.js`
- Moderator auth uses a token stored server-side — never log or expose tokens in the frontend
- Incident log export returns JSON; no PII should appear in incident records
- Chat safety filter runs server-side before broadcast — never trust client-side filtering alone

---

## Hub-Managed Workflow

Arcane Star Academy is managed by the Bot Management Hub at `http://localhost:8420`.

Agents working on this project should:
- Direct the operator to the Hub UI for start/stop actions — use the CardGame entry in the left panel.
- Use the Hub's embedded Terminals tab for `npm install` or debugging — no separate CMD/PowerShell windows.
- Check the Hub's Diagnostics tab for connection status before investigating Socket.IO errors.
- Reference the Hub's Logs tab to tail server output.
- When the bot cycle reports issues, check `automation/reports/` for the latest cycle JSON before modifying code.
- Never open separate CMD/PowerShell windows — use the Hub Terminals tab.

---

## Sources of truth

| File | Role |
|------|------|
| `server.js` | Full backend — routes, socket events, moderation logic |
| `index.html` | Full frontend — all panels and client JS |
| `BACKLOG.md` | Prioritised work items |
| `agents.md` | This file — onboarding for coding agents |
| `automation/backlog.json` | Machine-readable backlog (bot-readable format) |
