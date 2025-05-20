"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

function ExperienceItem({ position, company, location, period, description, type, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20 overflow-hidden card-3d">
        <div className="card-content">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-xl gradient-text">{position}</CardTitle>
                <p className="text-muted-foreground">
                  {company}, {location}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{period}</span>
                {type && (
                  <Badge variant="outline" className="bg-primary/10 border-primary/20">
                    {type}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          {description && (
            <CardContent>
              <p>{description}</p>
            </CardContent>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

function TimelineVisual() {
  return (
    <div className="relative h-full w-full">
      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform -translate-x-1/2" />

      {/* Timeline nodes */}
      <div className="absolute left-1/2 top-[20%] w-6 h-6 rounded-full bg-primary transform -translate-x-1/2 glow">
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
        <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 bg-primary/10 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium">2023</span>
        </div>
      </div>

      <div className="absolute left-1/2 top-[50%] w-6 h-6 rounded-full bg-purple-500 transform -translate-x-1/2 glow">
        <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-50" />
        <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 bg-purple-500/10 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium">2022</span>
        </div>
      </div>

      <div className="absolute left-1/2 top-[80%] w-6 h-6 rounded-full bg-pink-500 transform -translate-x-1/2 glow">
        <div className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-50" />
        <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 bg-pink-500/10 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium">2021</span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-500/5 blur-xl animate-float-slow" />
    </div>
  )
}

export default function Experience() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const experienceData = [
    {
      position: "Teaching",
      company: "Raj Computers Academy",
      location: "Mumbai",
      period: "Jun 2023 - Present",
      description: "Teaching all courses",
      type: "Internship",
    },
    {
      position: "Software Developer",
      company: "Mrudul Technologies Pvt Ltd",
      location: "Remote",
      period: "May 2023 - Jun 2023",
      description: "Learn and Build apps",
      type: "Internship",
    },
    {
      position: "Post & Catalogue Creation",
      company: "Leaders and Dreamers Private Limited",
      location: "Remote",
      period: "Oct 2022 - Dec 2022",
      description: "Freelance work",
      type: "Internship",
    },
    {
      position: "Social Media Manager",
      company: "Varta Productions",
      location: "Mumbai",
      period: "Jun 2022 - Oct 2022",
      description: "",
      type: "",
    },
    {
      position: "Graphic Design",
      company: "Varta Productions",
      location: "Mumbai",
      period: "Jun 2022 - Oct 2022",
      description: "Creating designer posts",
      type: "Internship",
    },
  ]

  return (
    <section id="experience" className="section bg-gradient-to-b from-background/50 to-background" ref={containerRef}>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Work Experience</h2>
              <p className="text-lg text-muted-foreground mb-6">My professional journey and internships</p>

              <div className="h-[300px] lg:h-[500px] rounded-lg overflow-hidden bg-secondary/10 backdrop-blur-sm border border-primary/20">
                <TimelineVisual />
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {experienceData.map((item, index) => (
              <ExperienceItem
                key={index}
                position={item.position}
                company={item.company}
                location={item.location}
                period={item.period}
                description={item.description}
                type={item.type}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
