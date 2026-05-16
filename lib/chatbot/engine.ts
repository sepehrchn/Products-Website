/**
 * Chatbot engine — local-first intent detection and knowledge-base search.
 *
 * Pipeline:
 *   1. Normalize input
 *   2. Detect intent (faq | service | navigation | general)
 *   3. Score every index entry against the query (keyword + token overlap)
 *   4. Return best match with confidence + suggested CTA + nav links
 *
 * Pure, isomorphic — runs on client or server with no dependencies.
 */

import {
  FAQS,
  INDEX,
  NAVIGATION,
  SERVICES,
  type FaqEntry,
  type IndexEntry,
  type Lang,
  type NavEntry,
  type ServiceEntry,
} from "./data"

export type Intent = "faq" | "service" | "navigation" | "general"

export interface ChatLink {
  href: string
  label: string
}

export interface EngineResult {
  /** Local match found with high enough confidence to skip the AI fallback. */
  source: "local" | "fallback"
  intent: Intent
  /** 0..1 confidence score for the top match. */
  confidence: number
  /** Plain text answer in the user's language. Empty when source === "fallback". */
  text: string
  /** Optional in-page anchor link suggestions. */
  links: ChatLink[]
  /** Matched entries (top 3) used for grounding the AI fallback. */
  matches: IndexEntry[]
}

// -----------------------------------------------------------------------------
// Tokenization
// -----------------------------------------------------------------------------

const FA_DIACRITICS = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g
const NON_WORD = /[^\p{L}\p{N}\s]/gu

