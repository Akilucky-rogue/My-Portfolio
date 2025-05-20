"use client"

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Text, Float, OrbitControls, Environment } from "@react-three/drei"
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

function TimelineSphere({ position, text, color = "#4169e1" }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
        </mesh>
        <Text position={[0, 0, 0.6]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
          {text}
        </Text>
      </group>
    </Float>
  )
}

function Timeline() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.5} />

      <mesh position={[0, 0, -1]}>
        <cylinderGeometry args={[0.05, 0.05, 10, 32]} />
        <meshStandardMaterial color="#4169e1" roughness={0.3} metalness={0.8} />
      </mesh>

      <TimelineSphere position={[0, 2, 0]} text="2023" color="#4169e1" />
      <TimelineSphere position={[0, 0, 0]} text="2022" color="#9c27b0" />
      <TimelineSphere position={[0, -2, 0]} text="2021" color="#ff4081" />
    </>
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

              <div className="h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
                <Canvas>
                  <Timeline />
                </Canvas>
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
