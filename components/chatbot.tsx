"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const SECTIONS = ["hero", "products", "origin", "logistics", "inquire", "about"] as const

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

function getMessageText(m: UIMessage): string {
  if (!m.parts || !Array.isArray(m.parts)) return ""
  return m.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

/** Render assistant text and convert [Label](#anchor) into in-page links. */
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

export function Chatbot() {
  const { lang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [unread, setUnread] = useState(false)
  const currentSection = useCurrentSection()
  const scrollRef = useRef<HTMLDivElement>(null)

  const isFa = lang === "fa"

  const labels = isFa
    ? {
        title: "دستیار آریانا",
        subtitle: "پاسخ سریع به سوالات شما",
        placeholder: "سوال خود را بنویسید...",
        greeting: "سلام! من دستیار هوشمند آریانا هستم. می‌توانم درباره محصولات، مبدا، لجستیک یا درخواست پیش‌فاکتور به شما کمک کنم.",
        send: "ارسال",
        suggestions: [
          "درباره زعفران شما بگویید",
          "شرایط ارسال و حمل چیست؟",
          "چگونه می‌توانم درخواست نمونه بدهم؟",
          "محصولات شما از کجا تامین می‌شوند؟",
        ],
        openLabel: "باز کردن چت",
        closeLabel: "بستن چت",
        thinking: "در حال نوشتن...",
        poweredBy: "هوش مصنوعی · پاسخ ۱۲ ساعته توسط تیم فروش",
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
        thinking: "Thinking...",
        poweredBy: "AI assistant · sales team replies within 12h",
      }

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onFinish: () => {
      if (!open) setUnread(true)
    },
  })

  useEffect(() => {
    if (open) setUnread(false)
  }, [open])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, status])

  const handleSend = (text: string) => {
    const value = text.trim()
    if (!value || status === "streaming" || status === "submitted") return
    sendMessage({ text: value }, { body: { currentSection } })
    setInput("")
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  const isBusy = status === "streaming" || status === "submitted"

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
                const text = getMessageText(m)
                if (!text && m.role === "assistant") return null
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
                      {isUser ? <span className="whitespace-pre-wrap">{text}</span> : <RenderedMessage text={text} />}
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
