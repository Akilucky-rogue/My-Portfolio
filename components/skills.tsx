"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function SkillBubble({ skill, index, total }) {
  // Calculate position in a circular pattern
  const angle = (index / total) * 2 * Math.PI
  const radius = 120
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  const size = Math.max(60, Math.min(100, 80 + Math.random() * 20))

  // Generate a color based on index
  const colors = ["#4169e1", "#9c27b0", "#ff4081", "#00bcd4", "#4caf50", "#ff9800"]
  const color = colors[index % colors.length]

  return (
    <motion.div
      className="absolute rounded-full flex items-center justify-center"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        width: size,
        height: size,
        backgroundColor: `${color}20`,
        border: `2px solid ${color}40`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
    >
      <span className="text-xs font-medium text-center px-2">{skill}</span>
    </motion.div>
  )
}

function SkillsCloud({ skills }) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg" />

      {/* Center point */}
      <div className="absolute left-1/2 top-1/2 w-16 h-16 rounded-full bg-primary/20 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <span className="text-xs font-bold">SKILLS</span>
      </div>

      {/* Skill bubbles */}
      {skills.slice(0, 12).map((skill, index, array) => (
        <SkillBubble key={index} skill={skill} index={index} total={array.length} />
      ))}
    </div>
  )
}

export default function Skills() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const skillCategories = [
    {
      category: "Programming Languages",
      skills: ["Python", "Java", "C++", "JavaScript", "HTML", "CSS", "R", "LaTeX"],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        "Spring Boot",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Scikit-learn",
        "TensorFlow",
        "OpenCV",
        "PyTorch",
        "Transformers",
        "RAG",
        "AutoGen",
        "Streamlit",
      ],
    },
    {
      category: "Tools & Platforms",
      skills: [
        "Vercel",
        "Git",
        "Docker",
        "Postman",
        "Visual Studio Code",
        "IntelliJ IDEA",
        "Eclipse",
        "Lovable",
        "Windsurf",
      ],
    },
    {
      category: "Design & Creative",
      skills: [
        "Adobe Photoshop",
        "CorelDRAW",
        "Adobe InDesign",
        "Adobe Creative Suite",
        "Adobe Premiere Pro",
        "Adobe After Effects",
        "Adobe Illustrator",
        "UI/UX Design",
        "Figma",
        "Canva",
      ],
    },
    {
      category: "Web & Mobile Development",
      skills: ["React", "Angular", "Node.js", "Bootstrap", "MongoDB", "MySQL", "PHP", "WordPress", "Flutter", "APIs"],
    },
    {
      category: "Key Concepts",
      skills: [
        "Ethical Hacking",
        "Reinforcement Learning",
        "AI",
        "Deep Learning",
        "LLM",
        "Data Structures",
        "Web Design",
        "Image Processing",
        "Algorithms",
        "Object-Oriented Programming",
        "Software Engineering",
        "Data Extraction and Processing",
      ],
    },
    {
      category: "Soft Skills",
      skills: [
        "Agile Collaboration",
        "Sprint Planning",
        "Communication Skills",
        "Problem Solving",
        "Cross-Functional Teamwork",
        "Scrum",
      ],
    },
  ]

  return (
    <section id="skills" className="section bg-gradient-to-b from-background/50 to-background" ref={containerRef}>
      <motion.div className="section-content" style={{ opacity }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Skills</h2>
            <p className="text-lg text-muted-foreground mb-6">Technical and professional competencies</p>

            <div className="h-[400px] rounded-lg overflow-hidden bg-secondary/10 backdrop-blur-sm border border-primary/20">
              <SkillsCloud skills={skillCategories.flatMap((category) => category.skills)} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue={skillCategories[0].category} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6">
                {skillCategories.map((category, index) => (
                  <TabsTrigger key={index} value={category.category} className="text-xs md:text-sm">
                    {category.category.split(" ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {skillCategories.map((category, index) => (
                <TabsContent key={index} value={category.category} className="mt-0">
                  <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl gradient-text">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-secondary/50 hover:bg-primary/20 transition-colors cursor-pointer"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
