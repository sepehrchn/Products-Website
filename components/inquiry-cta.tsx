"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

export function InquiryCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="inquire"
      ref={ref}
      className="bg-parchment py-20 sm:py-28 md:py-32 lg:py-44"
      aria-labelledby="inquire-heading"
    >
      <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
        <motion.h2
          id="inquire-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-ink leading-[1.1]"
        >
          Ready to source from Iran’s origin?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-[15px] text-muted-text leading-[1.8] max-w-md mx-auto"
        >
          Share your product requirement, target volume, and destination port.
          Our export team will respond within 48 hours with pricing, sample
          availability, and logistics options.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-block"
          >
            <Button
              size="lg"
              className="bg-saffron text-ink hover:bg-saffron/90 font-medium px-12 h-12 text-[15px]"
            >
              Request a Quote
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
