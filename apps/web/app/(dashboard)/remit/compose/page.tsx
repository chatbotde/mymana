import { Suspense } from "react"

import { SendRecipientView } from "@/components/send/send-recipient-view"

export default function RemitComposePage() {
  return (
    <Suspense>
      <SendRecipientView />
    </Suspense>
  )
}
