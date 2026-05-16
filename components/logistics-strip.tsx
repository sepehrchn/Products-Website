"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/lib/i18n"

export function LogisticsStrip() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = t('logistics.steps') as { title: string; description: string }[]

  return (
    <section
      id="logistics"
      ref={ref}
      className="bg-ink py-16 sm:py-24 md:py-32 lg:py-40"
      aria-labelledby="logistics-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-saffron font-medium mb-5">
            {t('logistics.tag')}
          </p>
          <h2
            id="logistics-heading"
            className="font-serif text-4xl md:text-5xl font-medium text-parchment leading-[1.1] tracking-tight"
          >
            {t('logistics.heading')}
          </h2>
        </motion.div>

        <div className="mt-16 relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-saffron/30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.25 + index * 0.13, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-center"
              >
                {/* Step number */}
                <motion.div
                  className="relative z-10 mx-auto w-14 h-14 rounded-full border border-saffron/60 flex items-center justify-center"
                  whileHover={{ scale: 1.05, borderColor: "rgba(200,150,62,0.9)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-serif text-xl font-semibold text-saffron">
                    {index + 1}
                  </span>
                </motion.div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="sm:hidden flex justify-center mt-6 -mb-2">
                    <svg
                      className="w-6 h-6 text-saffron/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                )}

                <h3 className="mt-7 font-serif text-xl font-medium text-parchment tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-parchment/60 leading-[1.8]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
