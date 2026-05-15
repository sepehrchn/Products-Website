"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const stats = [
  { value: "14", label: "Countries Served" },
  { value: "2,400+", label: "Tonnes Exported" },
  { value: "ISO 22000", label: "Certified" },
  { value: "Est. 1998", label: "Founded" },
]

export function TrustBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="bg-parchment py-12 border-y border-border"
      aria-label="Company statistics"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-serif text-3xl md:text-4xl font-semibold text-saffron">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-text font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
