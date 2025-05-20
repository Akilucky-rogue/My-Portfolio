"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Float, PerspectiveCamera } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import * as THREE from "three"

function FloatingText({ position, text, color, size = 1, rotation = [0, 0, 0] }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text
        ref={ref}
        position={position}
        rotation={rotation}
        fontSize={size}
        color={color}
        font="/fonts/SpaceGrotesk-Bold.ttf"
        maxWidth={10}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {text}
      </Text>
    </Float>
  )
}

function AnimatedSphere({ position, color, size = 1 }) {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.2
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
    </mesh>
  )
}

function ParticleField() {
  const { camera } = useThree()
  const particles = useRef()

  useEffect(() => {
    if (particles.current) {
      const positions = new Float32Array(1000 * 3)
      const colors = new Float32Array(1000 * 3)

      for (let i = 0; i < 1000; i++) {
        const i3 = i * 3
        positions[i3] = (Math.random() - 0.5) * 20
        positions[i3 + 1] = (Math.random() - 0.5) * 20
        positions[i3 + 2] = (Math.random() - 0.5) * 20

        colors[i3] = Math.random()
        colors[i3 + 1] = Math.random()
        colors[i3 + 2] = Math.random()
      }

      particles.current.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      particles.current.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    }
  }, [])

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.x = state.clock.getElapsedTime() * 0.05
      particles.current.rotation.y = state.clock.getElapsedTime() * 0.03
    }
  })

  return (
    <points ref={particles}>
      <bufferGeometry />
      <pointsMaterial size={0.05} vertexColors />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4169e1" />

      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 2 - 0.5}
        maxPolarAngle={Math.PI / 2 + 0.5}
      />

      <ParticleField />

      <FloatingText position={[0, 1.5, 0]} text="AKSHAT VORA" color="#ffffff" size={1.5} />

      <FloatingText position={[0, 0, 0]} text="COMPUTER ENGINEERING" color="#4169e1" size={0.8} />

      <FloatingText position={[0, -1.5, 0]} text="DEVELOPER & DESIGNER" color="#ffffff" size={0.8} />

      <AnimatedSphere position={[-4, 2, -2]} color="#4169e1" size={0.5} />
      <AnimatedSphere position={[4, -2, -2]} color="#9c27b0" size={0.3} />
      <AnimatedSphere position={[-3, -3, -1]} color="#ff4081" size={0.2} />
      <AnimatedSphere position={[3, 3, -1]} color="#00bcd4" size={0.4} />
    </>
  )
}

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="section overflow-hidden">
      <div className="canvas-container">
        <Canvas>
          <Scene />
        </Canvas>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
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
