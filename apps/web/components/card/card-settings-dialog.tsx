"use client"

import { ChevronRightIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"

const settingsItems = [
  {
    id: "physical",
    title: "Order a physical card",
    description: "A physical card mailed to you",
  },
  {
    id: "replace",
    title: "Report lost / replace",
    description: "Cancel this card and issue a new one",
  },
] as const

type CardSettingsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CardSettingsDialog({
  open,
  onOpenChange,
}: CardSettingsDialogProps) {
  function handleItemClick(id: (typeof settingsItems)[number]["id"]) {
    if (id === "physical") {
      toast.message("Physical card ordering is not available in this demo.")
      return
    }

    toast.message("Card replacement is not available in this demo.")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-md"
      >
        <DialogHeader className="border-b border-border px-6 py-5 text-left">
          <DialogTitle className="font-serif text-[1.35rem]">
            Card settings
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          {settingsItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item.id)}
              className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border px-6 py-4 text-left transition-colors last:border-b-0 hover:bg-muted/40"
            >
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-[14px] font-medium tracking-tight text-foreground">
                  {item.title}
                </span>
                <span className="text-[12px] leading-relaxed text-muted-foreground">
                  {item.description}
                </span>
              </span>
              <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground/80" />
            </button>
          ))}
        </div>

        <div className="border-t border-border bg-muted/20 px-6 py-4">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full rounded-full text-[13px] font-medium"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
