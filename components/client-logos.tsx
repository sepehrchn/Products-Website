"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const countries = [
  "Germany",
  "UAE",
  "Spain",
  "Canada",
  "Japan",
  "Australia",
]

export function ClientLogos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="bg-parchment py-16 sm:py-20 border-t border-border overflow-hidden"
      aria-label="Trusted by importers worldwide"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-[11px] tracking-[0.2em] uppercase text-muted-text mb-10 font-medium"
        >
          Currently supplying markets across
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
        >
          {countries.map((country, index) => (
            <motion.span
              key={country}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13px] tracking-[0.12em] uppercase font-medium text-muted-text/70"
            >
              {country}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
