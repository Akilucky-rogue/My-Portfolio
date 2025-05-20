"use client"

import { useState, useEffect } from "react"
import { assetManager } from "@/lib/asset-manager"

export function usePreloadedAsset<T>(assetId: string) {
  const [asset, setAsset] = useState<T | undefined>(assetManager.getAssetData<T>(assetId))
  const [isLoaded, setIsLoaded] = useState(!!asset)
  const [error, setError] = useState<Error | undefined>(undefined)

  useEffect(() => {
    // If already loaded, nothing to do
    if (asset) return

    // Check if asset exists
    const registeredAsset = assetManager.getAsset(assetId)
    if (!registeredAsset) {
      setError(new Error(`Asset with id ${assetId} not found`))
      return
    }

    // If asset is already loaded, set it
    if (registeredAsset.status === "loaded") {
      setAsset(registeredAsset.data as T)
      setIsLoaded(true)
      return
    }

    // If asset has an error, set it
    if (registeredAsset.status === "error" && registeredAsset.error) {
      setError(registeredAsset.error)
      return
    }

    // Otherwise, wait for it to load
    const progressRemover = assetManager.addProgressListener(() => {
      const updatedAsset = assetManager.getAsset(assetId)
      if (updatedAsset?.status === "loaded") {
        setAsset(updatedAsset.data as T)
        setIsLoaded(true)
      } else if (updatedAsset?.status === "error" && updatedAsset.error) {
        setError(updatedAsset.error)
      }
    })

    return progressRemover
  }, [assetId, asset])

  return { asset, isLoaded, error }
}
