import { ScrollProgress } from "@/components/scroll-progress"
import { PortfolioSections } from "@/components/portfolio-sections"
import { AssetPreloader } from "@/components/asset-preloader"

export default function Home() {
  return (
    <main className="relative">
      <AssetPreloader>
        <ScrollProgress />
        <PortfolioSections />
      </AssetPreloader>
    </main>
  )
}
