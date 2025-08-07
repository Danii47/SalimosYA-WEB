"use client"

import { useRequireAuth } from "@/hooks/useRequiredAuth"
import { useAuth } from "@/context/AuthContext"
import Image from "next/image"
import LocalCard from "@/components/LocalCard"

const localData = {
  name: "Rose THE CLUB",
  description: "This is a description of the local.",
  address: "C/ Miguel Fernandez Alcauza Torres, 15",
  rate: 4.5,
  price: "10,00",
  distance: "501m",
  banner: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F978614183%2F2667098090281%2F1%2Foriginal.20250308-131417?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C99%2C1080%2C540&s=118c60bf13045414dfb0f197d0646c52",
  avatar: "https://media.discordapp.net/attachments/952540649322860584/1401705051046543421/459486322_739101345009792_8827784081967403956_n.jpg?ex=68948ace&is=6893394e&hm=94dd5a14c879bf9b354696571ad7a582215907496a55246bf30842e4861cbd65&=&format=webp&width=165&height=165",
  time: "22:00 - 05:30",
  assistants: 152,
  minAge: 18,
  dressCode: "Smart Casual",
}

export default function Dashboard() {
  const { logout } = useAuth()
  const { user, loading } = useRequireAuth()

  if (loading) return <p>Cargando...</p>

  const handleLogout = async () => {
    await logout()
  }

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
              alt={"Avatar de " + user.username}
              width={100}
              height={100}
              className="rounded-full"
            />
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <p>Contenido privado</p>
      <LocalCard local={localData} />
      <LocalCard local={localData} />
      <LocalCard local={localData} />
      <LocalCard local={localData} />
    </div>
  )
}
