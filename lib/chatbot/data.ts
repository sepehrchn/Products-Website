/**
 * Lightweight chatbot knowledge base.
 *
 * This file is the single source of truth for the local-first chatbot.
 * Editable without touching any chatbot logic — just add/remove entries.
 *
 * Bilingual: every entry can have `en` and `fa` variants.
 * The engine picks the right variant based on the user's active language.
 */

export type Lang = "en" | "fa"

export interface LocalizedString {
  en: string
  fa: string
}

export interface FaqEntry {
  id: string
  category: "company" | "products" | "pricing" | "shipping" | "samples" | "contact" | "certifications"
  /** Keywords used for matching. Lowercase, no punctuation. Both languages. */
  keywords: string[]
  question: LocalizedString
  answer: LocalizedString
  /** Optional CTA anchor on the current page (e.g. "#inquire") */
  cta?: {
    href: string
    label: LocalizedString
  }
}

export interface ServiceEntry {
  id: string
  /** Section anchor on the homepage where this is shown */
  anchor: string
  name: LocalizedString
  origin: LocalizedString
  description: LocalizedString
  tags: string[]
}

export interface NavEntry {
  id: string
  /** In-page anchor href, e.g. "#products" */
  href: string
  name: LocalizedString
  purpose: LocalizedString
  keywords: string[]
}

// -----------------------------------------------------------------------------
// FAQ
// -----------------------------------------------------------------------------

