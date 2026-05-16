"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"

export function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-parchment/90 backdrop-blur-md border-b border-saffron/10 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5" aria-label="Ariana Global Trade Home">
          <span className="font-serif text-xl font-medium tracking-tighter text-ink">
            {t('nav.brandFirst')}
          </span>
          <span className="w-px h-4 bg-saffron/40" aria-hidden="true" />
          <span className="font-serif text-xl font-medium text-saffron tracking-tighter">{t('nav.brandSecond')}</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-9" role="navigation">
            <li>
              <a href="#products" className="relative text-[13px] font-medium tracking-[0.1em] uppercase text-ink/80 hover:text-saffron transition-colors duration-200 group">
                {t('nav.products')}
                <motion.span className="absolute -bottom-0.5 left-0 h-px bg-saffron" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} style={{ originX: 0, width: "100%" }} />
              </a>
            </li>
            <li>
              <a href="#origin" className="relative text-[13px] font-medium tracking-[0.1em] uppercase text-ink/80 hover:text-saffron transition-colors duration-200 group">
                {t('nav.origin')}
                <motion.span className="absolute -bottom-0.5 left-0 h-px bg-saffron" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} style={{ originX: 0, width: "100%" }} />
              </a>
            </li>
            <li>
              <a href="#logistics" className="relative text-[13px] font-medium tracking-[0.1em] uppercase text-ink/80 hover:text-saffron transition-colors duration-200 group">
                {t('nav.logistics')}
                <motion.span className="absolute -bottom-0.5 left-0 h-px bg-saffron" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} style={{ originX: 0, width: "100%" }} />
              </a>
            </li>
            <li>
              <a href="#inquire" className="relative text-[13px] font-medium tracking-[0.1em] uppercase text-ink/80 hover:text-saffron transition-colors duration-200 group">
                {t('nav.quote')}
                <motion.span className="absolute -bottom-0.5 left-0 h-px bg-saffron" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} style={{ originX: 0, width: "100%" }} />
              </a>
            </li>
            <li>
              <a href="#about" className="relative text-[13px] font-medium tracking-[0.1em] uppercase text-ink/80 hover:text-saffron transition-colors duration-200 group">
                {t('nav.about')}
                <motion.span className="absolute -bottom-0.5 left-0 h-px bg-saffron" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} style={{ originX: 0, width: "100%" }} />
              </a>
            </li>
        </ul>

        {/* Language Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <button 
            className={`text-[13px] font-medium tracking-widest hover:text-saffron transition-colors ${lang === 'en' ? 'text-saffron' : 'text-ink'}`}
            onClick={() => setLang('en')}
          >
            EN
          </button>
          <span className="text-muted-text/40 text-xs">|</span>
          <button 
            className={`text-[13px] font-medium tracking-widest hover:text-saffron transition-colors ${lang === 'fa' ? 'text-saffron' : 'text-muted-text'}`}
            onClick={() => setLang('fa')}
          >
            فا
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 -mr-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className={cn("w-6 h-6 transition-colors", scrolled ? "text-ink" : "text-parchment")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-parchment/95 backdrop-blur-md border-t border-border"
          >
          <ul className="px-5 py-5 space-y-1">
              <li><a href="#products" className="block py-3 text-[15px] font-medium transition-colors border-b border-border/50 text-ink hover:text-saffron" onClick={() => setMobileMenuOpen(false)}>{t('nav.products')}</a></li>
              <li><a href="#origin" className="block py-3 text-[15px] font-medium transition-colors border-b border-border/50 text-ink hover:text-saffron" onClick={() => setMobileMenuOpen(false)}>{t('nav.origin')}</a></li>
              <li><a href="#logistics" className="block py-3 text-[15px] font-medium transition-colors border-b border-border/50 text-ink hover:text-saffron" onClick={() => setMobileMenuOpen(false)}>{t('nav.logistics')}</a></li>
              <li><a href="#inquire" className="block py-3 text-[15px] font-medium transition-colors border-b border-border/50 text-saffron" onClick={() => setMobileMenuOpen(false)}>{t('nav.quote')}</a></li>
              <li><a href="#about" className="block py-3 text-[15px] font-medium transition-colors text-ink hover:text-saffron" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</a></li>
              
              <li className="flex items-center gap-3 pt-4">
                <button className={`text-sm font-medium ${lang === 'en' ? 'text-saffron' : 'text-ink'}`} onClick={() => setLang('en')}>EN</button>
                <span className="text-muted-text/50">|</span>
                <button className={`text-sm font-medium ${lang === 'fa' ? 'text-saffron' : 'text-muted-text'}`} onClick={() => setLang('fa')}>فا</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
