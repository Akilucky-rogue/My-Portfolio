"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  // Function to scroll to about section
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/80 z-0" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-secondary/10 blur-3xl animate-float-fast" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            AKSHAT VORA
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            COMPUTER ENGINEERING
          </motion.p>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            DEVELOPER & DESIGNER
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant="default"
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              View Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <Button variant="ghost" size="icon" onClick={scrollToAbout} className="animate-bounce">
            <ChevronDown className="h-6 w-6" />
          </Button>
          <span className="text-sm text-muted-foreground mt-2">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  )
}
