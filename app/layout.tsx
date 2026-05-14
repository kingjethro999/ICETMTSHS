import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ICSHSM 2026",
  description:
    "1st International Conference on Sustainable Healthcare and Health Systems Management (ICSHSM) 2026",
  // Use the local favicon.ico that already exists in /app — eliminates
  // two remote HTTP round-trips to the slow WordPress server on every page load.
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/*
        Preconnect to the WordPress media server so DNS resolution + TCP + TLS
        handshake are done before any image or video requests hit the wire.
        This shaves ~200–400 ms off first external-image load on cold connections.
      */}
      <head>{/* Preconnect to media origins if needed */}</head>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
