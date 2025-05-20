"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loader } from "@/components/loader"

// Dynamically import 3D components to avoid SSR issues
const Hero = dynamic(() => import("@/components/hero"), {
  ssr: false,
  loading: () => <Loader text="Loading hero..." />,
})

const About = dynamic(() => import("@/components/about"), {
  ssr: false,
  loading: () => <Loader text="Loading about..." />,
})

const Experience = dynamic(() => import("@/components/experience"), {
  ssr: false,
  loading: () => <Loader text="Loading experience..." />,
})

const Projects = dynamic(() => import("@/components/projects"), {
  ssr: false,
  loading: () => <Loader text="Loading projects..." />,
})

const Skills = dynamic(() => import("@/components/skills"), {
  ssr: false,
  loading: () => <Loader text="Loading skills..." />,
})

const Contact = dynamic(() => import("@/components/contact"), {
  ssr: false,
  loading: () => <Loader text="Loading contact..." />,
})

export function PortfolioSections() {
  return (
    <>
      <Suspense fallback={<Loader text="Loading hero..." />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<Loader text="Loading about..." />}>
        <About />
      </Suspense>

      <Suspense fallback={<Loader text="Loading experience..." />}>
        <Experience />
      </Suspense>

      <Suspense fallback={<Loader text="Loading projects..." />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<Loader text="Loading skills..." />}>
        <Skills />
      </Suspense>

      <Suspense fallback={<Loader text="Loading contact..." />}>
        <Contact />
      </Suspense>
    </>
  )
}
