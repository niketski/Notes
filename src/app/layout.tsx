import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Balthazar } from 'next/font/google';

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Notes",
  description: "Createed by nicodev",
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const balthazar = Balthazar({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-balthazar'
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.variable} ${balthazar.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