const STOPWORDS_EN = new Set([
  "the","a","an","of","is","are","do","does","you","your","i","me","my","we","our","to","for","and","or","with","in","on","at","by","from","about","what","whats","how","much","many","please","tell","can","could","would","should","have","has","does","need","want","give","show",
])
const STOPWORDS_FA = new Set([
  "و","در","به","از","که","را","با","این","آن","یا","تا","هم","هست","است","می","شما","ما","من","او","آیا","چه","چی","چقدر","کجا","کی","چطور","چگونه","لطفا","بگو","بگویید","بدهید","می‌توانم","میتوانم","دارید","دارد",
])

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(FA_DIACRITICS, "")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/‌/g, " ") // ZWNJ -> space
    .replace(NON_WORD, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function tokenize(input: string): string[] {
  const norm = normalize(input)
  if (!norm) return []
  return norm
    .split(" ")
    .filter((t) => t.length > 1 && !STOPWORDS_EN.has(t) && !STOPWORDS_FA.has(t))
}

// -----------------------------------------------------------------------------
// Intent detection
// -----------------------------------------------------------------------------

const INTENT_PATTERNS: Array<{ intent: Intent; patterns: RegExp[] }> = [
  {
    intent: "navigation",
    patterns: [
      /\b(go to|take me|navigate|open|show me the|where is|where can i find|jump to)\b/i,
      /(برو|ببر|باز کن|نشان|کجاست|کجا است|به بخش)/,
    ],
  },
  {
    intent: "service",
    patterns: [
      /\b(saffron|date|dates|fig|apricot|spice|spices|herbal|drink|mazafati|medjool|sargol)\b/i,
      /(زعفران|خرما|مضافتی|مجول|انجیر|زردآلو|ادویه|نوشیدنی|گیاهی|سرگل)/,
    ],
  },
  {
    intent: "faq",
    patterns: [
      /\b(price|cost|moq|quote|sample|shipping|freight|incoterm|fob|cif|ddp|certification|iso|contact|email|about|company|origin|source)\b/i,
      /(قیمت|پیش\s?فاکتور|نمونه|ارسال|حمل|گمرک|گواهینامه|ایزو|تماس|ایمیل|درباره|شرکت|مبدا|تامین|حداقل\s?سفارش)/,
    ],
  },
]

export function detectIntent(query: string): Intent {
  for (const { intent, patterns } of INTENT_PATTERNS) {
    if (patterns.some((p) => p.test(query))) return intent
  }
  return "general"
}

// -----------------------------------------------------------------------------
// Scoring
// -----------------------------------------------------------------------------

interface Scored {
  entry: IndexEntry
  score: number
}

function scoreEntry(entry: IndexEntry, tokens: string[], normQuery: string, lang: Lang): number {
  if (tokens.length === 0) return 0
  let score = 0

  // Strong keyword match: each keyword present in query
  const kwSet = new Set(entry.keywords.map(normalize))
  for (const kw of kwSet) {
    if (!kw) continue
    if (normQuery.includes(kw)) {
      // Multi-word keyword phrase hit is very strong
      score += kw.includes(" ") ? 6 : 4
    }
  }

  // Token overlap with the entry's localized text
  const haystack = normalize(`${entry.text[lang]} ${entry.text[lang === "en" ? "fa" : "en"]}`)
  for (const tok of tokens) {
    if (haystack.includes(tok)) score += 1
  }

  // Slight boost for FAQ entries (most precise answers)
  if (entry.type === "faq") score += 0.5

  return score
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

export interface RunOptions {
  query: string
  lang: Lang
  currentSection?: string
}

/** Runs the engine end-to-end and returns either a local answer or a fallback signal. */
export function runEngine({ query, lang, currentSection }: RunOptions): EngineResult {
  const intent = detectIntent(query)
  const tokens = tokenize(query)
  const normQuery = normalize(query)

  if (tokens.length === 0) {
    return { source: "fallback", intent, confidence: 0, text: "", links: [], matches: [] }
  }

  const scored: Scored[] = INDEX.map((entry) => ({ entry, score: scoreEntry(entry, tokens, normQuery, lang) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  const top = scored[0]
  if (!top) {
    return { source: "fallback", intent, confidence: 0, text: "", links: [], matches: [] }
  }

  // Confidence heuristic: any keyword phrase hit (score >= 4) is high confidence.
  const HIGH_CONFIDENCE = 4
  const confidence = Math.min(1, top.score / 8)

  if (top.score < HIGH_CONFIDENCE) {
    return {
      source: "fallback",
      intent,
      confidence,
      text: "",
      links: [],
      matches: scored.slice(0, 3).map((s) => s.entry),
    }
  }

  // Build the local answer
  const { text, links } = buildLocalAnswer(top.entry, lang, currentSection)

  return {
    source: "local",
    intent,
    confidence,
    text,
    links,
    matches: scored.slice(0, 3).map((s) => s.entry),
  }
}

function buildLocalAnswer(
  entry: IndexEntry,
  lang: Lang,
  currentSection?: string,
): { text: string; links: ChatLink[] } {
  const links: ChatLink[] = []

  if (entry.type === "faq") {
    const f = entry.ref as FaqEntry
    if (f.cta && f.cta.href !== `#${currentSection}`) {
      links.push({ href: f.cta.href, label: f.cta.label[lang] })
    }
    return { text: f.answer[lang], links }
  }

  if (entry.type === "service") {
    const s = entry.ref as ServiceEntry
    const text =
      lang === "fa"
        ? `${s.name.fa} (مبدا: ${s.origin.fa}). ${s.description.fa}`
        : `${s.name.en} (Origin: ${s.origin.en}). ${s.description.en}`
    if (s.anchor !== `#${currentSection}`) {
      links.push({
        href: s.anchor,
        label: lang === "fa" ? "مشاهده در کاتالوگ" : "View in catalogue",
      })
    }
    // Always add an inquire shortcut for product questions
    links.push({
      href: "#inquire",
      label: lang === "fa" ? "درخواست پیش‌فاکتور" : "Request a quote",
    })
    return { text, links }
  }

  // nav
  const n = entry.ref as NavEntry
  const text =
    lang === "fa"
      ? `بخش «${n.name.fa}» — ${n.purpose.fa}`
      : `Heading to ${n.name.en} — ${n.purpose.en}`
  if (n.href !== `#${currentSection}`) {
    links.push({
      href: n.href,
      label: lang === "fa" ? `رفتن به ${n.name.fa}` : `Open ${n.name.en}`,
    })
  }
  return { text, links }
}

/** Builds a compact RAG-style grounding block for the AI fallback. */
export function buildGroundingContext(matches: IndexEntry[], lang: Lang): string {
  if (matches.length === 0) return ""
  const lines = matches.map((m, i) => {
    const ref = m.ref
    if (m.type === "faq") {
      const f = ref as FaqEntry
      return `(${i + 1}) Q: ${f.question[lang]}\n    A: ${f.answer[lang]}`
    }
    if (m.type === "service") {
      const s = ref as ServiceEntry
      return `(${i + 1}) Service "${s.name[lang]}" (origin ${s.origin[lang]}): ${s.description[lang]}`
    }
    const n = ref as NavEntry
    return `(${i + 1}) Section "${n.name[lang]}" at ${n.href}: ${n.purpose[lang]}`
  })
  return `Relevant knowledge-base entries:\n${lines.join("\n")}`
}

/** Suggests up to 3 nav links for a query when no clear FAQ match exists. */
export function suggestNavLinks(query: string, lang: Lang): ChatLink[] {
  const norm = normalize(query)
  const tokens = tokenize(query)
  if (tokens.length === 0) return []

  const scored = NAVIGATION.map((n) => {
    let s = 0
    for (const kw of n.keywords.map(normalize)) {
      if (kw && norm.includes(kw)) s += 2
    }
    for (const tok of tokens) {
      if (normalize(`${n.name[lang]} ${n.purpose[lang]}`).includes(tok)) s += 1
    }
    return { n, s }
  })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)

  return scored.map((x) => ({ href: x.n.href, label: x.n.name[lang] }))
}

export { FAQS, SERVICES, NAVIGATION }
