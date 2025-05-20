"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function SkillSphere({ skill, position, color = "#4169e1", size = 0.5 }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={ref}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh scale={hovered ? 1.2 : 1}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
        </mesh>
        <Text
          position={[0, 0, size + 0.1]}
          fontSize={size * 0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          textAlign="center"
        >
          {skill}
        </Text>
      </group>
    </Float>
  )
}

function SkillsCloud({ skills }) {
  const positions = [
    [-2, 2, 0],
    [0, 2, 1],
    [2, 2, 0],
    [-2, 0, 1],
    [0, 0, 0],
    [2, 0, 1],
    [-2, -2, 0],
    [0, -2, 1],
    [2, -2, 0],
  ]

  const colors = ["#4169e1", "#9c27b0", "#ff4081", "#00bcd4", "#4caf50", "#ff9800", "#9c27b0", "#4169e1", "#ff4081"]

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

      {skills.slice(0, 9).map((skill, index) => (
        <SkillSphere
          key={index}
          skill={skill}
          position={positions[index]}
          color={colors[index]}
          size={0.5 + Math.random() * 0.3}
        />
      ))}
    </>
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
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <SkillsCloud skills={skillCategories.flatMap((category) => category.skills)} />
              </Canvas>
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
