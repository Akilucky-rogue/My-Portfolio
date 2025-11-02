import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata = {
  title: 'Akshat Vora — VC Analyst & Software Engineer',
  description: 'Venture Capital Analyst and Software Engineer passionate about technology and investing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable} font-sans bg-[var(--color-bg)] text-[var(--color-fg)]`}>
        {children}
      </body>
    </html>
  )
}
