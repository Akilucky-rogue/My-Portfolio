"use client"

import { useState, useEffect } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextureLoader, AudioLoader } from "three"

// Asset types
export type AssetType = "image" | "document" | "json" | "font" | "other"

// Asset priority
export type AssetPriority = "critical" | "high" | "medium" | "low"

// Asset status
export type AssetStatus = "pending" | "loading" | "loaded" | "error"

// Asset definition
export interface Asset {
  id: string
  url: string
  type: AssetType
  priority: AssetPriority
  status: AssetStatus
  data?: any
  error?: Error
  dependencies?: string[]
  retryCount?: number
  lastRetry?: number
}

// Asset manager class
class AssetManager {
  private assets: Map<string, Asset> = new Map()
  private loadingQueue: string[] = []
  private isLoading = false
  private maxConcurrentLoads = 5
  private currentLoads = 0
  private listeners: Set<(progress: number, loaded: number, total: number) => void> = new Set()
  private errorListeners: Set<(assetId: string, error: Error) => void> = new Set()
  private completeListeners: Set<() => void> = new Set()
  private maxRetries = 3
  private retryDelay = 2000 // 2 seconds

  // Loaders
  private gltfLoader: GLTFLoader
  private textureLoader: TextureLoader
  private audioLoader: AudioLoader
  private fontLoader: FontLoader
  private dracoLoader: DRACOLoader

  constructor() {
    // Initialize loaders
    this.dracoLoader = new DRACOLoader()
    // Use the official Draco decoder from Google CDN
    this.dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/")
    this.dracoLoader.setDecoderConfig({ type: "js" }) // Use JS decoder for better compatibility

    this.gltfLoader = new GLTFLoader()
    this.gltfLoader.setDRACOLoader(this.dracoLoader)

    this.textureLoader = new TextureLoader()
    this.audioLoader = new AudioLoader()
    this.fontLoader = new FontLoader()
  }

  // Register an asset to be loaded
  registerAsset(
    id: string,
    url: string,
    type: AssetType,
    priority: AssetPriority = "medium",
    dependencies: string[] = [],
  ): void {
    if (this.assets.has(id)) {
      console.warn(`Asset with id ${id} already registered`)
      return
    }

    this.assets.set(id, {
      id,
      url,
      type,
      priority,
      status: "pending",
      dependencies,
      retryCount: 0,
    })

    // Add to loading queue based on priority
    this.addToLoadingQueue(id)
  }

  // Register multiple assets at once
  registerAssets(
    assets: { id: string; url: string; type: AssetType; priority?: AssetPriority; dependencies?: string[] }[],
  ): void {
    assets.forEach((asset) => {
      this.registerAsset(asset.id, asset.url, asset.type, asset.priority, asset.dependencies)
    })
  }

