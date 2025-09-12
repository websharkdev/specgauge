import type { Metadata } from "next";
import { Mona_Sans, Poppins } from "next/font/google";
import "./globals.css";
import GProvider from "@/components/providers/general.provider";
import { siteConfig } from "@/lib/config";

const monaSans = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  weight: ["500"], // Add desired weights
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['400', "500", "700"], // Add desired weights
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
        className={`${monaSans.variable} ${poppins.className} antialiased overflow-hidden`}
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
