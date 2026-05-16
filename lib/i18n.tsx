"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

const dict = {
  en: {
    nav: {
      products: "Products",
      origin: "Origin",
      logistics: "Logistics",
      quote: "Request a Quote",
      about: "About",
      brandFirst: "Ariana",
      brandSecond: "Global Trade"
    },
    hero: {
      words: ["Certified", "Iranian", "exports,", "direct", "from", "the", "source."],
      subtitle: "Supplying international importers with Iran’s premium agricultural commodities — saffron, pistachios, dried fruits, and specialty goods. Certified, documented, and export-ready.",
      quoteBtn: "Request a Quote",
      catalogueBtn: "View Export Catalogue",
      trust: "ISO 22000 · GlobalG.A.P. Compliant · 14 Active Markets · Est. 1998"
    },
    trustBar: {
      metrics: [
        { value: "500+", label: "Global Partners" },
        { value: "12k", label: "Tons Exported" },
        { value: "100%", label: "Traceable" },
        { value: "24/7", label: "Logistics Support" }
      ]
    },
    products: {
      tag: "Export Catalogue",
      heading: "Our core export lines",
      subheading: "All product lines are available in bulk and retail configurations, with full documentation for customs clearance in your market.",
      originPrefix: "Origin: ",
      originSuffix: ", Iran",
      viewSpecs: "View Specs",
      requestSamples: "Request Samples",
      items: [
        {
          name: "Saffron",
          description: "Grade 1 and Sargol cuts, hand-harvested from Khorasan's high-altitude fields. Available in 1g–500g retail packs and kilogram-level bulk export quantities. Compliant with ISO 3632.",
          origin: "Khorasan"
        },
        {
          name: "Premium Iranian Spices",
          description: "Carefully sourced Iranian spices known for rich aroma, vibrant color, and export-grade quality. Suitable for wholesale distribution, food manufacturing, and international culinary markets.",
          origin: "Kerman"
        },
        {
          name: "Dried Fruits",
          description: "Mazafati and Medjool dates, sun-dried figs, and dried apricots from Fars province. Available in consumer retail cartons and bulk palletised volumes. Brix and moisture specs on request.",
          origin: "Fars"
        },
        {
          name: "Traditional Herbal Drinks",
          description: "Authentic Iranian herbal beverages crafted from natural botanicals and regional ingredients. Prepared for international markets with premium packaging and consistent quality standards.",
          origin: "Isfahan"
        }
      ]
    },
    origin: {
      tag: "Khorasan · Kerman · Fars · Isfahan",
      heading: "Traceable from farm to freight.",
      p1: "We partner directly with multi-generational farmers across Iran’s most fertile provinces. Every harvest is rigorously tested for moisture, brix, and phytosanitary compliance before leaving the country.",
      p2: "By bypassing intermediaries, we guarantee competitive FOB pricing and uncompromised authenticity for your import business."
    },
    logistics: {
      tag: "Secure, transparent shipping.",
      heading: "From your inquiry to your port.",
      steps: [
        {
          title: "Sourcing & QC",
          description: "Direct procurement and laboratory testing."
        },
        {
          title: "Packaging",
          description: "Export-grade packaging and palletization."
        },
        {
          title: "Customs & Docs",
          description: "Phytosanitary and origin certification."
        },
        {
          title: "Global Freight",
          description: "FOB, CIF, and DDP shipping options."
        }
      ]
    },
    logos: {
      heading: "Trusted by importers across 14 countries",
      countries: ["UAE", "GERMANY", "RUSSIA", "CHINA", "TURKEY", "INDIA"]
    },
    inquiry: {
      heading: "Ready to source from Iran’s origin?",
      subtitle: "Our export team responds within 12 hours with detailed CIF/FOB quotes, technical specs, and sampling options.",
      btn: "Contact Sales Team"
    },
    footer: {
      description: "Direct-from-source agricultural commodities. Certified, tested, and exported worldwide with full compliance documentation.",
      col1Title: "Commodities",
      col1Links: ["Saffron", "Spices", "Dates & Fruits", "Herbal Drinks"],
      col2Title: "Company",
      col2Links: ["About Us", "Quality Control", "Sustainability", "Careers"],
      col3Title: "Contact",
      col3Links: ["Sales: export@arianaglobal.com", "Dubai Office", "Tehran HQ"],
      copyright: "Ariana Global Trade. All rights reserved."
    }
  },
  fa: {
    nav: {
      products: "محصولات",
      origin: "مبدا",
      logistics: "لجستیک",
      quote: "درخواست پیش‌فاکتور",
      about: "درباره ما",
      brandFirst: "آریانا",
      brandSecond: "تجارت جهانی"
    },
    hero: {
      words: ["صادرات", "تضمین‌شده", "ایران،", "مستقیم", "از", "منبع", "اصلی."],
      subtitle: "تامین‌کننده عمده واردکنندگان بین‌المللی با بهترین محصولات کشاورزی ایران — زعفران، پسته، خشکبار و محصولات ویژه. دارای گواهینامه‌های معتبر و آماده صادرات.",
      quoteBtn: "درخواست پیش‌فاکتور",
      catalogueBtn: "مشاهده کاتالوگ صادراتی",
      trust: "ایزو ۲۲۰۰۰ · منطبق با GlobalG.A.P. · ۱۴ بازار فعال · تاسیس ۱۳۷۷"
    },
    trustBar: {
      metrics: [
        { value: "+۵۰۰", label: "شریک جهانی" },
        { value: "۱۲ هزار", label: "تن صادرات" },
        { value: "۱۰۰٪", label: "قابل ردیابی" },
        { value: "۲۴/۷", label: "پشتیبانی لجستیک" }
      ]
    },
    products: {
      tag: "کاتالوگ صادراتی",
      heading: "خطوط اصلی صادرات ما",
      subheading: "تمامی محصولات در قالب عمده و خرده‌فروشی با مستندات کامل گمرکی برای بازار شما در دسترس هستند.",
      originPrefix: "مبدا: ",
      originSuffix: "، ایران",
      viewSpecs: "مشاهده مشخصات",
      requestSamples: "درخواست نمونه",
      items: [
        {
          name: "زعفران",
          description: "برش‌های سرگل و نگین درجه یک، برداشت دستی از مزارع مرتفع خراسان. موجود در بسته‌بندی‌های خرده‌فروشی ۱ تا ۵۰۰ گرم و مقادیر فله‌ای کیلویی جهت صادرات. مطابق با استاندارد ایزو ۳۶۳۲.",
          origin: "خراسان"
        },
        {
          name: "ادویه‌جات اعلای ایرانی",
          description: "ادویه‌جات ایرانی با دقت تامین شده، شناخته شده به دلیل عطر غنی، رنگ طبیعی و کیفیت صادراتی. مناسب برای توزیع عمده، صنایع غذایی و بازارهای بین‌المللی آشپزی.",
          origin: "کرمان"
        },
        {
          name: "خشکبار",
          description: "خرماهای مضافتی و مجول، انجیر خشک آفتابی و برگه‌های زردآلو از استان فارس. موجود در کارتن‌های خرده‌فروشی و حجم‌های عمده پالت‌بندی شده. ارائه مشخصات بریکس و رطوبت در صورت درخواست.",
          origin: "فارس"
        },
        {
          name: "نوشیدنی‌های سنتی گیاهی",
          description: "نوشیدنی‌های گیاهی اصیل ایرانی تهیه‌شده از گیاهان طبیعی و ترکیبات بومی. آماده شده برای بازارهای بین‌المللی با بسته‌بندی ویژه و استانداردهای کیفی یکپارچه.",
          origin: "اصفهان"
        }
      ]
    },
    origin: {
      tag: "خراسان · کرمان · فارس · اصفهان",
      heading: "قابل ردیابی از مزرعه تا مقصد.",
      p1: "ما مستقیماً با کشاورزان نسل‌های مختلف در حاصلخیزترین استان‌های ایران همکاری می‌کنیم. هر محصول پیش از خروج از کشور از نظر رطوبت، بریکس و انطباق با مقررات بهداشت گیاهی به شدت آزمایش می‌شود.",
      p2: "با حذف واسطه‌ها، ما قیمت‌گذاری رقابتی FOB و اصالت بی‌قید و شرط را برای کسب‌وکار وارداتی شما تضمین می‌کنیم."
    },
    logistics: {
      tag: "حمل و نقل ایمن و شفاف.",
      heading: "از ثبت درخواست تا تحویل در بندر.",
      steps: [
        {
          title: "تامین و کنترل کیفیت",
          description: "خرید مستقیم و آزمایشگاهی."
        },
        {
          title: "بسته‌بندی",
          description: "بسته‌بندی صادراتی و پالت‌بندی."
        },
        {
          title: "گمرک و اسناد",
          description: "گواهی بهداشت و مبدا."
        },
        {
          title: "حمل بین‌المللی",
          description: "گزینه‌های ارسال FOB، CIF و DDP."
        }
      ]
    },
    logos: {
      heading: "مورد اعتماد واردکنندگان در ۱۴ کشور",
      countries: ["امارات", "آلمان", "روسیه", "چین", "ترکیه", "هند"]
    },
    inquiry: {
      heading: "آماده تامین از مبدا ایران هستید؟",
      subtitle: "تیم صادرات ما در کمتر از ۱۲ ساعت با پیش‌فاکتورهای دقیق CIF/FOB، مشخصات فنی و گزینه‌های دریافت نمونه پاسخگو خواهد بود.",
      btn: "تماس با تیم فروش"
    },
    footer: {
      description: "محصولات کشاورزی مستقیم از مبدا. دارای گواهینامه، تست شده و صادر شده به سراسر جهان با اسناد کامل.",
      col1Title: "محصولات",
      col1Links: ["زعفران", "ادویه‌جات", "خرما و خشکبار", "نوشیدنی‌های گیاهی"],
      col2Title: "شرکت",
      col2Links: ["درباره ما", "کنترل کیفیت", "توسعه پایدار", "فرصت‌های شغلی"],
      col3Title: "ارتباط با ما",
      col3Links: ["فروش: export@arianaglobal.com", "دفتر دبی", "دفتر مرکزی تهران"],
      copyright: "تجارت جهانی آریانا. تمامی حقوق محفوظ است."
    }
  }
}

type Language = "en" | "fa"

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => any
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: () => "",
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved === "en" || saved === "fa") {
      setLang(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", lang)
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr"
    document.documentElement.lang = lang
  }, [lang])

  const t = (key: string) => {
    const keys = key.split(".")
    let val: any = dict[lang]
    for (const k of keys) {
      if (val[k] === undefined) return key
      val = val[k]
    }
    return val
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
