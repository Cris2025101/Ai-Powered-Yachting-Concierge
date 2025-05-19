import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ClientWrapper } from "@/components/client-wrapper"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yaga AI Concierge",
  description: "Your personal AI yachting concierge",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground min-h-screen antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ClientWrapper>
            <main className="pt-0">{children}</main>
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
