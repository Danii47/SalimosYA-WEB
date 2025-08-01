"use client"

import { useCallback } from "react"
import { Capacitor } from "@capacitor/core"
import { Preferences } from "@capacitor/preferences"

export function useStorage() {
  const isNative = Capacitor.isNativePlatform()

  const setItem = useCallback(async (key: string, value: string) => {
    if (isNative) {
      await Preferences.set({ key, value })
    } else {
      localStorage.setItem(key, value)
    }
  }, [isNative])

  const getItem = useCallback(async (key: string): Promise<string | null> => {
    if (isNative) {
      const { value } = await Preferences.get({ key })
      return value
    } else {
      return localStorage.getItem(key)
    }
  }, [isNative])

  const removeItem = useCallback(async (key: string) => {
    if (isNative) {
      await Preferences.remove({ key })
    } else {
      localStorage.removeItem(key)
    }
  }, [isNative])

  const clear = useCallback(async () => {
    if (isNative) {
      await Preferences.clear()
    } else {
      localStorage.clear()
    }
  }, [isNative])

  return { setItem, getItem, removeItem, clear, isNative }
}