export const FAQS: FaqEntry[] = [
  {
    id: "company-about",
    category: "company",
    keywords: [
      "who",
      "about",
      "company",
      "ariana",
      "history",
      "established",
      "founded",
      "year",
      "background",
      "شرکت",
      "درباره",
      "تاسیس",
      "آریانا",
      "سابقه",
    ],
    question: {
      en: "Who is Ariana Global Trade?",
      fa: "آریانا گلوبال ترید کیست؟",
    },
    answer: {
      en: "Ariana Global Trade is an ISO 22000-certified Iranian import/export company established in 1998. We supply premium Iranian agricultural commodities — saffron, spices, dried fruits, and herbal drinks — to wholesale buyers in 14 markets worldwide, with offices in Tehran and Dubai.",
      fa: "آریانا گلوبال ترید یک شرکت صادرات و واردات ایرانی دارای گواهینامه ISO 22000 است که در سال ۱۹۹۸ تاسیس شده. ما زعفران، ادویه، میوه خشک و نوشیدنی‌های گیاهی ایرانی را به خریداران عمده در ۱۴ بازار جهانی عرضه می‌کنیم و دفاتر ما در تهران و دبی مستقر است.",
    },
    cta: { href: "#about", label: { en: "About the company", fa: "درباره شرکت" } },
  },
  {
    id: "company-scale",
    category: "company",
    keywords: [
      "scale",
      "partners",
      "tons",
      "exported",
      "markets",
      "size",
      "volume",
      "experience",
      "حجم",
      "صادرات",
      "بازار",
      "شرکای",
    ],
    question: {
      en: "How big is your export operation?",
      fa: "حجم صادرات شما چقدر است؟",
    },
    answer: {
      en: "We work with 500+ global partners, have exported 12,000+ tons of agricultural goods, and are currently active in 14 export markets including the UAE, Germany, Russia, China, Turkey, and India.",
      fa: "ما با بیش از ۵۰۰ شریک جهانی همکاری داریم، بیش از ۱۲٬۰۰۰ تن کالای کشاورزی صادر کرده‌ایم و در حال حاضر در ۱۴ بازار صادراتی شامل امارات، آلمان، روسیه، چین، ترکیه و هند فعال هستیم.",
    },
  },
  {
    id: "certifications",
    category: "certifications",
    keywords: [
      "certification",
      "certified",
      "certificate",
      "iso",
      "globalgap",
      "global gap",
      "quality",
      "standard",
      "گواهینامه",
      "استاندارد",
      "ایزو",
      "کیفیت",
    ],
    question: {
      en: "What certifications do you hold?",
      fa: "چه گواهینامه‌هایی دارید؟",
    },
    answer: {
      en: "We are ISO 22000 certified and GlobalG.A.P. compliant. Every shipment is accompanied by a phytosanitary certificate, certificate of origin, and lab test reports covering moisture, brix, and contamination screens.",
      fa: "ما دارای گواهینامه ISO 22000 و منطبق با GlobalG.A.P. هستیم. هر محموله با گواهی بهداشت گیاهی، گواهی مبدا و گزارش‌های آزمایشگاهی شامل رطوبت، بریکس و آزمون‌های آلودگی همراه است.",
    },
  },
  {
    id: "products-overview",
    category: "products",
    keywords: [
      "products",
      "what do you sell",
      "catalog",
      "catalogue",
      "offerings",
      "commodities",
      "محصولات",
      "کاتالوگ",
      "چه می‌فروشید",
    ],
    question: {
      en: "What products do you offer?",
      fa: "چه محصولاتی ارائه می‌دهید؟",
    },
    answer: {
      en: "Our core catalogue covers four categories: Saffron (Khorasan), Premium Iranian Spices (Kerman), Dried Fruits (Fars — Mazafati and Medjool dates, sun-dried figs, apricots), and Traditional Herbal Drinks (Isfahan).",
      fa: "کاتالوگ اصلی ما شامل چهار دسته است: زعفران (خراسان)، ادویه‌جات ممتاز ایرانی (کرمان)، میوه‌های خشک (فارس — خرما مضافتی و مجول، انجیر و زردآلوی آفتاب‌خشک) و نوشیدنی‌های گیاهی سنتی (اصفهان).",
    },
    cta: { href: "#products", label: { en: "View products", fa: "مشاهده محصولات" } },
  },
  {
    id: "saffron",
    category: "products",
    keywords: ["saffron", "sargol", "khorasan", "grade", "iso 3632", "زعفران", "سرگل", "خراسان"],
    question: {
      en: "Tell me about your saffron",
      fa: "درباره زعفران شما بگویید",
    },
    answer: {
      en: "Our saffron is hand-harvested from high-altitude Khorasan fields. We offer Grade 1 and Sargol cuts, compliant with ISO 3632, in retail packs from 1g to 500g and kilogram-level bulk for export.",
      fa: "زعفران ما از مزارع مرتفع خراسان به‌صورت دست‌چین برداشت می‌شود. ما درجه ۱ و سرگل را مطابق ISO 3632 در بسته‌های خرده ۱ گرم تا ۵۰۰ گرم و بسته‌های صادراتی کیلویی عرضه می‌کنیم.",
    },
    cta: { href: "#products", label: { en: "See product details", fa: "مشاهده جزئیات محصول" } },
  },
  {
    id: "dates",
    category: "products",
    keywords: [
      "date",
      "dates",
      "mazafati",
      "medjool",
      "fig",
      "apricot",
      "dried fruit",
      "خرما",
      "مضافتی",
      "مجول",
      "انجیر",
      "زردآلو",
      "میوه خشک",
    ],
    question: {
      en: "What dried fruits do you export?",
      fa: "چه میوه‌های خشکی صادر می‌کنید؟",
    },
    answer: {
      en: "We export Mazafati and Medjool dates, sun-dried figs, and dried apricots from Fars province. Available in consumer retail cartons or bulk palletised volumes, with brix and moisture specs on request.",
      fa: "ما خرمای مضافتی و مجول، انجیر و زردآلوی آفتاب‌خشک از استان فارس صادر می‌کنیم. محصولات در کارتن‌های خرده‌فروشی یا پالت‌های عمده ارائه می‌شوند و مشخصات بریکس و رطوبت در صورت درخواست ارائه می‌گردد.",
    },
    cta: { href: "#products", label: { en: "View products", fa: "مشاهده محصولات" } },
  },
  {
    id: "shipping-incoterms",
    category: "shipping",
    keywords: [
      "shipping",
      "freight",
      "incoterm",
      "fob",
      "cif",
      "ddp",
      "delivery",
      "logistics",
      "customs",
      "ship",
      "ارسال",
      "حمل",
      "گمرک",
      "اینکوترمز",
    ],
    question: {
      en: "What are your shipping terms?",
      fa: "شرایط ارسال شما چیست؟",
    },
    answer: {
      en: "We ship FOB, CIF, and DDP. Our four-step process covers sourcing & QC, export-grade packaging, customs documentation (phytosanitary + certificate of origin), and global freight via sea or air.",
      fa: "ما با شرایط FOB، CIF و DDP حمل می‌کنیم. فرآیند چهار مرحله‌ای ما شامل تامین و کنترل کیفیت، بسته‌بندی استاندارد صادراتی، مستندات گمرکی (بهداشت گیاهی + مبدا) و حمل بین‌المللی دریایی یا هوایی است.",
    },
    cta: { href: "#logistics", label: { en: "See logistics process", fa: "مشاهده فرآیند لجستیک" } },
  },
  {
    id: "sourcing",
    category: "products",
    keywords: [
      "source",
      "sourcing",
      "origin",
      "farm",
      "farmer",
      "traceability",
      "authentic",
      "where from",
      "مبدا",
      "تامین",
      "کشاورز",
      "اصالت",
    ],
    question: {
      en: "Where do you source your products?",
      fa: "محصولات شما از کجا تامین می‌شوند؟",
    },
    answer: {
      en: "Directly from multi-generational farmers in Khorasan (saffron), Kerman (spices), Fars (dried fruits), and Isfahan (herbal drinks). Every harvest is lab-tested for moisture, brix, and phytosanitary compliance. No intermediaries — full traceability and competitive FOB pricing.",
      fa: "مستقیماً از کشاورزان چندنسلی در خراسان (زعفران)، کرمان (ادویه)، فارس (میوه خشک) و اصفهان (نوشیدنی‌های گیاهی). هر برداشت از نظر رطوبت، بریکس و انطباق بهداشت گیاهی آزمایش می‌شود. بدون واسطه — قابلیت ردیابی کامل و قیمت رقابتی FOB.",
    },
    cta: { href: "#origin", label: { en: "Sourcing & traceability", fa: "مبدا و ردیابی" } },
  },
  {
    id: "pricing",
    category: "pricing",
    keywords: [
      "price",
      "pricing",
      "cost",
      "quote",
      "quotation",
      "rate",
      "how much",
      "moq",
      "minimum",
      "قیمت",
      "نرخ",
      "پیش فاکتور",
      "حداقل سفارش",
    ],
    question: {
      en: "What are your prices and MOQ?",
      fa: "قیمت‌ها و حداقل سفارش شما چقدر است؟",
    },
    answer: {
      en: "Pricing depends on product, grade, packaging, volume, and incoterm. MOQs vary by SKU. The fastest way to get an accurate quote is to submit the inquiry form — our sales team replies within 12 hours.",
      fa: "قیمت بسته به محصول، درجه، بسته‌بندی، حجم و اینکوترمز متفاوت است. حداقل سفارش بر اساس کالا فرق می‌کند. سریع‌ترین راه برای دریافت پیش‌فاکتور، تکمیل فرم درخواست است — تیم فروش ما ظرف ۱۲ ساعت پاسخ می‌دهد.",
    },
    cta: { href: "#inquire", label: { en: "Request a quote", fa: "درخواست پیش‌فاکتور" } },
  },
  {
    id: "samples",
    category: "samples",
    keywords: ["sample", "samples", "trial", "test order", "نمونه", "تست", "سفارش آزمایشی"],
    question: {
      en: "Can I request samples?",
      fa: "می‌توانم نمونه درخواست کنم؟",
    },
    answer: {
      en: "Yes. Samples are available for qualified wholesale buyers. Submit the inquiry form with your company details, target product, and destination country, and our team will arrange sample dispatch and freight terms.",
      fa: "بله. نمونه برای خریداران عمده واجد شرایط ارائه می‌شود. لطفاً فرم درخواست را با مشخصات شرکت، محصول مورد نظر و کشور مقصد تکمیل کنید تا تیم ما ارسال نمونه و شرایط حمل را هماهنگ کند.",
    },
    cta: { href: "#inquire", label: { en: "Request samples", fa: "درخواست نمونه" } },
  },
  {
    id: "contact",
    category: "contact",
    keywords: ["contact", "email", "phone", "reach", "talk", "sales", "تماس", "ایمیل", "فروش"],
    question: {
      en: "How do I contact your sales team?",
      fa: "چگونه با تیم فروش تماس بگیرم؟",
    },
    answer: {
      en: "Email export@arianaglobal.com or use the inquiry form on this page. We have offices in Tehran (HQ) and Dubai, and respond to all inquiries within 12 hours.",
      fa: "ایمیل export@arianaglobal.com یا فرم درخواست همین صفحه. دفاتر ما در تهران (دفتر مرکزی) و دبی مستقر هستند و به همه درخواست‌ها ظرف ۱۲ ساعت پاسخ می‌دهیم.",
    },
    cta: { href: "#inquire", label: { en: "Open inquiry form", fa: "باز کردن فرم درخواست" } },
  },
  {
    id: "response-time",
    category: "contact",
    keywords: ["response", "reply", "how long", "wait", "time", "زمان پاسخ", "چقدر طول", "منتظر"],
    question: {
      en: "How quickly do you respond to inquiries?",
      fa: "چقدر سریع به درخواست‌ها پاسخ می‌دهید؟",
    },
    answer: {
      en: "Our sales team replies to all inquiries within 12 hours, Sunday to Thursday (Iran working week).",
      fa: "تیم فروش ما ظرف ۱۲ ساعت به همه درخواست‌ها، یکشنبه تا پنجشنبه (هفته کاری ایران)، پاسخ می‌دهد.",
    },
  },
]

