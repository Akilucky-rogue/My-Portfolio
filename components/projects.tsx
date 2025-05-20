"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowLeft, ArrowRight, Code } from "lucide-react"

function ProjectCard({ project, index, totalProjects, currentIndex, setCurrentIndex }) {
  const isActive = index === currentIndex

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.9,
        x: (index - currentIndex) * 100,
      }}
      transition={{ duration: 0.5 }}
      className={`absolute top-0 left-0 right-0 transition-all duration-500 ${isActive ? "z-10" : "z-0"}`}
    >
      <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20 overflow-hidden card-3d">
        <div className="card-content">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-2xl gradient-text">{project.title}</CardTitle>
              <Badge variant="outline" className="bg-primary/10 border-primary/20">
                {project.year}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary" className="bg-secondary/50">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="relative h-[200px] rounded-md overflow-hidden bg-background/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-background/40 backdrop-blur-sm p-4 rounded-full mb-4 inline-block">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Project Preview</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="border-primary/20" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Source Code
              </a>
            </Button>
            <Button className="bg-primary" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  )
}

function ProjectControls({ currentIndex, setCurrentIndex, totalProjects }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
        disabled={currentIndex === 0}
        className="border-primary/20"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-2">
        {Array.from({ length: totalProjects }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full p-0 ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
          >
            <span className="sr-only">Go to project {index + 1}</span>
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setCurrentIndex(Math.min(totalProjects - 1, currentIndex + 1))}
        disabled={currentIndex === totalProjects - 1}
        className="border-primary/20"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

function ProjectsHeader() {
  return (
    <div className="relative">
      <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative z-10 text-center p-8 bg-secondary/10 backdrop-blur-sm rounded-lg border border-primary/10">
        <h3 className="text-2xl font-bold gradient-text mb-2">PROJECTS</h3>
        <p className="text-muted-foreground">Showcasing my technical skills and creativity</p>
      </div>
    </div>
  )
}

export default function Projects() {
  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const projectsData = [
    {
      title: "GenoScan",
      description:
        "A web platform that analyses DNA sequences to detect genetic abnormalities and suggest potential therapeutic approaches for researchers and clinicians.",
      year: "2024",
      link: "GenomeScan - DNA Analysis Platform",
      tags: ["Python", "Bioinformatics", "Machine Learning", "Web Development"],
    },
    {
      title: "TradeSim",
      description:
        "A comprehensive trading simulator that allows users to practice investing in stocks and cryptocurrencies with real-time data analysis, portfolio tracking, and educational resources in a risk-free environment.",
      year: "2024",
      link: "TradeSim - Crypto & Stocks Simulator",
      tags: ["JavaScript", "React", "Financial APIs", "Data Visualization"],
    },
    {
      title: "CipherShare",
      description:
        "A secure, decentralized file storage and sharing platform with military-grade encryption for protecting sensitive data made using Microservices.",
      year: "2025",
      link: "CipherShare - Secure Decentralized Storage",
      tags: ["Microservices", "Encryption", "Cloud Storage", "Security"],
    },
    {
      title: "HeartSync",
      description:
        "A comprehensive suite of features aimed at celebrating and enhancing the intimacy, communication, and shared experiences between partners, ensuring that the app remains both engaging and scalable for future enhancements.",
      year: "2024",
      link: "Dashboard | HeartSync",
      tags: ["Mobile App", "React Native", "Real-time Communication", "UI/UX"],
    },
  ]

  return (
    <section id="projects" className="section bg-gradient-to-b from-background to-background/50" ref={containerRef}>
      <motion.div className="section-content" style={{ opacity }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Projects</h2>
              <p className="text-lg text-muted-foreground mb-6">Showcasing my technical skills and creativity</p>

              <div className="h-[200px] rounded-lg overflow-hidden">
                <ProjectsHeader />
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-2">{projectsData[currentIndex].title}</h3>
                <p className="text-muted-foreground">
                  {currentIndex + 1} of {projectsData.length}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <div className="relative h-[600px]">
              {projectsData.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  totalProjects={projectsData.length}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              ))}
            </div>

            <ProjectControls
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              totalProjects={projectsData.length}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
