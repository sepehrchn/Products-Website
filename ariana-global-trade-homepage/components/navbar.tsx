"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Our Origin", href: "#origin" },
  { label: "Logistics", href: "#logistics" },
  { label: "Inquire", href: "#inquire" },
  { label: "About", href: "#about" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-parchment/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2" aria-label="Ariana Global Trade Home">
          <span className="font-serif text-xl font-semibold text-ink">
            Ariana
          </span>
          <span className="font-serif text-xl text-saffron">Global Trade</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8" role="navigation">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink hover:text-saffron transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language Toggle */}
        <div className="hidden md:flex items-center gap-2">
          <button className="text-sm font-medium text-ink hover:text-saffron transition-colors">
            EN
          </button>
          <span className="text-muted-text">|</span>
          <button className="text-sm font-medium text-muted-text hover:text-saffron transition-colors">
            فا
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className="w-6 h-6 text-ink"
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
            className="md:hidden bg-parchment/95 backdrop-blur-md border-t border-border"
          >
            <ul className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block text-sm font-medium text-ink hover:text-saffron transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2 pt-2 border-t border-border">
                <button className="text-sm font-medium text-ink">EN</button>
                <span className="text-muted-text">|</span>
                <button className="text-sm font-medium text-muted-text">فا</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
