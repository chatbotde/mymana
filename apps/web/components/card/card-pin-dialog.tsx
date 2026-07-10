"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

const DEMO_PIN = "314711"

type CardPinDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CardPinDialog({
  open,
  onOpenChange,
  onSuccess,
}: CardPinDialogProps) {
  const [pin, setPin] = React.useState("")

  React.useEffect(() => {
    if (!open) setPin("")
  }, [open])

  function handleReveal() {
    if (pin.length < 4) {
      toast.error("Enter your PIN")
      return
    }

    if (pin !== DEMO_PIN) {
      toast.error("Incorrect PIN")
      return
    }

    onSuccess()
    onOpenChange(false)
    setPin("")
    toast.success("Card details revealed")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-sm"
      >
        <DialogHeader className="gap-2 border-b border-border px-6 py-5 text-left">
          <DialogTitle className="font-serif text-[1.35rem]">
            Enter your PIN
          </DialogTitle>
          <DialogDescription>
            Confirm it&apos;s you to reveal your card details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 px-6 py-5">
          <Label htmlFor="card-pin" className="sr-only">
            PIN
          </Label>
          <Input
            id="card-pin"
            inputMode="numeric"
            maxLength={6}
            placeholder="••••"
            value={pin}
            onChange={(event) =>
              setPin(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") handleReveal()
            }}
            className="h-12 rounded-xl border-border/80 bg-muted/25 px-4 text-center font-mono text-[20px] tracking-[0.35em] shadow-none"
            autoFocus
          />
        </div>

        <div className="border-t border-border bg-muted/20 px-6 py-4">
          <Button
            type="button"
            className="h-10 w-full rounded-full text-[13px] font-medium"
            disabled={pin.length < 4}
            onClick={handleReveal}
          >
            Reveal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
