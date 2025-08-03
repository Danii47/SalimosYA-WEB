"use client"

import { useRequireAuth } from "@/hooks/useRequiredAuth"

export default function Dashboard() {
  const { /*user,*/ loading } = useRequireAuth()

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      HOLA
    </div>
  )
}
