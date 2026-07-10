import { Suspense } from "react"

import { SendReviewView } from "@/components/send/send-review-view"

export default function RemitReviewPage() {
  return (
    <Suspense>
      <SendReviewView />
    </Suspense>
  )
}
