import { ScrollProgress } from "@/components/scroll-progress"
import { PortfolioSections } from "@/components/portfolio-sections"
import { AssetPreloader } from "@/components/asset-preloader"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <AssetPreloader>
        <ScrollProgress />
        <PortfolioSections />
        <Footer />
      </AssetPreloader>
    </main>
  )
}
