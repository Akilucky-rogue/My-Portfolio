import * as THREE from "three"
import { assetManager } from "@/lib/asset-manager"

// Create a simple cube mesh as a fallback
export function createFallbackCube(color = "#4169e1", size = 1): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(size, size, size)
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.3,
    metalness: 0.5,
  })
  return new THREE.Mesh(geometry, material)
}

// Create a simple sphere mesh as a fallback
export function createFallbackSphere(color = "#4169e1", size = 1): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(size, 32, 32)
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.3,
    metalness: 0.5,
  })
  return new THREE.Mesh(geometry, material)
}

// Check if a model is available, return the model or a fallback
export function getModelOrFallback(modelId: string, fallbackType: "cube" | "sphere" = "cube") {
  const model = assetManager.getAssetData(modelId)

  if (model) {
    return model
  }

  // Return appropriate fallback
  return fallbackType === "cube" ? createFallbackCube() : createFallbackSphere()
}

// Validate a loaded GLTF model to ensure it's usable
export function validateGLTF(gltf: any): boolean {
  if (!gltf) return false
  if (!gltf.scene) return false

  // Check if the scene has any children
  if (!gltf.scene.children || gltf.scene.children.length === 0) return false

  return true
}
