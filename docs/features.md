# Features & User Flows

## Authentication

### Welcome → Login

1. Unauthenticated users land on `/welcome`.
2. **Log in** navigates to `/login`.
3. User enters email → **Send code** (no real email sent).
4. User enters OTP **`314711`** → session saved to `localStorage`.
5. Redirect to `/home`.

### Logout

Triggered from user menu / account. Clears `mana-web-auth` and returns to `/welcome`.

---

## Home (`/home`)

**Components:** `AccountsCard`, `RecentActivity`, `BalanceDisplay`

- Shows USD main wallet balance (from `WalletProvider`).
- **Add money** → `/add-money`.
- Balance row links to `/account`.
- Recent activity is static / placeholder content.

**Mock constants:** `USD_BALANCE` starts at `0` in `lib/balance.ts`; wallet context can change it during the session.

---

## Add money

### `/add-money`

Presents funding methods (e.g. bank transfer).

### `/add-money-ach`

Shows copyable ACH details from `lib/account-details.ts`:

| Field | Demo value |
|-------|------------|
| Account number | 707491839603 |
| Routing number | 043087080 |
| Account name | Gasdf TestApproved |
| Bank | SSB BANK |

Transfer meta: arrives 1–3 business days, fee free.

**Gap:** No simulated deposit — balance does not increase when user “adds money.”

---

## Send / Remit (USD → PHP)

Multi-step flow with draft persisted in `sessionStorage`.

### Step 1 — Amount (`/send`)

- `AmountInput` with sanitization (max 7 integer digits, 2 decimal places).
- Live quote via `getTransferQuote()`:
  - Exchange rate: **61.52 PHP/USD** (`USD_TO_PHP`)
  - Fee: **0.25%** of amount, minimum **$0.50**
- Validates against `mainBalance` from wallet.
- Continue → `/remit/compose?amountMinor=…`

### Step 2 — Recipient (`/remit/compose`)

**Methods** (`lib/send.ts`):

| ID | Label | Typical arrival |
|----|-------|-----------------|
| `gcash` | GCash | 1–3 minutes |
| `maya` | Maya | 1–3 minutes |
| `bank` | Bank (InstaPay) | 1–3 minutes |

**Bank transfer** uses `philippineBanks` list (BDO, BPI, Metrobank, UnionBank, Landbank).

Fields vary by method (mobile + name for e-wallets; bank id + account number + name for bank).

### Step 3 — Review (`/remit/review`)

Confirms amount, fee, PHP received, recipient details.

**Gap:** Confirm does not deduct balance or create a transaction record.

---

## Virtual card (`/card`)

**Data source:** `lib/card.ts` → `cardInfo`

| Field | Demo value |
|-------|------------|
| Number | 4242 4242 4242 8268 |
| Expiry | 09/31 |
| CVV | 847 |
| Network | Visa Signature |
| Cashback | 1% rate, $0 earned |

### Actions (client-only)

- **Freeze / unfreeze** — local `frozen` state + toast
- **View details** — opens PIN dialog, then reveals full number on card
- **Settings** — dialog placeholder
- **Cashback section** — educational copy from `cashbackHowItWorks`

`/card/details` — dedicated details page (PIN-gated).

---

## Save wallet (`/save`)

High-yield savings sub-wallet with **3.5% APY** (`SAVE_APY`).

### Overview

- Shows Save balance or APY pitch if empty.
- Benefits list from `saveBenefits`.
- Quick actions: deposit / withdraw.

### `/save/amount?mode=deposit|withdraw`

- Quick amounts: $50, $100, $250 (`saveQuickAmounts`).
- Custom amount input.
- `depositToSave` / `withdrawFromSave` move funds between main and Save balances in `WalletProvider`.

**Gap:** No interest accrual simulation; `SAVE_TERMS_URL` is empty.

---

## Account (`/account`)

User profile (`lib/users.ts`):

| Field | Value |
|-------|-------|
| Name | Gasdf TestApproved |
| Phone | +115555550025 |
| Initials | GT |

Links to passbook, settings, logout.

---

## Passbook (`/passbook`)

Empty state: “No account transactions yet.”

**Gap:** No ledger integration; send/save operations do not append rows.

---

## Sidebar navigation

| Item | Route |
|------|-------|
| Home | `/home` |
| Send | `/send` |
| Card | `/card` |
| Save | `/save` |
| Account (footer) | `/account` |

---

## Formatting & amounts

### Currency

- USD: `formatUsd()` — `en-US`, 2 decimals
- PHP: `formatPhp()` — `en-PH`, 2 decimals

### URL-safe amounts

Amounts in query strings use **minor units** (× 1_000_000) to avoid floating-point issues:

```ts
amountToMinor("12.50")  // 12500000
minorToAmount(12500000) // "12.50"
```

---

## Demo credentials cheat sheet

| What | Value |
|------|-------|
| OTP | `314711` |
| Login email | Any valid email format |
| Card PIN (UI) | Check `card-pin-dialog.tsx` if implemented |
| Account last 4 | `9603` (`ACCOUNT_LAST4`) |

---

## Feature completeness matrix

| Feature | UI | State updates | Persistence | Backend |
|---------|----|--------------|--------------|---------|
| Login | ✅ | ✅ | localStorage | ❌ |
| Home balance | ✅ | ✅ | sessionStorage | ❌ |
| Add money | ✅ | ❌ | — | ❌ |
| Send remit | ✅ | ❌ | draft only | ❌ |
| Virtual card | ✅ | local UI | — | ❌ |
| Save deposit/withdraw | ✅ | ✅ | sessionStorage | ❌ |
| Passbook | ✅ empty | ❌ | — | ❌ |
| Recent activity | ✅ static | ❌ | — | ❌ |
