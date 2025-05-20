"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { assetManager, useAssetManager } from "@/lib/asset-manager"
import { Loader } from "@/components/loader"

interface AssetLoaderProps {
  children: React.ReactNode
}

export function AssetLoader({ children }: AssetLoaderProps) {
  const { progress, loaded, total, isComplete, errors } = useAssetManager()
  const [displayProgress, setDisplayProgress] = useState(0)
  const [canHide, setCanHide] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  // Smooth progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        const target = progress
        const increment = (target - prev) * 0.1
        return prev + (Math.abs(increment) < 0.001 ? target - prev : increment)
      })
    }, 16)

    return () => clearInterval(interval)
  }, [progress])

  // Handle minimum display time
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        setCanHide(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isComplete])

  // Hide loader when complete and min time passed
  useEffect(() => {
    if (isComplete && canHide) {
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isComplete, canHide])

  // Start loading when component mounts
  useEffect(() => {
    assetManager.startLoading()
  }, [])

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          >
            <div className="max-w-md w-full px-4">
              <h2 className="text-2xl font-bold gradient-text text-center mb-8">Loading portfolio...</h2>

              <div className="space-y-6">
                <div className="w-full h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${displayProgress * 100}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{Math.round(displayProgress * 100)}%</span>
                  <span>
                    {loaded} / {total} assets
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-muted-foreground">
                    {isComplete ? "Loading complete!" : "Loading resume content..."}
                  </p>
                </div>

                {errors.length > 0 && (
                  <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                    <p className="font-medium">Some assets failed to load:</p>
                    <ul className="list-disc list-inside mt-1">
                      {errors.slice(0, 3).map((error, index) => (
                        <li key={index}>{error.id}</li>
                      ))}
                      {errors.length > 3 && <li>...and {errors.length - 3} more</li>}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-12 flex justify-center">
                <Loader />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  )
}
