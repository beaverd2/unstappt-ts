import '@/styles/globals.css'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export const metadata = {
  title: 'Unstappt',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col bg-gray-100">
          <Header />
          <main className="container mx-auto mt-4 flex flex-1 flex-col items-center gap-4 px-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
