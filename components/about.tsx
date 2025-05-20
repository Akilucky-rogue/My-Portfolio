"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, MapPin, Phone } from "lucide-react"

function Model(props) {
  // This is a placeholder for a 3D model
  // In a real implementation, you would use useGLTF to load a custom model
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <group ref={ref} {...props}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4169e1" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  )
}

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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">About Me</h2>
              <p className="text-lg text-muted-foreground">
                Computer Engineering student with a passion for technology and innovation
              </p>
            </div>

            <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed">
                  I am a BTech Integrated Computer Engineering student at MPSTME, NMIMS University, with a strong
                  foundation in programming, web development, and design. I am passionate about creating innovative
                  solutions and have experience in various technologies including Python, Java, JavaScript, and more.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  With a diverse skill set spanning from software development to graphic design, I enjoy tackling
                  complex problems and building applications that make a difference. I am currently serving as a Student
                  Placecom for Batch 2026 and have held various positions of responsibility in technical clubs.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">October 27, 2004</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">akshatbvora@gmail.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+91 8850490510</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Mumbai, India</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Student Placecom for Batch 2026
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Taqneeq – Technical Executive (2022-23)
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                IETE MPSTME – R&D Executive (2022-23)
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Sattva - Technical Executive (2022-23)
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                ACM – Creatives Exec; RnD Sr. Exec; RnD Head (2022-25)
              </Badge>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="order-1 lg:order-2 h-[400px] lg:h-[600px]"
          style={{ y }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Environment preset="city" />
            <OrbitControls enableZoom={false} enablePan={false} />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
            <Model position={[0, 0, 0]} scale={2} />
          </Canvas>
        </motion.div>
      </motion.div>
    </section>
  )
}
