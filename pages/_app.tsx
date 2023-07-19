import 'shared/styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'widgets/layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'shared/ui/toaster'

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </QueryClientProvider>
  )
}

export default App
