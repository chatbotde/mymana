"use client"

import * as React from "react"

import {
  defaultSendDraft,
  type SendDraft,
  type SendMethod,
} from "@/lib/send"

type SendDraftContextValue = {
  draft: SendDraft
  setAmount: (amount: string) => void
  setMethod: (method: SendMethod) => void
  setMobile: (mobile: string) => void
  setRecipientName: (name: string) => void
  setBankId: (bankId: string) => void
  setAccountNumber: (accountNumber: string) => void
  setAccountName: (accountName: string) => void
  reset: () => void
}

const SendDraftContext = React.createContext<SendDraftContextValue | null>(null)

const STORAGE_KEY = "banking-send-draft"

function readStoredDraft(): SendDraft {
  if (typeof window === "undefined") return defaultSendDraft

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultSendDraft
    return { ...defaultSendDraft, ...JSON.parse(raw) }
  } catch {
    return defaultSendDraft
  }
}

export function SendDraftProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = React.useState<SendDraft>(defaultSendDraft)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setDraft(readStoredDraft())
    setHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!hydrated) return
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
  }, [draft, hydrated])

  const value = React.useMemo<SendDraftContextValue>(
    () => ({
      draft,
      setAmount: (amount) => setDraft((prev) => ({ ...prev, amount })),
      setMethod: (method) => setDraft((prev) => ({ ...prev, method })),
      setMobile: (mobile) => setDraft((prev) => ({ ...prev, mobile })),
      setRecipientName: (recipientName) =>
        setDraft((prev) => ({ ...prev, recipientName })),
      setBankId: (bankId) => setDraft((prev) => ({ ...prev, bankId })),
      setAccountNumber: (accountNumber) =>
        setDraft((prev) => ({ ...prev, accountNumber })),
      setAccountName: (accountName) =>
        setDraft((prev) => ({ ...prev, accountName })),
      reset: () => setDraft(defaultSendDraft),
    }),
    [draft]
  )

  return (
    <SendDraftContext.Provider value={value}>
      {children}
    </SendDraftContext.Provider>
  )
}

export function useSendDraft() {
  const context = React.useContext(SendDraftContext)
  if (!context) {
    throw new Error("useSendDraft must be used within SendDraftProvider.")
  }
  return context
}
