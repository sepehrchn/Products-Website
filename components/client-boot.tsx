"use client"

import { useEffect, useState, Suspense, lazy } from "react"

// Lazy-load chatbot + back button so they never block initial render / hydration.
const Chatbot = lazy(() => import("@/components/chatbot").then((m) => ({ default: m.Chatbot })))
const BackButton = lazy(() =>
  import("@/components/back-button").then((m) => ({ default: m.BackButton })),
)

/**
 * Client boot layer:
 * - Defers mounting of non-critical UI (chatbot, back button) until after first paint.
 * - Prevents race conditions with routing/hydration.
 * - Uses requestIdleCallback when available for minimal main-thread impact.
 * - Wrapped in error-safe Suspense; failures here never affect the rest of the app.
 */
export function ClientBoot() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const schedule = (cb: () => void) => {
      if (typeof window === "undefined") return
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      }
      if (typeof w.requestIdleCallback === "function") {
        w.requestIdleCallback(() => !cancelled && cb(), { timeout: 1500 })
      } else {
        setTimeout(() => !cancelled && cb(), 200)
      }
    }
    schedule(() => setReady(true))
    return () => {
      cancelled = true
    }
  }, [])

  if (!ready) return null

  return (
    <Suspense fallback={null}>
      <BackButton />
      <Chatbot />
    </Suspense>
  )
}
