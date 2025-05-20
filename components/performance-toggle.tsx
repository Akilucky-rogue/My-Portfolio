"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

export function PerformanceToggle() {
  const [isLightMode, setIsLightMode] = useState(false)

  useEffect(() => {
    // Check if user previously selected light mode
    const savedMode = localStorage.getItem("performance-mode")
    if (savedMode === "light") {
      setIsLightMode(true)
      document.documentElement.classList.add("light-performance")
    }
  }, [])

  const togglePerformanceMode = () => {
    const newMode = !isLightMode
    setIsLightMode(newMode)

    if (newMode) {
      document.documentElement.classList.add("light-performance")
      localStorage.setItem("performance-mode", "light")
    } else {
      document.documentElement.classList.remove("light-performance")
      localStorage.setItem("performance-mode", "full")
    }

    // Reload to apply changes
    window.location.reload()
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={togglePerformanceMode}
      className="fixed bottom-4 right-4 z-50 bg-background/80 backdrop-blur-sm"
    >
      <Zap className="mr-2 h-4 w-4" />
      {isLightMode ? "Enable 3D Mode" : "Lite Mode"}
    </Button>
  )
}
