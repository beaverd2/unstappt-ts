import 'shared/styles/globals.css'
import { Toaster } from 'shared/ui/toaster'
import { Layout } from 'widgets/layout'

export const metadata = {
  title: 'Unstappt',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
          <Toaster />
        </Layout>
      </body>
    </html>
  )
}
