export const SAVE_APY = 3.5

/** Set when Terms & pricing page is ready. */
export const SAVE_TERMS_URL = ""

export const saveBenefits = [
  {
    id: "interest",
    title: "Earn instant, daily interest as soon as you fund your Save wallet",
    tone: "success" as const,
    icon: "zap",
  },
  {
    id: "flexibility",
    title: "No lock-ups, minimums or maximums",
    tone: "warning" as const,
    icon: "shield",
  },
  {
    id: "transfer",
    title: "Move money back to your main wallet instantly at no cost",
    tone: "success" as const,
    icon: "refresh",
  },
] as const

export const saveQuickAmounts = [50, 100, 250] as const
