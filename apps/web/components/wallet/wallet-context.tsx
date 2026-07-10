"use client"

import * as React from "react"

import { USD_BALANCE } from "@/lib/balance"

type WalletState = {
  mainBalance: number
  saveBalance: number
}

type WalletContextValue = WalletState & {
  depositToSave: (amount: number) => boolean
  withdrawFromSave: (amount: number) => boolean
}

const STORAGE_KEY = "banking-wallet"

const defaultWallet: WalletState = {
  mainBalance: USD_BALANCE,
  saveBalance: 0,
}

const WalletContext = React.createContext<WalletContextValue | null>(null)

function readStoredWallet(): WalletState {
  if (typeof window === "undefined") return defaultWallet

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultWallet
    const parsed = JSON.parse(raw) as Partial<WalletState>
    return {
      mainBalance:
        typeof parsed.mainBalance === "number"
          ? parsed.mainBalance
          : defaultWallet.mainBalance,
      saveBalance:
        typeof parsed.saveBalance === "number"
          ? parsed.saveBalance
          : defaultWallet.saveBalance,
    }
  } catch {
    return defaultWallet
  }
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = React.useState<WalletState>(defaultWallet)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setWallet(readStoredWallet())
    setHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!hydrated) return
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(wallet))
  }, [hydrated, wallet])

  const value = React.useMemo<WalletContextValue>(
    () => ({
      ...wallet,
      depositToSave: (amount) => {
        if (amount <= 0 || amount > wallet.mainBalance) return false
        setWallet((prev) => ({
          mainBalance: prev.mainBalance - amount,
          saveBalance: prev.saveBalance + amount,
        }))
        return true
      },
      withdrawFromSave: (amount) => {
        if (amount <= 0 || amount > wallet.saveBalance) return false
        setWallet((prev) => ({
          mainBalance: prev.mainBalance + amount,
          saveBalance: prev.saveBalance - amount,
        }))
        return true
      },
    }),
    [wallet]
  )

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  )
}

export function useWallet() {
  const context = React.useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider.")
  }
  return context
}
