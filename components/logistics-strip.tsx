"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    number: 1,
    title: "Submit Requirements",
    description:
      "Share your product specification, target volume, and destination port. We confirm availability and respond with indicative pricing within 24 hours.",
  },
  {
    number: 2,
    title: "Sampling & Approval",
    description:
      "Receive lab-tested samples with full specification sheets and certification documentation before committing to an order.",
  },
  {
    number: 3,
    title: "Export Documentation",
    description:
      "We prepare phytosanitary certificates, health declarations, certificate of origin, and all customs paperwork for your import market.",
  },
  {
    number: 4,
    title: "Freight & Delivery",
    description:
      "We arrange shipment on FOB, CIF, or DDP terms. Marine insurance and real-time cargo tracking included on every consignment.",
  },
]

export function LogisticsStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="logistics"
      ref={ref}
      className="bg-ink py-20 sm:py-28 md:py-32 lg:py-40"
      aria-labelledby="logistics-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-saffron font-medium mb-5">
            Export Process
          </p>
          <h2
            id="logistics-heading"
            className="font-serif text-4xl md:text-5xl font-medium text-parchment"
          >
            From your inquiry to your port.
          </h2>
        </motion.div>

        <div className="mt-16 relative">
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-saffron/30" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25 + index * 0.13, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-center"
              >
                {/* Step number */}
                <motion.div
                  className="relative z-10 mx-auto w-14 h-14 rounded-full border border-saffron/60 flex items-center justify-center"
                  whileHover={{ scale: 1.14, borderColor: "rgba(200,150,62,0.9)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <span className="font-serif text-xl font-semibold text-saffron">
                    {step.number}
                  </span>
                </motion.div>

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

                <h3 className="mt-7 font-serif text-lg font-medium text-parchment tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[13px] text-parchment/55 leading-[1.75]">
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
