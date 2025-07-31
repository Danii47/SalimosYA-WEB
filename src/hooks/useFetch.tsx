import { useCallback, useState } from "react"

type METHOD = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

export function useFetch() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const doFetch = useCallback(async (url: RequestInfo | URL, method: METHOD = "GET", data = {}) => {
    alert(url)
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: method !== "GET" ? JSON.stringify(data) : null
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error en la petición")
      }

      const json = await response.json().catch(() => null)
      setData(json)

      return { data: json, error: null }
    } catch (err) {
      alert(err)
      if (err instanceof Error) {
        setError(err.message)
        return { data: null, error: err.message }
      } else {
        setError("Unknown error occurred")
        return { data: null, error: "Unknown error occurred" }
      }
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, doFetch }
}
