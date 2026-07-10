export const AVAILABLE_BALANCE = 0
export const USD_TO_PHP = 61.52
export const FEE_RATE = 0.0025
export const MIN_FEE = 0.5

export type SendMethod = "gcash" | "maya" | "bank"

export type SendDraft = {
  amount: string
  method: SendMethod
  mobile: string
  recipientName: string
  bankId: string
  accountNumber: string
  accountName: string
}

export const defaultSendDraft: SendDraft = {
  amount: "0",
  method: "gcash",
  mobile: "",
  recipientName: "",
  bankId: "",
  accountNumber: "",
  accountName: "",
}

export const sendMethods = [
  {
    id: "gcash" as const,
    label: "GCash",
    arrival: "1–3 minutes",
  },
  {
    id: "maya" as const,
    label: "Maya",
    arrival: "1–3 minutes",
  },
  {
    id: "bank" as const,
    label: "Bank (InstaPay)",
    arrival: "1–3 minutes",
  },
]

export const philippineBanks = [
  { id: "bdo", label: "BDO Unibank" },
  { id: "bpi", label: "BPI" },
  { id: "metrobank", label: "Metrobank" },
  { id: "unionbank", label: "UnionBank" },
  { id: "landbank", label: "Landbank" },
] as const

export function parseAmount(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

export function formatPhp(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatAmountDisplay(value: string) {
  if (!value || value === "0") return "$0"
  if (value.endsWith(".")) return `$${value}`
  const [whole, fraction] = value.split(".")
  const wholeFormatted = Number(whole || "0").toLocaleString("en-US")
  return fraction !== undefined
    ? `$${wholeFormatted}.${fraction}`
    : `$${wholeFormatted}`
}

export function sanitizeAmountInput(value: string) {
  let next = value.replace(/[^\d.]/g, "")
  const firstDot = next.indexOf(".")

  if (firstDot !== -1) {
    next =
      next.slice(0, firstDot + 1) +
      next.slice(firstDot + 1).replace(/\./g, "")
  }

  const [whole = "", fraction] = next.split(".")
  const limitedWhole = whole.slice(0, 7)

  if (fraction !== undefined) {
    return `${limitedWhole}.${fraction.slice(0, 2)}`
  }

  return limitedWhole
}

export function getTransferQuote(
  amountValue: string,
  availableBalance: number = AVAILABLE_BALANCE
) {
  const amount = parseAmount(amountValue)
  const fee = amount > 0 ? Math.max(amount * FEE_RATE, MIN_FEE) : 0
  const receives = amount * USD_TO_PHP

  return {
    amount,
    fee,
    receives,
    rate: USD_TO_PHP,
    hasInsufficientBalance: amount > availableBalance,
    isValidAmount: amount > 0,
  }
}

export function getMethodLabel(method: SendMethod) {
  return sendMethods.find((item) => item.id === method)?.label ?? method
}

export function getBankLabel(bankId: string) {
  return philippineBanks.find((bank) => bank.id === bankId)?.label ?? bankId
}

export function getArrivalLabel(method: SendMethod) {
  return sendMethods.find((item) => item.id === method)?.arrival ?? "Soon"
}
