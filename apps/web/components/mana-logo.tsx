import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

type ManaMarkProps = {
  className?: string
  variant?: "default" | "card"
}

export function ManaMark({ className, variant = "default" }: ManaMarkProps) {
  const src =
    variant === "card" ? "/brand/mana-card-mark.svg" : "/brand/mana-mark.svg"

  return (
    <Image
      src={src}
      alt=""
      width={40}
      height={42}
      aria-hidden
      className={cn("h-8 w-auto", className)}
    />
  )
}

export function ManaLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 text-foreground", className)}>
      <ManaMark />
      <span className="font-serif text-2xl tracking-tight">Mana</span>
    </div>
  )
}
