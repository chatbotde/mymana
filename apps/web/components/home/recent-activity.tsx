export function RecentActivity() {
  return (
    <section className="flex flex-col">
      <div className="border-b border-border pb-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
          Recent activity
        </h2>
      </div>

      <div className="flex min-h-36 flex-col items-center justify-center gap-1 py-12 text-center">
        <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
          No activity yet — when you add or send money, it&apos;ll show up here.
        </p>
      </div>
    </section>
  )
}
