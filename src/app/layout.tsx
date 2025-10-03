import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/navigation";
import { ToastProvider } from "@/components/ui/toast-context";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Infinipics - Premium AI-Generated Aesthetic Photos Platform",
  description: "Where Every Pixel Tells a Story. Futuristic, minimalist, dark-themed platform with endless high-quality AI photos.",
  keywords: "AI, photos, aesthetic, infinite, premium, dark theme, neon, gradient",
  authors: [{ name: "Infinipics Team" }],
  openGraph: {
    title: "Infinipics - Where Every Pixel Tells a Story",
    description: "Futuristic, minimalist, dark-themed platform with endless high-quality AI photos",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-gradient-to-br from-gray-900 to-black text-gray-100 min-h-screen pb-16`}
      >
        <ToastProvider>
          <main className="container mx-auto">
            {children}
          </main>
          <Navigation />
        </ToastProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}