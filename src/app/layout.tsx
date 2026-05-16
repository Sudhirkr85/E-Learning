import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
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
  metadataBase: new URL("https://sssamacademy.tech"),
  title: "AI Training Institute Gurugram | Full Stack & Data Science",
  description:
    "SSSAM Academy offers AI-first IT training in Gurugram with Full Stack, Data Science, Cyber Security and Digital Marketing courses and placement support.",

  icons: {
    icon: "/favicon-v2.ico",
  },

  openGraph: {
    title: "AI Training Institute Gurugram | Full Stack & Data Science",
    description:
      "SSSAM Academy offers AI-first IT training in Gurugram with Full Stack, Data Science, Cyber Security and Digital Marketing courses and placement support.",
    type: "website",
    url: "https://sssamacademy.tech",
    siteName: "SSSAM Academy",
    locale: "en_IN",
    images: [
      {
        url: "https://sssamacademy.tech/images/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "SSSAM Academy AI Training Institute Gurugram",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Training Institute Gurugram | Full Stack & Data Science",
    description:
      "SSSAM Academy offers AI-first IT training in Gurugram with Full Stack, Data Science, Cyber Security and Digital Marketing courses and placement support.",
    images: ["https://sssamacademy.tech/images/logo/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}