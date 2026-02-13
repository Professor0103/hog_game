# Valentine's Hoggy Journey

A 3D interactive experience for my girlfriend. 

## Controls
- `WASD` / Arrow keys: Move the Raccoon
- `Space`: Jump
- Walk into hearts: Collect and reveal memory text
- Click the Pig prompt: Advance dialogue after all hearts are collected


## Stack

- React + Vite
- React Three Fiber
- Zustand
- Tailwind CSS
- Node.js HTTP server (security middleware + validation)

## GitHub Pages (why the site might not appear)

1. **Settings → Pages**
   - **Build and deployment** → Source must be **GitHub Actions** (not "Deploy from a branch").

2. **Environments**
   - **Settings → Environments** → open **github-pages**.
   - If it’s the first deploy, you may need to approve the deployment or remove protection so the workflow can deploy.

3. **Actions**
   - **Actions** tab → open the latest **Deploy to GitHub Pages** run.
   - If the run is red, the build or deploy failed; open the failed job and check the logs (often `npm ci` or `npm run build`).

4. **URL**
   - Project site: `https://<username>.github.io/hog_game/` (include the trailing slash if needed).