// -----------------------------------------------------------------------------
// Services / Products
// -----------------------------------------------------------------------------

export const SERVICES: ServiceEntry[] = [
  {
    id: "saffron",
    anchor: "#products",
    name: { en: "Saffron", fa: "زعفران" },
    origin: { en: "Khorasan", fa: "خراسان" },
    description: {
      en: "Hand-harvested Grade 1 and Sargol saffron from high-altitude Khorasan fields, compliant with ISO 3632. Retail packs 1g–500g and kilogram bulk.",
      fa: "زعفران درجه ۱ و سرگل دست‌چین از مزارع مرتفع خراسان، منطبق با ISO 3632. بسته‌های ۱ گرم تا ۵۰۰ گرم و عمده کیلویی.",
    },
    tags: ["saffron", "sargol", "spice", "khorasan", "iso 3632", "زعفران", "سرگل"],
  },
  {
    id: "spices",
    anchor: "#products",
    name: { en: "Premium Iranian Spices", fa: "ادویه‌جات ممتاز ایرانی" },
    origin: { en: "Kerman", fa: "کرمان" },
    description: {
      en: "Export-grade spices with rich aroma and vibrant color, suited for wholesale distribution and food manufacturing.",
      fa: "ادویه‌جات استاندارد صادراتی با عطر غنی و رنگ زنده، مناسب توزیع عمده و صنایع غذایی.",
    },
    tags: ["spice", "spices", "kerman", "ادویه", "کرمان"],
  },
  {
    id: "dried-fruits",
    anchor: "#products",
    name: { en: "Dried Fruits", fa: "میوه‌های خشک" },
    origin: { en: "Fars", fa: "فارس" },
    description: {
      en: "Mazafati and Medjool dates, sun-dried figs, dried apricots. Retail cartons or bulk pallets; brix and moisture specs on request.",
      fa: "خرمای مضافتی و مجول، انجیر و زردآلوی آفتاب‌خشک. کارتن خرده یا پالت عمده؛ مشخصات بریکس و رطوبت در صورت درخواست.",
    },
    tags: ["dates", "fig", "apricot", "fars", "خرما", "انجیر", "زردآلو", "فارس", "مضافتی", "مجول"],
  },
  {
    id: "herbal-drinks",
    anchor: "#products",
    name: { en: "Traditional Herbal Drinks", fa: "نوشیدنی‌های گیاهی سنتی" },
    origin: { en: "Isfahan", fa: "اصفهان" },
    description: {
      en: "Authentic Iranian herbal beverages from natural botanicals, premium packaging, consistent international-market quality.",
      fa: "نوشیدنی‌های گیاهی اصیل ایرانی از گیاهان طبیعی، بسته‌بندی ممتاز و کیفیت پایدار برای بازارهای بین‌المللی.",
    },
    tags: ["herbal", "drink", "beverage", "isfahan", "نوشیدنی", "گیاهی", "اصفهان"],
  },
]

