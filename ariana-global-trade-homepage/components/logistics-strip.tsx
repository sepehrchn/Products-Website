"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    number: 1,
    title: "Order & Sampling",
    description: "Submit your requirements and receive product samples.",
  },
  {
    number: 2,
    title: "Quality Check",
    description: "Laboratory testing and certification verification.",
  },
  {
    number: 3,
    title: "Packaging & Docs",
    description: "Export-grade packaging and complete documentation.",
  },
  {
    number: 4,
    title: "Shipment",
    description: "Door-to-port delivery with real-time tracking.",
  },
]

export function LogisticsStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="logistics"
      ref={ref}
      className="bg-ink py-24"
      aria-labelledby="logistics-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          id="logistics-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl font-medium text-parchment text-center"
        >
          End-to-end, door to port.
        </motion.h2>

        <div className="mt-16 relative">
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-saffron/30" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="relative z-10 mx-auto w-16 h-16 rounded-full bg-ink border-2 border-saffron flex items-center justify-center">
                  <span className="font-serif text-2xl font-semibold text-saffron">
                    {step.number}
                  </span>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
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

                <h3 className="mt-6 font-serif text-xl font-medium text-parchment">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-parchment/60 leading-relaxed">
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
