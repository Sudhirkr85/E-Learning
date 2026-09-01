import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CounselorModal } from "@/components/ui/CounselorModal";
import { StickyContactWidget } from "@/components/ui/StickyContactWidget";
import { EntryPopup } from "@/components/marketing/EntryPopup";

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
  title: "AI Training Institute Gurugram | Full Stack, Data Science, Cloud & IT Courses",
  description:
    "SSSAM Academy is the top AI & IT training institute in Sector 14 Gurugram offering Full Stack, Data Science, Cyber Security, Cloud, DevOps, and Digital Marketing courses with 100% placement support.",

  icons: {
    icon: "/favicon-v2.ico",
  },

  openGraph: {
    title: "AI Training Institute Gurugram | Full Stack, Data Science, Cloud & IT Courses",
    description:
      "SSSAM Academy is the top AI & IT training institute in Sector 14 Gurugram offering Full Stack, Data Science, Cyber Security, Cloud, DevOps, and Digital Marketing courses with 100% placement support.",
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
      "SSSAM Academy offers AI-first IT training in Gurugram with Full Stack, Data Science, Cyber Security, Cloud and Digital Marketing courses with placement support.",
    images: ["https://sssamacademy.tech/images/logo/logo.png"],
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
    >
      <body className="min-h-full flex flex-col">
        {children}
        <EntryPopup />
        <CounselorModal />
        <StickyContactWidget />
      </body>
    </html>
  );
}