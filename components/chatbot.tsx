"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Sparkles, Undo2, RotateCcw } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { runEngine, type ChatLink } from "@/lib/chatbot/engine"

const SECTIONS = ["hero", "products", "origin", "logistics", "inquire", "about"] as const

type Role = "user" | "assistant"
interface Message {
  id: string
  role: Role
  text: string
  links?: ChatLink[]
  source?: "local" | "ai" | "fallback"
}

function useCurrentSection() {
  const [section, setSection] = useState<string>("hero")

  useEffect(() => {
    const handler = () => {
      const viewportMid = window.scrollY + window.innerHeight / 3
      let current: string = "hero"
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.offsetTop <= viewportMid) current = id
      }
      setSection(current)
    }
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    window.addEventListener("resize", handler)
    return () => {
      window.removeEventListener("scroll", handler)
      window.removeEventListener("resize", handler)
    }
  }, [])

  return section
}

/** Render assistant text and convert inline [Label](#anchor) tokens into in-page links. */
function RenderedMessage({ text }: { text: string }) {
  const parts = useMemo(() => {
    const regex = /\[([^\]]+)\]\(#([a-zA-Z0-9_-]+)\)/g
    const out: Array<{ type: "text" | "link"; value: string; href?: string }> = []
    let last = 0
    let match: RegExpExecArray | null
    while ((match = regex.exec(text)) !== null) {
      if (match.index > last) out.push({ type: "text", value: text.slice(last, match.index) })
      out.push({ type: "link", value: match[1], href: `#${match[2]}` })
      last = match.index + match[0].length
    }
    if (last < text.length) out.push({ type: "text", value: text.slice(last) })
    return out
  }, [text])

  return (
    <span className="whitespace-pre-wrap leading-relaxed">
      {parts.map((p, i) =>
        p.type === "link" ? (
          <a
            key={i}
            href={p.href}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-saffron/40 bg-saffron/10 text-saffron font-medium hover:bg-saffron hover:text-white transition-colors mx-0.5"
          >
            {p.value}
          </a>
        ) : (
          <span key={i}>{p.value}</span>
        ),
      )}
    </span>
  )
}

function LinkChips({ links }: { links: ChatLink[] }) {
  if (!links.length) return null
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {links.map((l) => (
        <a
          key={l.href + l.label}
          href={l.href}
          className="text-[12px] px-2.5 py-1 rounded-full border border-saffron/40 bg-saffron/10 text-saffron font-medium hover:bg-saffron hover:text-white hover:border-saffron transition-colors"
        >
          {l.label}
        </a>
      ))}
    </div>
  )
}

