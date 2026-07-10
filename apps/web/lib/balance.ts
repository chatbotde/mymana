export const ACCOUNT_LAST4 = "9603"

export const USD_BALANCE = 0

export const USD_TO_PHP = 61.52

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatPhp(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function phpEquivalent(usd: number) {
  return usd * USD_TO_PHP
}
