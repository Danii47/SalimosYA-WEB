import Link from "next/link"
export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Link href="/feed">Feed</Link>
        <Link href="/search">Buscar</Link>
        <Link href="/profile">Perfil</Link>
        {/* Enlazar a logout mediante onClick en AuthProvider */}
      </nav>
      {children}
    </>
  )
}