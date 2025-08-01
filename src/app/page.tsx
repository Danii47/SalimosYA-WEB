"use client"

import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/feed")
      } else {
        router.replace("/login")
      }
    }
  }, [user, loading, router])

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>
  }

  return null
}