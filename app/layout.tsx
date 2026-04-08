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
  description: "International Conference on Engineering, Technology, Management, Social Sciences and Humanities 2026",
  icons: {
    icon: [
      { url: "https://icetmtshs.lincoln.edu.my/wp-content/uploads/2024/11/fab-150x150.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "https://icetmtshs.lincoln.edu.my/wp-content/uploads/2024/11/fab.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    apple: [
      { url: "https://icetmtshs.lincoln.edu.my/wp-content/uploads/2024/11/fab.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
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
      <body className="min-h-full flex flex-col">
          {children}
      </body>
    </html>
  );
}
