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
  title: "Akshat Vora | 3D Interactive Portfolio",
  description:
    "Interactive 3D portfolio showcasing the work and skills of Akshat Vora, Computer Engineering student and developer",
  keywords: ["portfolio", "3D", "developer", "Akshat Vora", "web development", "interactive"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/fonts/SpaceGrotesk-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
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
