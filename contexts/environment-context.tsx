"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { assetManager } from "@/lib/asset-manager"

// Environment preset types
export type EnvironmentPresetType = "studio" | "natural" | "urban" | "abstract" | "custom"

// Built-in preset names from drei
export type BuiltInPresetName =
  | "sunset"
  | "dawn"
  | "night"
  | "warehouse"
  | "forest"
  | "apartment"
  | "studio"
  | "city"
  | "park"
  | "lobby"

// Custom environment configuration
export interface EnvironmentConfig {
  name: string
  type: EnvironmentPresetType
  preset?: BuiltInPresetName
  url?: string
  intensity?: number
  rotation?: number
  blur?: number
  background?: boolean
  color?: string
}

// Default environment presets
export const environmentPresets: EnvironmentConfig[] = [
  // Studio environments
  {
    name: "Clean Studio",
    type: "studio",
    preset: "studio",
    intensity: 1,
    rotation: 0,
    blur: 0.4,
    background: false,
  },
  {
    name: "Soft Studio",
    type: "studio",
    preset: "studio",
    intensity: 0.6,
    rotation: 0,
    blur: 0.8,
    background: false,
  },
  {
    name: "Bright Studio",
    type: "studio",
    preset: "studio",
    intensity: 1.5,
    rotation: 0,
    blur: 0.2,
    background: false,
  },

  // Natural environments
  {
    name: "Sunset",
    type: "natural",
    preset: "sunset",
    intensity: 1,
    rotation: 0,
    blur: 0.4,
    background: true,
  },
  {
    name: "Forest",
    type: "natural",
    preset: "forest",
    intensity: 0.8,
    rotation: 0,
    blur: 0.5,
    background: true,
  },
  {
    name: "Dawn",
    type: "natural",
    preset: "dawn",
    intensity: 1.2,
    rotation: 0,
    blur: 0.3,
    background: true,
  },
  {
    name: "Night",
    type: "natural",
    preset: "night",
    intensity: 0.7,
    rotation: 0,
    blur: 0.6,
    background: true,
  },

  // Urban environments
  {
    name: "City",
    type: "urban",
    preset: "city",
    intensity: 1,
    rotation: 0,
    blur: 0.4,
    background: true,
  },
  {
    name: "Apartment",
    type: "urban",
    preset: "apartment",
    intensity: 0.9,
    rotation: 0,
    blur: 0.5,
    background: false,
  },
  {
    name: "Warehouse",
    type: "urban",
    preset: "warehouse",
    intensity: 0.8,
    rotation: 0,
    blur: 0.6,
    background: false,
  },
  {
    name: "Lobby",
    type: "urban",
    preset: "lobby",
    intensity: 1.1,
    rotation: 0,
    blur: 0.3,
    background: false,
  },

  // Abstract environments
  {
    name: "Blue Gradient",
    type: "abstract",
    color: "#4169e1",
    intensity: 1,
    rotation: 0,
    blur: 0.4,
    background: true,
  },
  {
    name: "Purple Gradient",
    type: "abstract",
    color: "#9c27b0",
    intensity: 1,
    rotation: 0,
    blur: 0.4,
    background: true,
  },
  {
    name: "Dark Minimal",
    type: "abstract",
    color: "#121212",
    intensity: 0.5,
    rotation: 0,
    blur: 0.8,
    background: true,
  },

  // Custom environments - commented out until assets are available
  /*
  {
    name: "Custom Environment 1",
    type: "custom",
    url: "/assets/environments/env1.jpg",
    intensity: 1,
    rotation: 0,
    blur: 0.4,
    background: true,
  },
  */
]

// Environment context type
interface EnvironmentContextType {
  currentEnvironment: EnvironmentConfig
  setEnvironment: (environment: EnvironmentConfig | string) => void
  environments: EnvironmentConfig[]
  updateEnvironmentSetting: (setting: Partial<EnvironmentConfig>) => void
}

// Create context with default values
const EnvironmentContext = createContext<EnvironmentContextType>({
  currentEnvironment: environmentPresets[0],
  setEnvironment: () => {},
  environments: environmentPresets,
  updateEnvironmentSetting: () => {},
})

// Environment provider props
interface EnvironmentProviderProps {
  children: ReactNode
  defaultEnvironment?: string | EnvironmentConfig
}

// Environment provider component
export function EnvironmentProvider({ children, defaultEnvironment = "Clean Studio" }: EnvironmentProviderProps) {
  const [environments, setEnvironments] = useState<EnvironmentConfig[]>(environmentPresets)
  const [currentEnvironment, setCurrentEnvironment] = useState<EnvironmentConfig>(environmentPresets[0])

  // Initialize with default environment
  useEffect(() => {
    if (typeof defaultEnvironment === "string") {
      const foundEnvironment = environments.find((env) => env.name === defaultEnvironment)
      if (foundEnvironment) {
        setCurrentEnvironment(foundEnvironment)
      }
    } else {
      setCurrentEnvironment(defaultEnvironment)
    }
  }, [defaultEnvironment, environments])

  // Preload custom environment textures
  useEffect(() => {
    // Only attempt to preload custom environments if they have valid URLs
    const customEnvironments = environments.filter(
      (env) => env.type === "custom" && env.url && typeof env.url === "string" && env.url.trim() !== "",
    )

    if (customEnvironments.length > 0) {
      customEnvironments.forEach((env) => {
        if (env.url) {
          const assetId = `env-${env.name.toLowerCase().replace(/\s+/g, "-")}`
          console.log(`Registering custom environment: ${assetId} -> ${env.url}`)
          assetManager.registerAsset(assetId, env.url, "environment", "low")
        }
      })

      assetManager.startLoading()
    }
  }, [environments])

  // Set environment by name or config
  const setEnvironment = (environment: EnvironmentConfig | string) => {
    if (typeof environment === "string") {
      const foundEnvironment = environments.find((env) => env.name === environment)
      if (foundEnvironment) {
        setCurrentEnvironment(foundEnvironment)
      }
    } else {
      setCurrentEnvironment(environment)
    }
  }

  // Update current environment settings
  const updateEnvironmentSetting = (setting: Partial<EnvironmentConfig>) => {
    setCurrentEnvironment((prev) => ({
      ...prev,
      ...setting,
    }))
  }

  return (
    <EnvironmentContext.Provider
      value={{
        currentEnvironment,
        setEnvironment,
        environments,
        updateEnvironmentSetting,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  )
}

// Hook to use environment context
export function useEnvironment() {
  const context = useContext(EnvironmentContext)
  if (context === undefined) {
    throw new Error("useEnvironment must be used within an EnvironmentProvider")
  }
  return context
}
