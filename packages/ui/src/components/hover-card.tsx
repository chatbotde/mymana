"use client"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@workspace/ui/lib/utils"

function HoverCard({ modal = false, ...props }: PopoverPrimitive.Root.Props) {
  return (
    <PopoverPrimitive.Root data-slot="hover-card" modal={modal} {...props} />
  )
}

function HoverCardTrigger({
  openOnHover = true,
  delay = 250,
  closeDelay = 120,
  className,
  ...props
}: PopoverPrimitive.Trigger.Props) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="hover-card-trigger"
      openOnHover={openOnHover}
      delay={delay}
      closeDelay={closeDelay}
      className={className}
      {...props}
    />
  )
}

function HoverCardContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "top",
  sideOffset = 8,
  children,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            "z-50 w-72 origin-(--transform-origin) rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
