# Architecture

## Monorepo layout

```
mymanatest/
├── apps/web/                    # Main Next.js application
│   ├── app/                     # App Router pages & layouts
│   │   ├── layout.tsx           # Root: fonts, ThemeProvider, AuthProvider
│   │   ├── page.tsx             # Redirects to /home or /welcome
│   │   ├── welcome/             # Public onboarding
│   │   ├── login/               # Email + OTP login
│   │   └── (dashboard)/         # Auth-gated shell (sidebar + providers)
│   ├── components/              # Feature UI (grouped by domain)
│   ├── hooks/                   # App-specific hooks (if any)
│   └── lib/                     # Constants, helpers, route map
├── packages/ui/                 # Shared design system
│   ├── src/components/          # shadcn primitives (Button, Sidebar, …)
│   ├── src/styles/globals.css   # Tailwind + CSS variables
│   └── src/lib/utils.ts         # `cn()` helper
├── packages/eslint-config/      # Shared ESLint presets
└── packages/typescript-config/  # Shared tsconfig bases
```

Turbo orchestrates `dev`, `build`, `lint`, `typecheck`, and `format` across workspaces. The web app transpiles `@workspace/ui` via `next.config.ts`.

---

## Routing

All route paths are centralized in `apps/web/lib/routes.ts`. Use `routes.*` instead of hard-coded strings.

### Public routes

| Path | Page | Purpose |
|------|------|---------|
| `/` | `app/page.tsx` | Redirect hub |
| `/welcome` | Welcome screen | Marketing / entry |
| `/login` | Login | Email + OTP |

### Dashboard routes (`(dashboard)/layout.tsx`)

Protected by `<RequireAuth>`. Shared sidebar and context providers.

| Path | Feature |
|------|---------|
| `/home` | Balance, add money CTA, recent activity |
| `/send` | Enter remittance amount |
| `/remit/compose` | Recipient details (GCash / Maya / bank) |
| `/remit/review` | Confirm transfer |
| `/card` | Virtual card overview |
| `/card/details` | Full card number (PIN-gated) |
| `/save` | Savings wallet overview |
| `/save/amount` | Deposit / withdraw to Save |
| `/add-money` | Funding options |
| `/add-money-ach` | ACH / wire account details |
| `/account` | User & account summary |
| `/passbook` | Transaction history (empty state) |
| `/more` | Additional links |

### Legacy redirects (`next.config.ts`)

Older paths redirect to current ones, e.g. `/send/to` → `/remit/compose`, `/save/add` → `/save/amount?mode=deposit`.

### Query parameters

| Param | Used on | Meaning |
|-------|---------|---------|
| `amountMinor` | `/remit/*` | USD amount as integer micro-units (× 1_000_000) |
| `mode` | `/save/amount` | `deposit` or `withdraw` |

Helpers: `amountToMinor`, `minorToAmount`, `readAmountMinor` in `lib/amount.ts`.

---

## Provider tree

```
RootLayout
└── ThemeProvider (next-themes)
    └── AuthProvider (localStorage: mana-web-auth)
        └── [public pages OR dashboard layout]

DashboardLayout
└── RequireAuth
    └── TooltipProvider
        └── UserProvider (static mock user)
            └── WalletProvider (sessionStorage: banking-wallet)
                └── SendDraftProvider (sessionStorage: banking-send-draft)
                    └── SidebarProvider + AppSidebar + page content
                    └── Toaster (sonner)
```

### Auth (`components/auth/auth-context.tsx`)

- **Storage:** `localStorage` key `mana-web-auth`
- **Session shape:** `{ email, loggedInAt }`
- **OTP:** Fixed demo code `314711` (`lib/auth.ts` → `DEMO_OTP`)
- **API:** `sendCode`, `verifyCode`, `logout`

### Wallet (`components/wallet/wallet-context.tsx`)

