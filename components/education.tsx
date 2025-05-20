"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, School } from "lucide-react"

export function Education() {
  const educationData = [
    {
      institution: "MPSTME, NMIMS University",
      degree: "B. Tech Integrated in Computer Engineering",
      period: "2022 - 2026",
      gpa: "CGPA: 3.10",
      icon: GraduationCap,
    },
    {
      institution: "MPSTME, NMIMS University",
      degree: "B. Tech Integrated in Computer Engineering",
      period: "2020 - 2022",
      gpa: "CGPA: 3.73",
      icon: GraduationCap,
    },
    {
      institution: "Witty International School",
      degree: "IGCSE",
      period: "2006 - 2020",
      gpa: "Score: 80",
      icon: School,
    },
  ]

  return (
    <section id="education" className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Education</h2>
          <p className="text-muted-foreground">My academic journey and qualifications</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationData.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.institution}</CardTitle>
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{item.degree}</p>
                <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                  <p>{item.period}</p>
                  <p>{item.gpa}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
