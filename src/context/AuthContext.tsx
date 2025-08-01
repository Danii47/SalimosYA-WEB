"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useFetch } from "../hooks/useFetch"
import { BACKEND_URL } from "../../config"
import { useStorage } from "@/hooks/useStorage"

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
  const { setItem, getItem, removeItem, clear, isNative } = useStorage()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verify = async () => {
      if (isNative) {
        const savedUser = await getItem("user")

        if (savedUser) {
          try {
            const userData = JSON.parse(savedUser)
            setUser(userData)
          } catch {
            await removeItem("user")
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } else {
        const { data, error } = await doFetch(`${BACKEND_URL}/auth/verify`)
        if (!error && data) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      }
      setLoading(false)
    }
    verify()
  }, [doFetch, isNative, getItem, removeItem])

  const login = async (credentials: { email: string, password: string }) => {
    const { error, data } = await doFetch(`${BACKEND_URL}/auth/login`, "POST", credentials)
    if (!error && data) {
      setUser(data.user)

      if (isNative) {
        await setItem("user", JSON.stringify(data.user))
      }

      router.push("/feed")
      return { error: null }
    }

    return { error: error || "Error de autenticación" }
  }

  const logout = async () => {
    await doFetch(`${BACKEND_URL}/auth/logout`, "POST")

    if (isNative) {
      await clear()
    }

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
