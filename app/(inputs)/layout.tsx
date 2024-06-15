interface InputLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: InputLayoutProps) {
  return (
    <main className="container flex min-h-screen items-center justify-center py-12">
      {children}
    </main>
  );
}
