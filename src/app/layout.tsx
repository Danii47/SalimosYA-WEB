import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { AuthProvider } from "../context/AuthContext"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"], // puedes añadir los pesos que necesites
  variable: "--font-poppins",
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
        className={`${poppins.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
