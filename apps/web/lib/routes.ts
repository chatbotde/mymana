import { amountToMinor } from "@/lib/amount"

export const routes = {
  welcome: "/welcome",
  login: "/login",
  home: "/home",
  addMoney: "/add-money",
  addMoneyAch: "/add-money-ach",
  send: "/send",
  remitCompose: "/remit/compose",
  remitReview: "/remit/review",
  card: "/card",
  cardDetails: "/card/details",
  save: "/save",
  saveAmount: "/save/amount",
  account: "/account",
  passbook: "/passbook",
  more: "/more",
} as const

export type AppRoute = (typeof routes)[keyof typeof routes]

export function remitComposeHref(amount: string) {
  return `${routes.remitCompose}?amountMinor=${amountToMinor(amount)}`
}

export function remitReviewHref(amount: string) {
  return `${routes.remitReview}?amountMinor=${amountToMinor(amount)}`
}

export function saveAmountHref(mode: "deposit" | "withdraw" = "deposit") {
  return `${routes.saveAmount}?mode=${mode}`
}
