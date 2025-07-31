"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useFetch } from "../hooks/useFetch"
import { BACKEND_URL } from "../../config"

interface User {
  id: string;
  username: string;
  realName: string;
  biography: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string, password: string }) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  doFetch: ReturnType<typeof useFetch>["doFetch"];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { doFetch } = useFetch()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verify = async () => {
      const { data, error } = await doFetch(`${BACKEND_URL}/api/auth/verify`)
      if (!error && data) {
        setUser(data.user)
      } else {
        setUser(null)
      }
      setLoading(false)
    }
    verify()
  }, [doFetch])

  const login = async (credentials: { email: string, password: string }) => {
    const { error } = await doFetch(`${BACKEND_URL}/api/auth/login`, "POST", credentials)
    if (!error) {
      const { error, data } = await doFetch(`${BACKEND_URL}/api/auth/verify`)
      if (!error && data) {
        setUser(data.user)
        router.push("/feed")
      } else {
        setUser(null)
      }
    }

    return { error }
  }

  const logout = async () => {
    await doFetch(`${BACKEND_URL}/api/auth/logout`, "POST")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, doFetch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
