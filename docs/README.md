# Mana Web Documentation

Start here when picking up the project or planning new work.

## Index

1. **[architecture.md](./architecture.md)** — How the monorepo is organized, routing, React providers, `lib/` modules, and the shared UI package.
2. **[features.md](./features.md)** — What each screen does, user flows, demo data, and a feature completeness matrix.
3. **[deployment.md](./deployment.md)** — Netlify setup, 404 troubleshooting, and redeploy checklist.
4. **[roadmap.md](./roadmap.md)** — Backend, auth, ledger, Electron, testing, security, and suggested build order.

## Quick reference

| Topic | Where to look |
|-------|----------------|
| All route paths | `apps/web/lib/routes.ts` |
| Demo OTP | `314711` in `apps/web/lib/auth.ts` |
| Exchange rate | `61.52` PHP/USD in `apps/web/lib/send.ts` |
| Wallet state | `apps/web/components/wallet/wallet-context.tsx` |
| Send flow draft | `apps/web/components/send/send-draft-context.tsx` |

## Keeping docs updated

When you add a feature:

1. Add routes to `lib/routes.ts` and document them in **architecture.md**.
2. Describe the user flow in **features.md**.
3. Move items from **roadmap.md** to the changelog table when done.
