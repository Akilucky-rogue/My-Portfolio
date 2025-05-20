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

  // Register fonts
  assetManager.registerAssets([
    {
      id: "space-grotesk-bold",
      url: "/fonts/SpaceGrotesk-Bold.ttf",
      type: "font",
      priority: "critical",
    },
    {
      id: "space-grotesk-regular",
      url: "/fonts/SpaceGrotesk-Regular.ttf",
      type: "font",
      priority: "critical",
    },
  ])
}
