"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const words = ["Certified", "Iranian", "exports,", "direct", "from", "the", "source."]

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-ink pt-20 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/95" />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-24 lg:py-36 text-center">
        {/* Headline with word-by-word reveal */}
        <h1
          id="hero-heading"
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-parchment leading-[1.1] tracking-tight"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block mr-[0.22em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 sm:mt-10 text-base sm:text-xl md:text-2xl text-parchment/80 max-w-xl mx-auto leading-[1.8] font-light tracking-wide"
        >
          Supplying international importers with Iran’s premium agricultural
          commodities — saffron, pistachios, dried fruits, and specialty goods.
          Certified, documented, and export-ready.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-saffron text-ink hover:bg-saffron/90 font-medium px-10 h-12 text-[15px] w-full shadow-lg shadow-saffron/20 tracking-wide"
            >
              Request a Quote
            </Button>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="border-parchment/30 text-parchment bg-transparent hover:bg-parchment/10 font-medium px-10 h-12 text-[15px] w-full tracking-wide"
            >
              View Export Catalogue
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative rule + Trust Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-20 flex flex-col items-center gap-5"
        >
          <motion.div
            className="w-12 h-px bg-saffron/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0.5 }}
          />
          <p className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.28em] uppercase text-parchment/80 font-medium px-4 text-center leading-[2]">
            ISO 22000 &nbsp;·&nbsp; GlobalG.A.P. Compliant &nbsp;·&nbsp; 14 Active Markets &nbsp;·&nbsp; Est. 1998
          </p>
        </motion.div>
      </div>

      {/* Breathing ambient glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-saffron blur-[120px] pointer-events-none"
        style={{ opacity: 0.04 }}
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />


    </section>
  )
}
