"use client"

import { type ReactNode, useEffect, useState, useRef } from "react"
import { Canvas, type Props as CanvasProps } from "@react-three/fiber"
import { SceneEnvironment } from "@/components/scene-environment"
import { useEnvironment } from "@/contexts/environment-context"

interface ThreeCanvasProps extends CanvasProps {
  children: ReactNode
  fallback?: ReactNode
  environmentPreset?: string
}

export function ThreeCanvas({ children, fallback, environmentPreset, ...props }: ThreeCanvasProps) {
  const [canRender3D, setCanRender3D] = useState(true)
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const [hasContextLost, setHasContextLost] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { setEnvironment } = useEnvironment()

  useEffect(() => {
    // Set environment if specified and it exists
    if (environmentPreset) {
      try {
        setEnvironment(environmentPreset)
      } catch (error) {
        console.warn(`Failed to set environment preset "${environmentPreset}":`, error)
        // Fall back to a default environment
        setEnvironment("Clean Studio")
      }
    }
  }, [environmentPreset, setEnvironment])

  useEffect(() => {
    // Check if WebGL is available
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      setCanRender3D(!!gl)
    } catch (e) {
      setCanRender3D(false)
    }

    // Check if device is likely mobile or low-end
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    setIsLowPerformance(isMobile)

    // Check if user has enabled light performance mode
    const isLightMode = document.documentElement.classList.contains("light-performance")
    if (isLightMode) {
      setCanRender3D(false)
    }
  }, [])

  // Handle WebGL context loss and recovery
  useEffect(() => {
    if (!canvasRef.current) return

    const handleContextLost = (e: Event) => {
      e.preventDefault()
      console.warn("WebGL context lost")
      setHasContextLost(true)
    }

    const handleContextRestored = () => {
      console.log("WebGL context restored")
      setHasContextLost(false)
    }

    const canvas = canvasRef.current
    canvas.addEventListener("webglcontextlost", handleContextLost)
    canvas.addEventListener("webglcontextrestored", handleContextRestored)

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost)
      canvas.removeEventListener("webglcontextrestored", handleContextRestored)
    }
  }, [canvasRef.current])

  if (!canRender3D || hasContextLost) {
    return fallback ? <>{fallback}</> : null
  }

  return (
    <Canvas
      ref={canvasRef}
      dpr={isLowPerformance ? 1 : [1, 2]}
      performance={{ min: 0.5 }}
      gl={{
        powerPreference: "high-performance",
        antialias: !isLowPerformance,
        depth: true,
        stencil: false,
        alpha: true,
        preserveDrawingBuffer: true, // Helps with screenshots and context recovery
      }}
      onCreated={({ gl }) => {
        // Configure renderer for better performance
        gl.setClearColor(0x000000, 0)
        gl.physicallyCorrectLights = true
      }}
      {...props}
    >
      <SceneEnvironment />
      {children}
    </Canvas>
  )
}
