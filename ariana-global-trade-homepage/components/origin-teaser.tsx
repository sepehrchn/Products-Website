"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const locations = [
  { name: "Tehran", cx: 145, cy: 85 },
  { name: "Khorasan", cx: 210, cy: 80 },
  { name: "Kerman", cx: 175, cy: 145 },
]

const certifications = ["ISO 22000", "GlobalG.A.P.", "EU Phytosanitary"]

export function OriginTeaser() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="origin"
      ref={ref}
      className="bg-card py-24 border-y border-border"
      aria-labelledby="origin-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2
              id="origin-heading"
              className="font-serif text-3xl md:text-4xl font-medium text-ink"
            >
              Grown where it&apos;s always grown.
            </h2>
            <div className="mt-8 space-y-4 text-muted-text leading-relaxed">
              <p>
                For millennia, Iran&apos;s unique terroir — its high-altitude plateaus,
                mineral-rich soils, and dramatic temperature shifts — has produced
                the world&apos;s finest saffron, pistachios, and dried fruits. These
                aren&apos;t commodities we source; they&apos;re traditions we steward.
              </p>
              <p>
                Every harvest passes through our quality control in Tehran before
                reaching your port. We maintain direct relationships with farming
                cooperatives across Khorasan, Kerman, and Fars provinces, ensuring
                traceability from field to shipment.
              </p>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <svg
              viewBox="0 0 300 200"
              className="w-full max-w-md"
              aria-label="Map of Iran showing key sourcing regions"
              role="img"
            >
              {/* Iran outline - simplified silhouette */}
              <path
                d="M50,80 Q60,50 100,40 Q140,30 180,35 Q220,40 250,60 Q270,80 260,100 Q250,130 240,150 Q220,170 180,175 Q140,180 100,165 Q70,150 55,120 Q45,100 50,80 Z"
                fill="none"
                stroke="#C8963E"
                strokeWidth="2"
                className="opacity-60"
              />
              
              {/* Location dots with pulse animation */}
              {locations.map((loc, index) => (
                <g key={loc.name}>
                  {/* Pulse ring */}
                  <motion.circle
                    cx={loc.cx}
                    cy={loc.cy}
                    r="8"
                    fill="none"
                    stroke="#C8963E"
                    strokeWidth="1"
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{
                      scale: [0.5, 1.5, 0.5],
                      opacity: [0.8, 0, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                  {/* Center dot */}
                  <circle cx={loc.cx} cy={loc.cy} r="4" fill="#C8963E" />
                  {/* Label */}
                  <text
                    x={loc.cx}
                    y={loc.cy - 12}
                    textAnchor="middle"
                    className="fill-ink text-[10px] font-medium"
                  >
                    {loc.name}
                  </text>
                </g>
              ))}
            </svg>

            {/* Certification badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-4 py-2 bg-parchment rounded-full text-xs font-medium text-ink border border-border"
                >
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
