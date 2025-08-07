"use client"

import { useRequireAuth } from "@/hooks/useRequiredAuth"
import dynamic from "next/dynamic"

// Importar el mapa de forma dinámica, solo en el cliente
const DynamicMap = dynamic(() => import("@/components/MapView"), {
  ssr: false, // Desactivar SSR para este componente
  loading: () => <div className="flex justify-center items-center h-[100vh]">Cargando mapa...</div>
})

export default function HomePage() {
const { user, loading } = useRequireAuth()

  if (loading) return <p>Cargando...</p>

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DynamicMap username={user?.username} />
    </div>
  )
}