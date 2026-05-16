"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/lib/i18n"

export function TrustBar() {
  const { t } = useLanguage()
  const stats = t('trustBar.metrics') as { value: string; label: string }[]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="bg-parchment py-12 sm:py-16 lg:py-20 border-y border-border"
      aria-label="Company statistics"
    >
      <div className="mx-auto max-w-6xl px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className={[
                "text-center py-7 sm:py-8 px-4 sm:px-6",
                index % 2 !== 0 ? "border-l border-border" : "",
                index >= 2 ? "border-t border-border md:border-t-0" : "",
                index > 0 && index % 2 === 0 ? "md:border-l md:border-border" : "",
              ].join(" ")}
            >
              <div className="font-serif text-4xl md:text-5xl font-medium text-saffron leading-none tracking-tight">
                {stat.value}
              </div>
              <div className="mt-3 text-[11px] tracking-[0.2em] uppercase font-medium text-muted-text">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