// -----------------------------------------------------------------------------
// Navigation map
// -----------------------------------------------------------------------------

export const NAVIGATION: NavEntry[] = [
  {
    id: "hero",
    href: "#hero",
    name: { en: "Home", fa: "خانه" },
    purpose: { en: "Top of the page and overview hero.", fa: "بالای صفحه و معرفی کلی." },
    keywords: ["home", "top", "start", "خانه", "بالا"],
  },
  {
    id: "products",
    href: "#products",
    name: { en: "Products", fa: "محصولات" },
    purpose: { en: "Browse the product catalogue.", fa: "مرور کاتالوگ محصولات." },
    keywords: ["product", "catalog", "catalogue", "items", "محصول", "کالا", "کاتالوگ"],
  },
  {
    id: "origin",
    href: "#origin",
    name: { en: "Origin & Sourcing", fa: "مبدا و تامین" },
    purpose: { en: "Where products come from and how traceability works.", fa: "مبدا محصولات و نحوه ردیابی." },
    keywords: ["origin", "source", "sourcing", "farmer", "trace", "مبدا", "تامین", "کشاورز"],
  },
  {
    id: "logistics",
    href: "#logistics",
    name: { en: "Logistics", fa: "لجستیک" },
    purpose: { en: "Shipping, packaging, customs, and freight terms.", fa: "حمل، بسته‌بندی، گمرک و شرایط ارسال." },
    keywords: ["logistics", "shipping", "freight", "customs", "incoterm", "لجستیک", "حمل", "ارسال", "گمرک"],
  },
  {
    id: "inquire",
    href: "#inquire",
    name: { en: "Request a Quote", fa: "درخواست پیش‌فاکتور" },
    purpose: { en: "Submit an inquiry to sales for pricing or samples.", fa: "ارسال درخواست به تیم فروش برای قیمت یا نمونه." },
    keywords: ["quote", "inquiry", "contact", "buy", "purchase", "sample", "moq", "price", "قیمت", "تماس", "نمونه", "خرید", "پیش فاکتور"],
  },
  {
    id: "about",
    href: "#about",
    name: { en: "About", fa: "درباره ما" },
    purpose: { en: "Company background, certifications, and offices.", fa: "سابقه شرکت، گواهینامه‌ها و دفاتر." },
    keywords: ["about", "company", "history", "office", "certification", "درباره", "شرکت", "تاریخچه", "دفتر"],
  },
]

