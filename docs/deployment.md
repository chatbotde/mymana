# Deployment

## Vercel (recommended for Next.js)

### “Project ready!” with a Button — wrong app deployed

If you see a black page saying **“Project ready!”** and **“We've already added the button component for you”**, that is the **default shadcn/ui starter template** — **not** your Mana banking app.

Your real app locally has `/welcome`, `/home`, `/login`, `/send`, etc. That starter page is **not in your current code** anymore.

**Why it happens:**

| Cause | Fix |
|-------|-----|
| Local banking code was **never pushed to Git** | Commit + push all files, then redeploy on Vercel |
| Vercel linked to a **different repo** or template | Re-import the correct GitHub repo |
| **Root Directory** points to wrong folder | Set to `apps/web` (see below) |
| Deployed from Vercel’s **“Deploy template”** button | Connect your own repo instead |

### Correct Vercel settings

Open **Project Settings → General → Root Directory**.

| Setting | Value |
|---------|--------|
| **Root Directory** | `apps/web` |
| **Framework** | Next.js (auto-detected) |
| **Build Command** | *(default `next build` is fine)* |
| **Install Command** | *(leave default — Vercel installs from monorepo root)* |
| **Node.js Version** | `20.x` |

If your Git repo root is `internshiptest` (parent of `mymanatest`):

| Setting | Value |
|---------|--------|
| **Root Directory** | `mymanatest/apps/web` |

`apps/web/vercel.json` is included to run `turbo build` from the monorepo root when needed.

### After fixing settings

1. **Push your code to GitHub** (all of `mymanatest/`).
2. In Vercel → **Deployments** → **Redeploy** (or push a new commit).
3. Open your site — you should see **“Loading…”** then redirect to `/welcome`.
4. Log in with any email + OTP **`314711`**.

### Verify the right build deployed

In the Vercel build log, you should see routes like:

```
/home, /welcome, /login, /send, /card, /save, ...
```

If the build only shows `/` with a static page, the wrong directory is still selected.

---

## Netlify

If you see Netlify’s generic **“Page not found”** screen, the site is live but Netlify is not serving your Next.js app correctly. This is almost always a **build settings** issue, not a bug in the app routes.

## Required Netlify settings

Open **Site configuration → Build & deploy → Continuous deployment → Build settings**.

| Setting | Value |
|---------|--------|
| **Base directory** | *(empty)* — repo root is `mymanatest` |
| **Package directory** | `apps/web` |
| **Build command** | `npx turbo run build --filter=web` |
| **Publish directory** | *(empty)* — do **not** set `.next` or `public` manually |
| **Node version** | `20` (or use `NODE_VERSION` from `netlify.toml`) |

The config file lives at `apps/web/netlify.toml`. Netlify reads it when **Package directory** is `apps/web`.

### If your Git repo root is `internshiptest` (parent folder)

Set **Base directory** to `mymanatest` instead of leaving it empty.

```
internshiptest/          ← Git repo root on Netlify
└── mymanatest/          ← Base directory
    ├── apps/web/
    └── package.json
```

## Common mistakes that cause 404

| Mistake | What happens |
|---------|----------------|
| Publish directory = `public` | Only static assets deploy; no Next.js pages |
| Publish directory = `apps/web/.next` with Base = `apps/web` | Path doubles to `apps/web/apps/web/.next` → failed deploy |
| Base directory wrong | `npm install` / build runs in wrong folder |
| No `@netlify/plugin-nextjs` | Static hosting without Next.js runtime → routes 404 |
| Build command = `next build` from root | Workspace deps missing → build fails silently |

## Verify locally before redeploying

```bash
cd mymanatest
npm install
npx turbo run build --filter=web
```

A successful build lists routes like `/`, `/home`, `/login`, `/welcome`, etc.

## Redeploy checklist

1. Commit `apps/web/netlify.toml` and push.
2. In Netlify UI, fix Base / Package / Publish settings (table above).
3. **Clear build cache**: Deploys → Trigger deploy → **Clear cache and deploy site**.
4. Open the deploy log and confirm:
   - `turbo run build --filter=web` succeeds
   - `@netlify/plugin-nextjs` runs (or OpenNext adapter)
   - No error about missing `.next` directory

## Demo login after deploy

1. Visit `/welcome`
2. Log in with any valid email
3. OTP: **`314711`**

## Alternative hosts

| Platform | Notes |
|----------|--------|
| **Vercel** | Import monorepo; set root to `apps/web` or use Turbo. Zero-config for Next.js. |
| **Static export** | Not recommended here — app uses `redirects()` in `next.config.ts` and client routing. |

## Environment variables (future)

When you add a backend, set variables in Netlify UI under **Environment variables**. None are required for the current demo.
