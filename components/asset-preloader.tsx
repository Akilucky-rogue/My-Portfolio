"use client"

import type React from "react"

import { useEffect } from "react"
import { AssetLoader } from "@/components/asset-loader"
import { registerPortfolioAssets } from "@/lib/asset-registry"

interface AssetPreloaderProps {
  children: React.ReactNode
}

export function AssetPreloader({ children }: AssetPreloaderProps) {
  useEffect(() => {
    // Register all assets when component mounts
    registerPortfolioAssets()
  }, [])

  return <AssetLoader>{children}</AssetLoader>
}
