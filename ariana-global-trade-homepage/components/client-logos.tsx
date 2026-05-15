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
      className="bg-parchment py-16 overflow-hidden"
      aria-label="Trusted by importers worldwide"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-muted-text mb-10 tracking-wide"
        >
          Trusted by importers in
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
        >
          {countries.map((country, index) => (
            <div
              key={country}
              className="flex-shrink-0 w-40 h-20 bg-muted rounded-lg flex items-center justify-center border border-border"
            >
              <span className="text-sm text-muted-text font-medium">
                {country}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
