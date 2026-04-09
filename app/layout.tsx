import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICETMTSHS 2026",
  description:
    "International Conference on Engineering, Technology, Management, Social Sciences and Humanities 2026",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/*
        Preconnect to the WordPress media server so DNS resolution + TCP + TLS
        handshake are done before any image or video requests hit the wire.
        This shaves ~200–400 ms off first external-image load on cold connections.
      */}
      <head>
        <link rel="preconnect" href="https://icetmtshs.lincoln.edu.my" />
        <link rel="dns-prefetch" href="https://icetmtshs.lincoln.edu.my" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
