"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/**
 * Minimal, isolated floating back button.
 * - Mounts only after hydration (prevents SSR/CSR mismatch and race conditions).
 * - Only visible when there is real history to go back to (or a hash route from another page).
 * - Uses router.back() with a graceful window.history fallback.
 * - Positioned bottom-left so it never collides with the chatbot launcher (bottom-right).
 * - Uses existing design tokens only (ink / parchment / saffron). No layout impact (position: fixed).
 */
export function BackButton() {
  const router = useRouter()
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      // history.length > 1 means there is at least one prior entry in this tab session.
      // Also show if the user landed via a same-origin referrer (likely an internal nav).
      const hasHistory = typeof window !== "undefined" && window.history.length > 1
      const sameOriginRef =
        typeof document !== "undefined" &&
        !!document.referrer &&
        (() => {
          try {
            return new URL(document.referrer).origin === window.location.origin
          } catch {
            return false
          }
        })()
      setCanGoBack(Boolean(hasHistory || sameOriginRef))
    } catch {
      setCanGoBack(false)
    }
  }, [])

  const onClick = useCallback(() => {
    try {
      router.back()
    } catch {
      if (typeof window !== "undefined") window.history.back()
    }
  }, [router])

  if (!mounted || !canGoBack) return null

  const label = language === "fa" ? "بازگشت" : "Back"
  const isFa = language === "fa"

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "fixed bottom-6 left-6 z-50",
        "flex items-center gap-2",
        "h-11 px-4 rounded-full",
        "bg-ink/90 text-parchment hover:bg-ink",
        "border border-parchment/15",
        "shadow-lg shadow-ink/20 backdrop-blur",
        "text-sm tracking-wide",
        "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
        "focus:outline-none focus:ring-2 focus:ring-saffron/60 focus:ring-offset-2 focus:ring-offset-parchment",
        isFa ? "font-[var(--font-vazirmatn)] flex-row-reverse" : "font-sans"
      )}
      dir={isFa ? "rtl" : "ltr"}
    >
      <ArrowLeft className={cn("h-4 w-4", isFa && "rotate-180")} aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}
