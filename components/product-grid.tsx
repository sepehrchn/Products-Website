"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

const products = [
  {
    name: "Saffron",
    description:
      "Grade 1 and Sargol cuts, hand-harvested from Khorasan's high-altitude fields. Available in 1g–500g retail packs and kilogram-level bulk export quantities. Compliant with ISO 3632.",
    origin: "Khorasan",
  },
  {
    name: "Pistachios",
    description:
      "Naturally open-shell Kerman pistachios — raw, roasted, and salted. Graded by size (20–22, 22–24, 24–26 counts). Full EU and US import compliance documentation provided.",
    origin: "Kerman",
  },
  {
    name: "Dried Fruits",
    description:
      "Mazafati and Medjool dates, sun-dried figs, and dried apricots from Fars province. Available in consumer retail cartons and bulk palletised volumes. Brix and moisture specs on request.",
    origin: "Fars",
  },
  {
    name: "Rose Water",
    description:
      "Steam-distilled from Damask roses in Kashan. Available in food-grade and cosmetic-grade variants with Ecocert-eligible documentation. Minimum order 500 litres.",
    origin: "Isfahan",
  },
]

export function ProductGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="products"
      ref={ref}
      className="bg-parchment py-20 sm:py-28 md:py-32 lg:py-40"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-saffron font-medium mb-5">
            Export Catalogue
          </p>
          <h2
            id="products-heading"
            className="font-serif text-4xl md:text-5xl font-medium text-ink"
          >
            Our core export lines
          </h2>
          <p className="mt-5 text-muted-text max-w-lg mx-auto leading-relaxed">
            All product lines are available in bulk and retail configurations,
            with full documentation for customs clearance in your market.
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 28 } }}
              className="group bg-card rounded-lg overflow-hidden shadow-sm border border-border cursor-default"
            >
              {/* Placeholder Image */}
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm tracking-wide">Product Image</span>
              </div>

              <div className="p-5 sm:p-8">
                <h3 className="font-serif text-2xl font-medium text-ink leading-tight">
                  {product.name}
                </h3>
                <p className="mt-3 text-muted-text leading-[1.75] text-[15px]">
                  {product.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-saffron font-semibold">
                    {product.origin}, Iran
                  </span>
                  <button className="text-[13px] font-medium text-ink/60 hover:text-saffron transition-colors underline underline-offset-4 decoration-saffron/30">
                    Request Samples
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
