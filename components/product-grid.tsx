"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const products = [
  {
    name: "Saffron",
    description:
      "Grade 1 and Sargol cuts, hand-harvested from Khorasan's high-altitude fields. Available in 1g–500g retail packs and kilogram-level bulk export quantities. Compliant with ISO 3632.",
    origin: "Khorasan",
    image: "/images/saffron.jpg"
  },
  {
    name: "Premium Iranian Spices",
    description:
      "Carefully sourced Iranian spices known for rich aroma, vibrant color, and export-grade quality. Suitable for wholesale distribution, food manufacturing, and international culinary markets.",
    origin: "Kerman",
    image: "/images/spice.jpg"
  },
  {
    name: "Dried Fruits",
    description:
      "Mazafati and Medjool dates, sun-dried figs, and dried apricots from Fars province. Available in consumer retail cartons and bulk palletised volumes. Brix and moisture specs on request.",
    origin: "Fars",
    image: "/images/dried-fruits.jpg"
  },
  {
    name: "Traditional Herbal Drinks",
    description:
      "Authentic Iranian herbal beverages crafted from natural botanicals and regional ingredients. Prepared for international markets with premium packaging and consistent quality standards.",
    origin: "Isfahan",
    image: "/images/herbs.jpg"
  },
]

export function ProductGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="products"
      ref={ref}
      className="bg-parchment py-16 sm:py-24 md:py-32 lg:py-40"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-saffron font-medium mb-5">
            Export Catalogue
          </p>
          <h2
            id="products-heading"
            className="font-serif text-4xl md:text-5xl font-medium text-ink leading-[1.1] tracking-tight"
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
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="group bg-card rounded-lg overflow-hidden shadow-sm border border-border cursor-default"
            >
              {/* Product Image */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  quality={90}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-5 sm:p-8">
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-ink leading-tight tracking-tight">
                  {product.name}
                </h3>
                <p className="mt-3 text-muted-text leading-[1.8] text-[15px]">
                  {product.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-saffron font-semibold">
                    {product.origin}, Iran
                  </span>
                  <button className="text-[13px] font-medium text-ink/60 hover:text-saffron transition-colors group-hover:text-saffron flex items-center">
                    Request Samples <span className="ml-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">&rarr;</span>
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
