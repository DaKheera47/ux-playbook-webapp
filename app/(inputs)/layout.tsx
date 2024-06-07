interface InputLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: InputLayoutProps) {
  return (
    <main className="container">
      <h1>from layout</h1>

      {children}
    </main>
  )
}
