import { cn } from "@workspace/ui/lib/utils"

type PageShellProps = {
  children: React.ReactNode
  className?: string
  width?: "default" | "wide" | "narrow"
}

const widthClass = {
  narrow: "max-w-xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
} as const

export function PageShell({
  children,
  className,
  width = "default",
}: PageShellProps) {
  return (
    <main
      className={cn(
        "mx-auto flex w-full flex-1 flex-col gap-8 px-4 py-6 md:px-8 md:py-10",
        widthClass[width],
        className
      )}
    >
      {children}
    </main>
  )
}
