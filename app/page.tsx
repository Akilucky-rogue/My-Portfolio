import { ScrollProgress } from "@/components/scroll-progress"
import { PortfolioSections } from "@/components/portfolio-sections"

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <PortfolioSections />
    </main>
  )
}
