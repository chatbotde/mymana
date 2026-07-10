"use client"

import Link from "next/link"
import Image from "next/image"
import * as React from "react"

import { cardInfo } from "@/lib/card"
import { routes } from "@/lib/routes"
import { cn } from "@workspace/ui/lib/utils"

function ChipIcon({ className }: { className?: string }) {
  const gradientId = React.useId()

  return (
    <svg
      viewBox="0 0 74 56"
      fill="none"
      className={cn("h-9 w-[47px] shrink-0", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E6C36A" />
          <stop offset="1" stopColor="#B68C3A" />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width="74"
        height="56"
        rx="9"
        fill={`url(#${gradientId})`}
      />
      <g stroke="#8A6A24" strokeWidth="2" opacity="0.7" fill="none">
        <line x1="0" y1="19" x2="74" y2="19" />
        <line x1="0" y1="37" x2="74" y2="37" />
        <line x1="26" y1="0" x2="26" y2="56" />
        <line x1="48" y1="0" x2="48" y2="56" />
      </g>
    </svg>
  )
}

function ContactlessIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 50"
      fill="none"
      className={cn("h-9 w-11 shrink-0", className)}
      aria-hidden
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        opacity="0.85"
      >
        <path d="M2 14 a16 16 0 0 1 0 22" />
        <path d="M12 8 a28 28 0 0 1 0 34" />
        <path d="M22 2 a40 40 0 0 1 0 46" />
      </g>
    </svg>
  )
}

function VisaSignatureMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-end text-white", className)}>
      <span className="font-serif text-[1.65rem] leading-none italic tracking-[0.04em]">
        VISA
      </span>
      <span className="mt-0.5 font-serif text-[11px] leading-none tracking-[0.08em]">
        Signature
      </span>
    </div>
  )
}

type VirtualCardProps = {
  revealed?: boolean
  href?: string | null
  frozen?: boolean
  className?: string
}

export function VirtualCard({
  revealed = false,
  href = routes.cardDetails,
  frozen = false,
  className,
}: VirtualCardProps) {
  const cardNumber = revealed
    ? cardInfo.fullNumber
    : `•••• •••• •••• ${cardInfo.last4}`

  const content = (
    <div className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[22px] p-6 text-white shadow-[0_18px_40px_rgba(17,24,39,0.22)]">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#1A2238",
          backgroundImage: [
            "radial-gradient(ellipse 58% 48% at 88% 12%, rgba(196, 98, 74, 0.42) 0%, transparent 72%)",
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 12px)",
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 12px)",
            "linear-gradient(160deg, #24304D 0%, #171E33 48%, #12182B 100%)",
          ].join(", "),
        }}
      />

      {frozen ? (
        <div className="absolute inset-0 z-10 bg-white/10 backdrop-blur-[1px]" />
      ) : null}

      <div className="relative z-20 flex items-center gap-2.5">
        <Image
          src="/brand/mana-card-mark.svg"
          alt=""
          width={34}
          height={36}
          aria-hidden
          className="h-9 w-auto"
        />
        <span className="font-serif text-[1.35rem] leading-none tracking-tight">
          Mana
        </span>
      </div>

      <div className="relative z-20 mt-5 flex items-center gap-4">
        <ChipIcon />
        <ContactlessIcon className="text-white" />
      </div>

      <div className="relative z-20 mt-auto flex flex-col gap-8 pt-8">
        <p className="font-mono text-[1.35rem] leading-none tracking-[0.18em] text-white/95">
          {cardNumber}
        </p>

        <div className="flex items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="text-[10px] font-medium tracking-[0.14em] text-white/55 uppercase">
              Valid thru {cardInfo.expiry}
            </span>
            <span className="truncate text-[15px] font-medium tracking-tight">
              {cardInfo.holder}
            </span>
          </div>

          <VisaSignatureMark className="shrink-0 pb-0.5" />
        </div>
      </div>
    </div>
  )

  const classes = cn(
    "relative block w-full max-w-[420px] transition-opacity",
    frozen && "opacity-90",
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes} aria-label="View card details">
        {content}
      </Link>
    )
  }

  return <div className={classes}>{content}</div>
}
