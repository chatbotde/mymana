import { Toaster } from "@workspace/ui/components/sonner"

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
