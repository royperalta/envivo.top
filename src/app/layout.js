import { Inter,Roboto,Atma } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const roboto = Atma({subsets:['latin'],weight:'700'})

export const metadata = {
  title: 'Envivo.top ',
  description: 'Envivo.top',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
