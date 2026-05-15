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
      className="bg-parchment py-24"
      aria-labelledby="inquire-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          id="inquire-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-ink"
        >
          Ready to source from the origin?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg text-muted-text leading-relaxed"
        >
          Tell us what you need. Our export specialists will prepare a detailed
          quote within 48 hours, including samples, certifications, and shipping
          options.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <Button
            size="lg"
            className="bg-saffron text-ink hover:bg-saffron/90 font-medium px-10 py-6 text-lg"
          >
            Start Your Inquiry
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
