import {ReactNode} from 'react'
import {Footer} from './ui/footer'
import {Header} from './ui/header'

type Props = {
  children: ReactNode
}

export const Layout = (props: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <main className="flex flex-1 flex-col flex-wrap">{props.children}</main>
      <Footer />
    </div>
  )
}
