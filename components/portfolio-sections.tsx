"use client"

import { useState, useEffect, Suspense, lazy } from "react"
import { Loader } from "@/components/loader"
import { useInView } from "react-intersection-observer"

// Use React.lazy instead of next/dynamic for better control
const Hero = lazy(() => import("@/components/hero"))
const About = lazy(() => import("@/components/about"))
const Experience = lazy(() => import("@/components/experience"))
const Projects = lazy(() => import("@/components/projects"))
const Skills = lazy(() => import("@/components/skills"))
const Contact = lazy(() => import("@/components/contact"))

// Lightweight placeholder components
const HeroPlaceholder = () => (
  <section id="hero" className="section">
    <div className="section-content flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">Akshat Vora</h1>
        <p className="text-xl text-muted-foreground">Computer Engineering Student & Developer</p>
      </div>
    </div>
  </section>
)

// Progressive loading component
function ProgressiveSection({ id, component: Component, threshold = 0.1 }) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  })
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (inView) {
      setShouldLoad(true)
    }
  }, [inView])

  return (
    <div ref={ref} id={id} className="min-h-screen">
      {shouldLoad ? (
        <Suspense fallback={<Loader text={`Loading ${id} section...`} />}>
          <Component />
        </Suspense>
      ) : (
        <Loader text={`Loading ${id} section...`} />
      )}
    </div>
  )
}

export function PortfolioSections() {
  return (
    <>
      {/* Hero section loads immediately */}
      <Suspense fallback={<HeroPlaceholder />}>
        <Hero />
      </Suspense>

      {/* Other sections load progressively as user scrolls */}
      <ProgressiveSection id="about" component={About} />
      <ProgressiveSection id="experience" component={Experience} />
      <ProgressiveSection id="projects" component={Projects} />
      <ProgressiveSection id="skills" component={Skills} />
      <ProgressiveSection id="contact" component={Contact} />
    </>
  )
}
