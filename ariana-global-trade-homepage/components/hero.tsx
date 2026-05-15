"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const words = ["From", "Iran's", "fields", "to", "the", "world's", "tables."]

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-ink pt-20"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        {/* Headline with word-by-word reveal */}
        <h1
          id="hero-heading"
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-parchment leading-tight"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              className="inline-block mr-3 md:mr-4"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 text-lg md:text-xl text-parchment/80 max-w-2xl mx-auto leading-relaxed"
        >
          Premium saffron, dried fruits, pistachios and specialty goods — sourced
          directly, certified rigorously, shipped reliably.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-saffron text-ink hover:bg-saffron/90 font-medium px-8"
          >
            Request a Quote
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-parchment/40 text-parchment bg-transparent hover:bg-parchment/10 font-medium px-8"
          >
            View Products
          </Button>
        </motion.div>

        {/* Trust Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-12 text-xs tracking-[0.2em] uppercase text-parchment/60"
        >
          ISO 22000 · EU Certified · 14 Countries · Est. 1998
        </motion.p>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-ink/0 to-ink/50 pointer-events-none" />
    </section>
  )
}
