import { assetManager } from "@/lib/asset-manager"

// Define all assets to preload here
export function registerPortfolioAssets() {
  // Register images
  assetManager.registerAssets([
    {
      id: "profile-image",
      url: "/images/profile.jpg",
      type: "image",
      priority: "high",
    },
    {
      id: "hero-background",
      url: "/images/hero-bg.jpg",
      type: "image",
      priority: "high",
    },
  ])

  // Register resume data
  assetManager.registerAssets([
    {
      id: "resume-data",
      url: "/data/resume.json",
      type: "json",
      priority: "critical",
    },
  ])

  // Removed font loading since fonts are loaded via next/font/google in layout.tsx
}
