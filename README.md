# Valentine's Memory Journey

A 3D interactive experience where a Raccoon collects hearts to reveal memories, culminating in a meeting with a special Pig.

## Controls
- `WASD` / Arrow keys: Move the Raccoon
- `Space`: Jump
- Walk into hearts: Collect and reveal memory text
- Click the Pig prompt: Advance dialogue after all hearts are collected

## Security Hardening

This project now includes a secure API layer at `server/server.js` with:

- IP and user-based rate limiting on all public API endpoints
- Graceful `429` responses with `Retry-After` and rate-limit headers
- Strict schema-based input validation for query/body input
- Input sanitization for text fields (trim + control-character stripping)
- Rejection of unexpected fields on all validated endpoints
- Request body limits and strict `application/json` enforcement
- Baseline security response headers

## API Endpoints

- `GET /api/health`
- `GET /api/game-state?userId=<id>`
- `POST /api/hearts/collect` with JSON body `{ "userId": "...", "heartId": 1 }`
- `POST /api/dialogue/next` with JSON body `{ "userId": "..." }`
- `POST /api/reset` with JSON body `{ "userId": "..." }`

User IDs must match: `^[A-Za-z0-9_-]{3,64}$`

## Development

- Frontend: `npm run dev`
- Secure API: `npm run server`
- Lint: `npm run lint`

## Stack

- React + Vite
- React Three Fiber
- Zustand
- Tailwind CSS
- Node.js HTTP server (security middleware + validation)
