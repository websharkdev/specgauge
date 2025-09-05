import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import GProvider from "@/components/providers/general.provider";
import { siteConfig } from "@/lib/config";

const monaSans = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
});

export const metadata: Metadata = siteConfig

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      suppressHydrationWarning
      suppressContentEditableWarning>
      <body
        className={`${monaSans.className} antialiased`}
        suppressHydrationWarning
        suppressContentEditableWarning
      >
        <GProvider>
          {children}
        </GProvider>
      </body>
    </html>
  );
}