- **Storage:** `sessionStorage` key `banking-wallet`
- **State:** `{ mainBalance, saveBalance }`
- **Defaults:** `mainBalance` from `USD_BALANCE` (0), `saveBalance` 0
- **Mutations:** `depositToSave(amount)`, `withdrawFromSave(amount)` — validates balance, no persistence beyond session

### Send draft (`components/send/send-draft-context.tsx`)

- **Storage:** `sessionStorage` key `banking-send-draft`
- Holds in-progress remittance: amount, method, recipient fields
- Survives navigation within the send flow

### User (`components/user/user-context.tsx`)

- Static profile from `lib/users.ts` (not tied to login email)

---

## `lib/` modules

| File | Responsibility |
|------|----------------|
| `routes.ts` | Route constants + href builders |
| `auth.ts` | OTP, storage key, email validation |
| `balance.ts` | USD/PHP formatting, exchange rate, account last4 |
| `amount.ts` | Minor-unit conversion for URL params |
| `send.ts` | Send methods, banks, fee quote, amount sanitization |
| `save.ts` | APY, benefits copy, quick amounts |
| `card.ts` | Virtual card mock data, cashback copy |
| `users.ts` | Demo user profile |
| `account-details.ts` | ACH routing/account numbers for add-money |

---

## UI package (`@workspace/ui`)

Shared shadcn components live in `packages/ui`. Import pattern:

```tsx
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import "@workspace/ui/globals.css"
```

Styling uses **Tailwind CSS 4** with CSS variables defined in `globals.css`. Icons from `lucide-react`.

### Key shared components in use

- `Sidebar` — collapsible app navigation
- `Dialog`, `Sheet`, `HoverCard` — overlays
- `Field`, `Input`, `Select` — forms
- `Button`, `Card`, `Badge`, `Avatar`
- `Sonner` — toast notifications

---

## Component organization (`apps/web/components/`)

| Folder | Domain |
|--------|--------|
| `auth/` | Login, welcome, require-auth, auth context |
| `home/` | Balance display, accounts card, recent activity |
| `send/` | Amount, recipient, review views + draft context |
| `card/` | Virtual card, PIN dialog, settings, cashback |
| `save/` | Save overview, add/withdraw flow |
| `add-money/` | Bank transfer option, account details |
| `accounts/` | Accounts view, passbook |
| `user/` | Account page, user menu |
| Root | `app-sidebar`, `dashboard-header`, `flow-header`, `amount-input`, `page-shell` |

**Convention:** Page files in `app/` stay thin; they import a `*-view` or `*-overview` component.

---

## Data flow (current)

```
┌─────────────┐     read/write      ┌──────────────────┐
│  UI pages   │ ◄──────────────────►│ React Context    │
└─────────────┘                     │ + browser storage│
                                    └──────────────────┘
                                              │
                                              ▼
                                    ┌──────────────────┐
                                    │ lib/*.ts constants│
                                    │ (mock data)       │
                                    └──────────────────┘
```

There is **no** fetch layer, React Query, or server actions for banking operations. Adding a backend means introducing an API client and replacing context mutations with server-synced state.

---

## Build & config notes

- **Node:** `>= 20` (see root `package.json`)
- **Package manager:** npm 10 (`packageManager` field)
- **Next.js 16:** Check `node_modules/next/dist/docs/` for API differences from older Next versions (`AGENTS.md` reminder)
- **TypeScript paths:** `@/` → `apps/web/` (app-local imports)

---

## Security posture (demo)

| Area | Current behavior | Production need |
|------|------------------|-----------------|
| Auth | Client-only OTP check | Server-issued tokens, rate limits |
| Card CVV/PIN | Shown after client-side PIN | Server authorization |
| Balances | Mutable in sessionStorage | Authoritative ledger |
| PII | Hard-coded in `lib/` | User-scoped API responses |

Treat all values in `lib/card.ts`, `lib/account-details.ts`, and `lib/users.ts` as **non-secret demo fixtures**.
