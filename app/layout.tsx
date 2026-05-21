import { Geist, Geist_Mono, Figtree } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", figtree.variable)}
    >
      <body>
        <ThemeProvider attribute={"class"}>{children}</ThemeProvider>
      </body>
    </html>
  )
}
