import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { ProductGrid } from "@/components/product-grid"
import { OriginTeaser } from "@/components/origin-teaser"
import { LogisticsStrip } from "@/components/logistics-strip"
import { ClientLogos } from "@/components/client-logos"
import { InquiryCTA } from "@/components/inquiry-cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <ProductGrid />
      <OriginTeaser />
      <LogisticsStrip />
      <ClientLogos />
      <InquiryCTA />
      <Footer />
    </main>
  )
}
