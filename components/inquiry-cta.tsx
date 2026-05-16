"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

export function InquiryCTA() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="inquire"
      ref={ref}
      className="bg-parchment py-16 sm:py-24 md:py-32 lg:py-40"
      aria-labelledby="inquire-heading"
    >
      <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
        <motion.h2
          id="inquire-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-ink leading-[1.1] tracking-tight"
        >
          {t('inquiry.heading')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-sm sm:text-[15px] text-muted-text leading-[1.8] max-w-md mx-auto"
        >
          {t('inquiry.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 w-full sm:w-auto"
        >
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-saffron text-ink hover:bg-saffron/90 font-medium px-12 h-14 text-base shadow-lg shadow-saffron/20 tracking-wide"
            >
              {t('inquiry.btn')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