// -----------------------------------------------------------------------------
// Unified search index (merged)
// -----------------------------------------------------------------------------

export interface IndexEntry {
  type: "faq" | "service" | "nav"
  id: string
  keywords: string[]
  /** Full searchable text in both languages */
  text: { en: string; fa: string }
  ref: FaqEntry | ServiceEntry | NavEntry
}

export const INDEX: IndexEntry[] = [
  ...FAQS.map<IndexEntry>((f) => ({
    type: "faq",
    id: f.id,
    keywords: f.keywords,
    text: {
      en: `${f.question.en} ${f.answer.en}`,
      fa: `${f.question.fa} ${f.answer.fa}`,
    },
    ref: f,
  })),
  ...SERVICES.map<IndexEntry>((s) => ({
    type: "service",
    id: s.id,
    keywords: s.tags,
    text: {
      en: `${s.name.en} ${s.origin.en} ${s.description.en}`,
      fa: `${s.name.fa} ${s.origin.fa} ${s.description.fa}`,
    },
    ref: s,
  })),
  ...NAVIGATION.map<IndexEntry>((n) => ({
    type: "nav",
    id: n.id,
    keywords: n.keywords,
    text: {
      en: `${n.name.en} ${n.purpose.en}`,
      fa: `${n.name.fa} ${n.purpose.fa}`,
    },
    ref: n,
  })),
]