  // Add asset to loading queue based on priority
  private addToLoadingQueue(id: string): void {
    const asset = this.assets.get(id)
    if (!asset) return

    // Remove if already in queue
    this.loadingQueue = this.loadingQueue.filter((queuedId) => queuedId !== id)

    // Add based on priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    const position = this.loadingQueue.findIndex((queuedId) => {
      const queuedAsset = this.assets.get(queuedId)
      return queuedAsset && priorityOrder[queuedAsset.priority] > priorityOrder[asset.priority]
    })

    if (position === -1) {
      this.loadingQueue.push(id)
    } else {
      this.loadingQueue.splice(position, 0, id)
    }
  }

  // Start loading all registered assets
  startLoading(): void {
    if (this.isLoading) return
    this.isLoading = true
    this.processQueue()
  }

  // Process the loading queue
  private processQueue(): void {
    if (this.loadingQueue.length === 0) {
      if (this.currentLoads === 0) {
        this.isLoading = false
        this.notifyComplete()
      }
      return
    }

    // Load up to maxConcurrentLoads assets
    while (this.loadingQueue.length > 0 && this.currentLoads < this.maxConcurrentLoads) {
      const assetId = this.loadingQueue.shift()
      if (!assetId) continue

      const asset = this.assets.get(assetId)
      if (!asset) continue

      // Check if dependencies are loaded
      const dependenciesLoaded =
        !asset.dependencies ||
        asset.dependencies.every((depId) => {
          const dep = this.assets.get(depId)
          return dep && dep.status === "loaded"
        })

      if (!dependenciesLoaded) {
        // Put back at the end of the queue
        this.loadingQueue.push(assetId)
        continue
      }

      this.loadAsset(asset)
    }
  }

  // Load a single asset
  private loadAsset(asset: Asset): void {
    this.currentLoads++
    asset.status = "loading"
    this.notifyProgress()

    switch (asset.type) {
      case "image":
        this.loadImage(asset)
        break
      case "json":
        this.loadJSON(asset)
        break
      case "document":
        this.loadDocument(asset)
        break
      case "font":
        this.loadFont(asset)
        break
      case "other":
        this.loadOther(asset)
        break
      default:
        this.handleAssetError(asset, new Error(`Unknown asset type: ${asset.type}`))
    }
  }

  // Load an image
  private loadImage(asset: Asset): void {
    const image = new Image()
    image.crossOrigin = "anonymous"

    image.onload = () => {
      this.handleAssetLoaded(asset, image)
    }

    image.onerror = (error) => {
      this.handleAssetError(asset, new Error(`Failed to load image: ${asset.url}`))
    }

    image.src = asset.url
  }

  // Load JSON data
  private loadJSON(asset: Asset): void {
    fetch(asset.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        this.handleAssetLoaded(asset, data)
      })
      .catch((error) => {
        this.handleAssetError(asset, error)
      })
  }

  // Load a document (HTML, text, etc.)
  private loadDocument(asset: Asset): void {
    fetch(asset.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.text()
      })
      .then((data) => {
        this.handleAssetLoaded(asset, data)
      })
      .catch((error) => {
        this.handleAssetError(asset, error)
      })
  }

  // Load a font
  private loadFont(asset: Asset): void {
    const fontFace = new FontFace(asset.id, `url(${asset.url})`)

    fontFace
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont)
        this.handleAssetLoaded(asset, loadedFont)
      })
      .catch((error) => {
        this.handleAssetError(asset, error)
      })
  }

  // Load other types of assets
  private loadOther(asset: Asset): void {
    fetch(asset.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.blob()
      })
      .then((data) => {
        this.handleAssetLoaded(asset, data)
      })
      .catch((error) => {
        this.handleAssetError(asset, error)
      })
  }

  // Add cache-busting parameter to URL
  private addCacheBustingParam(url: string): string {
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}v=${Date.now()}`
  }

  // Handle successful asset loading
  private handleAssetLoaded(asset: Asset, data: any): void {
    asset.status = "loaded"
    asset.data = data
    asset.retryCount = 0 // Reset retry count on success
    this.currentLoads--
    this.notifyProgress()
    this.processQueue()
  }

  // Handle asset loading progress
  private handleAssetProgress(asset: Asset, progress: ProgressEvent): void {
    // We could track individual asset progress here if needed
    this.notifyProgress()
  }

  // Handle asset loading error
  private handleAssetError(asset: Asset, error: Error): void {
    console.error(`Error loading asset ${asset.id} (${asset.url}):`, error)

    // Check if we should retry
    if ((asset.retryCount || 0) < this.maxRetries) {
      asset.retryCount = (asset.retryCount || 0) + 1
      asset.lastRetry = Date.now()
      asset.status = "retrying"

      console.log(`Retrying asset ${asset.id} (attempt ${asset.retryCount} of ${this.maxRetries})...`)

      // Add back to queue after delay
      setTimeout(() => {
        this.currentLoads--
        this.addToLoadingQueue(asset.id)
        this.processQueue()
      }, this.retryDelay)
    } else {
      // Max retries reached, mark as error
      asset.status = "error"
      asset.error = error
      this.currentLoads--
      this.notifyError(asset.id, error)
      this.notifyProgress()
      this.processQueue()
    }
  }

  // Get an asset by id
  getAsset(id: string): Asset | undefined {
    return this.assets.get(id)
  }

  // Get asset data by id
  getAssetData<T>(id: string): T | undefined {
    const asset = this.assets.get(id)
    return asset?.data as T | undefined
  }

  // Check if all assets are loaded
  areAllAssetsLoaded(): boolean {
    return Array.from(this.assets.values()).every((asset) => asset.status === "loaded" || asset.status === "error")
  }

  // Get loading progress (0-1)
  getProgress(): { progress: number; loaded: number; total: number } {
    const total = this.assets.size
    const loaded = Array.from(this.assets.values()).filter(
      (asset) => asset.status === "loaded" || asset.status === "error",
    ).length
    const progress = total > 0 ? loaded / total : 1

    return { progress, loaded, total }
  }

  // Add a progress listener
  addProgressListener(callback: (progress: number, loaded: number, total: number) => void): () => void {
    this.listeners.add(callback)
    // Return a function to remove the listener
    return () => {
      this.listeners.delete(callback)
    }
  }

  // Add an error listener
  addErrorListener(callback: (assetId: string, error: Error) => void): () => void {
    this.errorListeners.add(callback)
    return () => {
      this.errorListeners.delete(callback)
    }
  }

  // Add a complete listener
  addCompleteListener(callback: () => void): () => void {
    this.completeListeners.add(callback)
    return () => {
      this.completeListeners.delete(callback)
    }
  }

  // Notify progress listeners
  private notifyProgress(): void {
    const { progress, loaded, total } = this.getProgress()
    this.listeners.forEach((listener) => listener(progress, loaded, total))
  }

  // Notify error listeners
  private notifyError(assetId: string, error: Error): void {
    this.errorListeners.forEach((listener) => listener(assetId, error))
  }

  // Notify complete listeners
  private notifyComplete(): void {
    this.completeListeners.forEach((listener) => listener())
  }

  // Reset the asset manager
  reset(): void {
    this.assets.clear()
    this.loadingQueue = []
    this.isLoading = false
    this.currentLoads = 0
  }
}

// Create a singleton instance
export const assetManager = new AssetManager()

// React hook for using the asset manager
export function useAssetManager() {
  const [progress, setProgress] = useState(assetManager.getProgress())
  const [isComplete, setIsComplete] = useState(assetManager.areAllAssetsLoaded())
  const [errors, setErrors] = useState<{ id: string; error: Error }[]>([])

  useEffect(() => {
    const progressRemover = assetManager.addProgressListener((progress, loaded, total) => {
      setProgress({ progress, loaded, total })
    })

    const errorRemover = assetManager.addErrorListener((assetId, error) => {
      setErrors((prev) => [...prev, { id: assetId, error }])
    })

    const completeRemover = assetManager.addCompleteListener(() => {
      setIsComplete(true)
    })

    return () => {
      progressRemover()
      errorRemover()
      completeRemover()
    }
  }, [])

  return {
    progress: progress.progress,
    loaded: progress.loaded,
    total: progress.total,
    isComplete,
    errors,
    getAsset: assetManager.getAsset.bind(assetManager),
    getAssetData: assetManager.getAssetData.bind(assetManager),
  }
}
