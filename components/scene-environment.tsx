"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Environment, Sphere } from "@react-three/drei"
import { useEnvironment } from "@/contexts/environment-context"
import { usePreloadedAsset } from "@/hooks/use-preloaded-asset"
import * as THREE from "three"

export function SceneEnvironment() {
  const { currentEnvironment } = useEnvironment()
  const groupRef = useRef<THREE.Group>(null)

  // For custom environments, load the texture
  const assetId = currentEnvironment.url
    ? `env-${currentEnvironment.name.toLowerCase().replace(/\s+/g, "-")}`
    : undefined
  const { asset: customTexture, isLoaded } = usePreloadedAsset(assetId || "")

  // Rotate the environment if needed
  useFrame(() => {
    if (groupRef.current && currentEnvironment.rotation) {
      groupRef.current.rotation.y += currentEnvironment.rotation * 0.001
    }
  })

  // For abstract color-based environments
  if (currentEnvironment.type === "abstract" && currentEnvironment.color) {
    return (
      <group ref={groupRef}>
        {/* Create a colored environment */}
        <color attach="background" args={[currentEnvironment.color]} />
        <ambientLight intensity={currentEnvironment.intensity || 0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={currentEnvironment.intensity || 1}
          color={currentEnvironment.color}
        />

        {/* Add a large sphere for reflections */}
        {currentEnvironment.background && (
          <Sphere args={[100, 64, 64]} scale={[-1, 1, 1]}>
            <meshBasicMaterial color={currentEnvironment.color} side={THREE.BackSide} />
          </Sphere>
        )}
      </group>
    )
  }

  // For custom texture-based environments
  if (currentEnvironment.type === "custom" && currentEnvironment.url) {
    // If the asset is still loading or failed to load, use a fallback
    if (!isLoaded || !customTexture) {
      return (
        <group ref={groupRef}>
          <Environment
            preset="studio" // Fallback to a built-in preset
            background={currentEnvironment.background}
            blur={currentEnvironment.blur || 0.4}
          />
        </group>
      )
    }

    return (
      <group ref={groupRef}>
        <Environment
          background={currentEnvironment.background}
          blur={currentEnvironment.blur || 0.4}
          map={customTexture}
        />
      </group>
    )
  }

  // For built-in preset environments
  return (
    <group ref={groupRef}>
      <Environment
        preset={currentEnvironment.preset as any}
        background={currentEnvironment.background}
        blur={currentEnvironment.blur || 0.4}
      />
    </group>
  )
}
