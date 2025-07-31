"use client"

import { useRequireAuth } from "../../../hooks/useRequiredAuth"

export default function Dashboard() {
  const { user, loading } = useRequireAuth()

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      <h1>Bienvenido {user?.id}</h1>
 
      <p>Contenido privado PROFILE</p>
    </div>
  )
}
