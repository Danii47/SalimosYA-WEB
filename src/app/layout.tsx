import type { Metadata } from "next"
import { Poppins, Lexend, Figtree } from "next/font/google"
import { AuthProvider } from "../context/AuthContext"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"], // puedes añadir los pesos que necesites
  variable: "--font-poppins",
})

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "600"], // puedes añadir los pesos que necesites
  variable: "--font-lexend",
})

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600"], // puedes añadir los pesos que necesites
  variable: "--font-figtree",
})

export const metadata: Metadata = {
  title: "SalimosYA",
  description: "Web de SalimosYA",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${lexend.variable} ${poppins.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
