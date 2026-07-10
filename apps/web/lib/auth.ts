export const DEMO_OTP = "314711"
export const AUTH_STORAGE_KEY = "mana-web-auth"

export type AuthSession = {
  email: string
  loggedInAt: string
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}