export function Chatbot() {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [unread, setUnread] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isBusy, setIsBusy] = useState(false)
  // In-chat navigation: stack of prior message snapshots (session-only, no persistence).
  const [history, setHistory] = useState<Message[][]>([])
  const currentSection = useCurrentSection()
  const scrollRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  const isFa = lang === "fa"

  const labels = isFa
    ? {
        title: "دستیار آریانا",
        subtitle: "پاسخ سریع به سوالات شما",
        placeholder: "سوال خود را بنویسید...",
        greeting:
          "سلام! من دستیار هوشمند آریانا هستم. می‌توانم درباره محصولات، مبدا، لجستیک یا درخواست پیش‌فاکتور به شما کمک کنم.",
        send: "ارسال",
        suggestions: [
          "درباره زعفران شما بگویید",
          "شرایط ارسال و حمل چیست؟",
          "چگونه می‌توانم درخواست نمونه بدهم؟",
          "محصولات شما از کجا تامین می‌شوند؟",
        ],
        openLabel: "باز کردن چت",
        closeLabel: "بستن چت",
        poweredBy: "پاسخ‌های سریع از پایگاه دانش آریانا",
        errorText: "خطا در ارتباط. لطفاً دوباره تلاش کنید.",
        backLabel: "بازگشت به مرحله قبل",
        askAgain: "پرسیدن دوباره",
      }
    : {
        title: "Ariana Assistant",
        subtitle: "Quick answers, anytime",
        placeholder: "Ask about products, shipping, or sourcing...",
        greeting:
          "Hi there. I'm Ariana's smart assistant. Ask me about our products, sourcing regions, logistics, or how to request a quote.",
        send: "Send",
        suggestions: [
          "Tell me about your saffron",
          "What are your shipping terms?",
          "How can I request samples?",
          "Where are your products sourced?",
        ],
        openLabel: "Open chat",
        closeLabel: "Close chat",
        poweredBy: "Instant answers from the Ariana knowledge base",
        errorText: "Connection error. Please try again.",
        backLabel: "Go back one step",
        askAgain: "Ask again",
      }

  useEffect(() => {
    if (open) setUnread(false)
  }, [open])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isBusy])

  const nextId = () => `m_${++idRef.current}`

  const appendAssistant = useCallback(
    (msg: Omit<Message, "id" | "role">) => {
      setMessages((prev) => [...prev, { id: nextId(), role: "assistant", ...msg }])
      if (!open) setUnread(true)
    },
    [open],
  )

  const handleSend = useCallback(
    async (text: string) => {
      const value = text.trim()
      if (!value || isBusy) return

      // Push current messages onto the in-chat history stack BEFORE this new turn,
      // so "Back" can rewind to the state right before this question was asked.
      setHistory((h) => [...h, messages])

      const userMsg: Message = { id: nextId(), role: "user", text: value }
      setMessages((prev) => [...prev, userMsg])
      setInput("")

      // 1. Local engine on the client — instant if confident.
      const local = runEngine({ query: value, lang, currentSection })
      if (local.source === "local") {
        // Small delay for natural feel
        setIsBusy(true)
        await new Promise((r) => setTimeout(r, 220))
        setIsBusy(false)
        appendAssistant({ text: local.text, links: local.links, source: "local" })
        return
      }

      // 2. Otherwise call the API (AI fallback, also grounded server-side).
      setIsBusy(true)
      try {
        const history = messages.slice(-6).map((m) => ({ role: m.role, text: m.text }))
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: value,
            lang,
            currentSection,
            history,
          }),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = (await res.json()) as { text: string; links: ChatLink[]; source: "ai" | "local" | "fallback" }
        appendAssistant({ text: data.text, links: data.links || [], source: data.source })
      } catch (err) {
        console.error("[v0] chat request failed:", err)
        appendAssistant({
          text: labels.errorText,
          links: [
            {
              href: "#inquire",
              label: isFa ? "باز کردن فرم درخواست" : "Open inquiry form",
            },
          ],
          source: "fallback",
        })
      } finally {
        setIsBusy(false)
      }
    },
    [isBusy, lang, currentSection, messages, appendAssistant, labels.errorText, isFa],
  )

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  // Rewind to the previous chat snapshot (one turn back).
  // Pure in-chat navigation: no routing, no page reload, session-only.
  const handleBack = useCallback(() => {
    if (isBusy || history.length === 0) return
    setHistory((h) => {
      const next = h.slice(0, -1)
      const snapshot = h[h.length - 1]
      setMessages(snapshot)
      return next
    })
    setInput("")
  }, [isBusy, history])

  // Re-ask the most recent user question: rewind one step, then resend it.
  const handleAskAgain = useCallback(() => {
    if (isBusy || history.length === 0) return
    // Find the last user message in current view to resend.
    const lastUser = [...messages].reverse().find((m) => m.role === "user")
    if (!lastUser) return
    const snapshot = history[history.length - 1]
    setHistory((h) => h.slice(0, -1))
    setMessages(snapshot)
    // Defer to next tick so state settles before re-sending.
    setTimeout(() => handleSend(lastUser.text), 0)
  }, [isBusy, history, messages, handleSend])

  const canGoBack = history.length > 0 && !isBusy

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? labels.closeLabel : labels.openLabel}
        className={cn(
          "fixed z-[60] bottom-5 right-5 sm:bottom-6 sm:right-6 flex items-center justify-center",
          "w-14 h-14 rounded-full shadow-lg shadow-ink/20",
          "bg-ink text-parchment hover:bg-saffron transition-colors duration-300",
          "focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 focus:ring-offset-parchment",
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {unread && !open && (
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-saffron ring-2 ring-parchment" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            dir={isFa ? "rtl" : "ltr"}
            className={cn(
              "fixed z-[59] bottom-24 right-4 sm:right-6",
              "w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px] h-[min(560px,calc(100vh-8rem))]",
              "flex flex-col rounded-2xl overflow-hidden",
              "bg-parchment border border-saffron/20 shadow-2xl shadow-ink/20",
            )}
            role="dialog"
            aria-label={labels.title}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-ink text-parchment">
              <div className="w-9 h-9 rounded-full bg-saffron/15 flex items-center justify-center ring-1 ring-saffron/30">
                <Sparkles className="w-4 h-4 text-saffron" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-base leading-tight">{labels.title}</div>
                <div className="text-[11px] tracking-wide text-parchment/60 mt-0.5">{labels.subtitle}</div>
              </div>
              <button
                type="button"
                onClick={handleBack}
                disabled={!canGoBack}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  canGoBack
                    ? "hover:bg-parchment/10 text-parchment"
                    : "text-parchment/30 cursor-not-allowed",
                )}
                aria-label={labels.backLabel}
                title={labels.backLabel}
              >
                <Undo2 className={cn("w-4 h-4", isFa && "scale-x-[-1]")} />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-md hover:bg-parchment/10 transition-colors"
                aria-label={labels.closeLabel}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-parchment">
              {/* Greeting bubble */}
              <div className="flex gap-2">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white border border-border px-3.5 py-2.5 text-[13.5px] text-ink shadow-sm">
                  {labels.greeting}
                </div>
              </div>

              {/* Suggestion chips (only before any user message) */}
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {labels.suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSend(s)}
                      className="text-[12px] px-3 py-1.5 rounded-full border border-saffron/30 bg-white text-ink hover:bg-saffron hover:text-white hover:border-saffron transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m) => {
                const isUser = m.role === "user"
                return (
                  <div key={m.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[85%] px-3.5 py-2.5 text-[13.5px] shadow-sm",
                        isUser
                          ? "bg-ink text-parchment rounded-2xl rounded-tr-sm"
                          : "bg-white border border-border text-ink rounded-2xl rounded-tl-sm",
                      )}
                    >
                      {isUser ? (
                        <span className="whitespace-pre-wrap">{m.text}</span>
                      ) : (
                        <>
                          <RenderedMessage text={m.text} />
                          {m.links && m.links.length > 0 && <LinkChips links={m.links} />}
                        </>
                      )}
                    </div>
                  </div>
                )
              })}

              {isBusy && (
                <div className="flex justify-start">
                  <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-[13px] text-muted-text inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="border-t border-border bg-white px-3 py-2.5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={labels.placeholder}
                  className="flex-1 bg-transparent text-[14px] text-ink placeholder:text-muted-text/70 px-2 py-2 focus:outline-none"
                  disabled={isBusy}
                  aria-label={labels.placeholder}
                />
                <button
                  type="submit"
                  disabled={isBusy || !input.trim()}
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-full transition-colors",
                    "bg-saffron text-white hover:bg-saffron/90",
                    "disabled:bg-muted disabled:text-muted-text disabled:cursor-not-allowed",
                  )}
                  aria-label={labels.send}
                >
                  <Send className={cn("w-4 h-4", isFa && "rotate-180")} />
                </button>
              </div>
              <div className="text-[10px] tracking-wide text-muted-text/70 px-2 pt-1.5">{labels.poweredBy}</div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
