"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

const products = [
  {
    name: "Saffron",
    description: "The world's most precious spice, hand-harvested at dawn.",
    origin: "Khorasan",
  },
  {
    name: "Pistachios",
    description: "Naturally split kernels with rich, buttery flavor.",
    origin: "Kerman",
  },
  {
    name: "Dried Fruits",
    description: "Sun-dried figs, dates, and apricots of exceptional quality.",
    origin: "Fars",
  },
  {
    name: "Rose Water",
    description: "Distilled from Damask roses in the heart of Kashan.",
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
      className="bg-parchment py-24"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          id="products-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl font-medium text-ink text-center"
        >
          What we export
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              {/* Placeholder Image */}
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Product Image</span>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-2xl font-medium text-ink">
                  {product.name}
                </h3>
                <p className="mt-2 text-muted-text leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs tracking-wider uppercase text-saffron font-medium">
                    Product of Iran · {product.origin}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-ink hover:text-saffron hover:bg-transparent"
                  >
                    Request Samples
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
