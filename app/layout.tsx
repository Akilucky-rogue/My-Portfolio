import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Use swap to prevent FOIT
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap", // Use swap to prevent FOIT
})

export const metadata: Metadata = {
  title: "Akshat Vora | Portfolio",
  description:
    "Interactive portfolio showcasing the work and skills of Akshat Vora, Computer Engineering student and developer",
  keywords: ["portfolio", "developer", "Akshat Vora", "web development", "interactive"],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div className="h-16 bg-background" />}>
            <Navigation />
          </Suspense>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
