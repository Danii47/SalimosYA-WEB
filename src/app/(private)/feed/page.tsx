"use client"

import { useRequireAuth } from "../../../hooks/useRequiredAuth"
import Image from "next/image"

export default function Dashboard() {
  const { user, loading } = useRequireAuth()

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      <h1>Bienvenido {user?.id}</h1>
      {user && (
        <>
          <p>Nombre: {user.realName}</p>
          <p>Nombre: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Biografía: {user.biography}</p>
          {/* {user.avatar && <img src={user.avatar} alt="Avatar" />} */}
          {user.avatar && (
            <Image
              src={user.avatar}
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-full"
            />
          )}
        </>
      )}
      <p>Contenido privado</p>
    </div>
  )
}
