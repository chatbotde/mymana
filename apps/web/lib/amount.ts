const MINOR_FACTOR = 1_000_000

export function amountToMinor(amount: string | number) {
  const parsed =
    typeof amount === "string" ? Number.parseFloat(amount) : amount

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0
  }

  return Math.round(parsed * MINOR_FACTOR)
}

export function minorToAmount(minor: number) {
  if (!Number.isFinite(minor) || minor < 0) {
    return "0"
  }

  const amount = minor / MINOR_FACTOR
  return amount % 1 === 0 ? String(amount) : amount.toFixed(2)
}

export function readAmountMinor(searchParams: URLSearchParams | null) {
  const raw = searchParams?.get("amountMinor")
  if (!raw) return null

  const minor = Number.parseInt(raw, 10)
  if (!Number.isFinite(minor) || minor <= 0) return null

  return minor
}
