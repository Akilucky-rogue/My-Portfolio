// This file ensures we only have one instance of Three.js
import * as THREE from "three"

// Export the singleton instance
export { THREE }

// Also export commonly used Three.js classes and utilities
export const {
  Vector2,
  Vector3,
  Color,
  Mesh,
  MeshStandardMaterial,
  BoxGeometry,
  SphereGeometry,
  DirectionalLight,
  AmbientLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  Raycaster,
  MathUtils,
  BufferGeometry,
  BufferAttribute,
  Group,
  Object3D,
  Quaternion,
  Euler,
  Matrix4,
  TextureLoader,
  AudioLoader,
} = THREE

// Export loaders from examples
export { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
export { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
export { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
// Removed RGBELoader import
