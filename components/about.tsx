"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, MapPin, Phone } from "lucide-react"

export default function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="about" className="section bg-gradient-to-b from-background to-background/50" ref={containerRef}>
      <motion.div className="section-content grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" style={{ opacity }}>
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">About Me</h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Computer Engineering student with a passion for technology and innovation
              </p>
            </div>

            <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
              <CardContent className="p-4 sm:p-6">
                <p className="text-base sm:text-lg leading-relaxed">
                  I am a BTech Integrated Computer Engineering student at MPSTME, NMIMS University, with a strong
                  foundation in programming, web development, and design. I am passionate about creating innovative
                  solutions and have experience in various technologies including Python, Java, JavaScript, and more.
                </p>
                <p className="text-base sm:text-lg leading-relaxed mt-4">
                  With a diverse skill set spanning from software development to graphic design, I enjoy tackling
                  complex problems and building applications that make a difference. I am currently serving as a Student
                  Placecom for Batch 2026 and have held various positions of responsibility in technical clubs.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/20 p-2 sm:p-3 rounded-full">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Date of Birth</p>
                    <p className="text-sm sm:text-base font-medium">October 27, 2004</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/20 p-2 sm:p-3 rounded-full">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                    <p className="text-sm sm:text-base font-medium truncate">akshatbvora@gmail.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/20 p-2 sm:p-3 rounded-full">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                    <p className="text-sm sm:text-base font-medium">+91 8850490510</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/20 p-2 sm:p-3 rounded-full">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                    <p className="text-sm sm:text-base font-medium">Mumbai, India</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm">
                Student Placecom for Batch 2026
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm">
                Taqneeq – Technical Executive (2022-23)
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm">
                IETE MPSTME – R&D Executive (2022-23)
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm">
                Sattva - Technical Executive (2022-23)
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm">
                ACM – Creatives Exec; RnD Sr. Exec; RnD Head (2022-25)
              </Badge>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="order-1 lg:order-2 h-[300px] sm:h-[400px] lg:h-[600px]"
          style={{ y }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative h-full w-full rounded-lg overflow-hidden bg-secondary/10 backdrop-blur-sm border border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-primary/20 backdrop-blur-md mb-4 sm:mb-6 flex items-center justify-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">AV</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Akshat Vora</h3>

              <div className="space-y-2 max-w-md">
                <p className="text-sm sm:text-base text-muted-foreground">
                  "I believe in creating technology that makes a positive impact on people's lives."
                </p>

                <div className="pt-2 sm:pt-4">
                  <Badge className="mr-2 mb-2 text-xs">Problem Solver</Badge>
                  <Badge className="mr-2 mb-2 text-xs">Creative Thinker</Badge>
                  <Badge className="mr-2 mb-2 text-xs">Team Player</Badge>
                  <Badge className="mr-2 mb-2 text-xs">Continuous Learner</Badge>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/10 blur-xl animate-float" />
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-secondary/10 blur-xl animate-float-slow" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
