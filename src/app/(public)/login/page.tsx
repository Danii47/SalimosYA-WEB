"use client"

import { useAuth } from "../../../context/AuthContext"
import { useState } from "react"

export default function Login() {
  const { login, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await login({ email, password })

    if (error)
      setError(error)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xs mx-auto mt-10">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`p-2 rounded transition-all
            ${loading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Iniciar sesión
        </button>
        <div className="text-red-800">
          {error}
        </div>
      </form>
    </>
  )
}