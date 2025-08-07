import { useState, useEffect } from "react"
import { Capacitor } from "@capacitor/core"
import { Geolocation } from "@capacitor/geolocation"

type Position = {
  latitude: number
  longitude: number
}

type Status = "idle" | "loading" | "success" | "error"

export function useUserLocation() {
  const [location, setLocation] = useState<Position | null>(null)
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getLocation = async () => {
      setStatus("loading")

      try {
        if (Capacitor.isNativePlatform()) {
          const permission = await Geolocation.checkPermissions()
          if (permission.location === "denied") {
            await Geolocation.requestPermissions()
          }

          const coords = await Geolocation.getCurrentPosition()
          setLocation({
            latitude: coords.coords.latitude,
            longitude: coords.coords.longitude,
          })
        } else if (typeof navigator !== "undefined" && "geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              })
              setStatus("success")
            },
            (err) => {
              setError(err.message)
              setStatus("error")
            }
          )
          return
        } else {
          setError("Geolocation not available.")
          setStatus("error")
        }

        setStatus("success")
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Error while fetching location.")
        }
        setStatus("error")
      }
    }

    getLocation()
  }, [])

  return { location, status, error }
}
