"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Calendar } from "lucide-react"

export function Certifications() {
  const certificationsData = [
    {
      title: "Certificate Course In C, C++, Python Language",
      issuer: "Raj Computers Academy, Mumbai",
      date: "Jun 2021 - Sep 2021",
    },
    {
      title: "Certificate Course in Computerised Accounting with Tally Prime And GST",
      issuer: "Raj Computers Academy, Mumbai",
      date: "May 2020 - Jul 2020",
      description:
        "Computerised Accounting program with Tally Prime specially designed for people who are interested in computerised accounting. The program covers four levels of in-depth knowledge in Tally.",
    },
    {
      title: "Certificate Course in Data Science & Machine Learning",
      issuer: "Raj Computers Academy, Mumbai",
      date: "",
    },
    {
      title: "Certificate Course in Ethical Hacking",
      issuer: "Raj Computers Academy, Mumbai",
      date: "Mar 2020 - Sep 2020",
    },
    {
      title: "Certificate Course in Stop Motion Animation",
      issuer: "Udemy, Virtual",
      date: "Feb 2020 - Mar 2020",
    },
    {
      title: "Certificate Course in Video and Sound Editing",
      issuer: "Raj Computer Academy, Mumbai",
      date: "Apr 2018 - Jun 2018",
    },
    {
      title: "Certificate Course in WPD (Webpage Designing)",
      issuer: "Raj Computer Academy, Mumbai",
      date: "Apr 2016 - Jun 2016",
      description: "Designing multifunctional websites.",
    },
    {
      title: "Certificate Course in Desktop Publishing",
      issuer: "Raj Computers Academy, Mumbai",
      date: "Apr 2015 - Jun 2015",
      description: "Have a good in-hand knowledge of Adobe Photoshop, CorelDRAW and Adobe InDesign",
    },
  ]

  return (
    <section id="certifications" className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Certifications</h2>
          <p className="text-muted-foreground">Professional certifications and courses</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificationsData.map((cert, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                    <p className="text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {cert.date && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{cert.date}</span>
                  </div>
                )}
                {cert.description && <p>{cert.description}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
