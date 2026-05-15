# Arcane Star Academy — Backlog

**Project:** Arcane Star Academy (Card Battler)
**Location:** `C:\Users\Taha\Desktop\CURSUR\card game`
**Hub tab:** CardGame (port 3001)
**Last updated:** 2026-05-14

---

## Status key
`todo` | `in_progress` | `shipped` | `deferred`

---

## Critical

| ID | Item | Effort | Status | Notes |
|----|------|--------|--------|-------|
| CG-CRIT-01 | Moderator token hardening | S | todo | Token must not appear in logs or client responses; audit server.js |
| CG-CRIT-02 | Chat safety filter coverage | S | todo | Verify server-side filter runs before every broadcast; add tests |
| CG-CRIT-03 | Socket.IO error handling | S | todo | Unhandled socket errors crash server; add `socket.on('error', ...)` |

## High

| ID | Item | Effort | Status | Notes |
|----|------|--------|--------|-------|
| CG-01 | Persistent game state (SQLite) | M | todo | Player data, inventory, match history lost on server restart |
| CG-02 | Battle system completion | L | todo | Core card resolution logic stubs need implementation |
| CG-03 | Companion gacha balance | M | todo | Pull rates and rarity weights need tuning |
| CG-04 | Economy anti-abuse (rate limiting) | M | todo | Gold/gem endpoints need per-player rate limits |
| CG-05 | Reconnection flow | M | todo | Socket.IO disconnect leaves player in limbo; implement rejoin-room |

## Medium

| ID | Item | Effort | Status | Notes |
|----|------|--------|--------|-------|
| CG-06 | Leaderboard endpoint | M | todo | `/api/leaderboard` — ranked by wins/ELO |
| CG-07 | Match replay export | M | todo | Record move sequence; export as JSON for replay viewer |
| CG-08 | Mobile layout (CSS) | S | todo | Panel layout breaks below 480px |
| CG-09 | Spectator mode | M | todo | Read-only room join for observers |
| CG-10 | Bot council integration | M | todo | Surface `automation/reports/` latest cycle in Hub CardGame tab |
| CG-11 | Hub push notification on match complete | S | todo | POST /api/notifications/add when a ranked match ends |

## Low

| ID | Item | Effort | Status | Notes |
|----|------|--------|--------|-------|
| CG-12 | Card art assets | L | deferred | Placeholder assets only; needs art pipeline |
| CG-13 | Voice chat (WebRTC) | XL | deferred | High complexity; deprioritised |
| CG-14 | Tournament bracket system | L | todo | Bracket management for scheduled events |
| CG-15 | Waifu asset pipeline | M | todo | `assets/waifus/README.txt` notes: assets not committed; needs CDN or LFS |

## Documentation

| ID | Item | Effort | Status |
|----|------|--------|--------|
| CG-DOC-01 | `agents.md` | S | shipped |
| CG-DOC-02 | `BACKLOG.md` | S | shipped |

---

## Hub integration notes
- CardGame started by Hub via `npm start` in the `card game` directory.
- Port: **3001** — Hub checks this port for the status LED (server default is 3000; Hub sets `PORT=3001`).
- Bot cycle: `npm run bots:cycle` — Hub can trigger this from the Terminals tab.
- Automation reports live in `automation/reports/` — read these before editing bot templates.
