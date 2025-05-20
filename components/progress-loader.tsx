"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function ProgressLoader() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 500) // Delay before hiding loader
          return 100
        }
        return prev + 5
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  if (isComplete) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="w-64 h-2 bg-secondary/30 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>
      <p className="text-lg font-medium text-foreground">Loading portfolio... {progress}%</p>
      <p className="text-sm text-muted-foreground mt-2">Preparing 3D elements and interactive content</p>
    </div>
  )
}
