import type { Metadata } from "next";
import { Inter, Balthazar } from 'next/font/google';
import Providers from "@/components/providers";

import "./globals.css";

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
    <Providers>
      <html lang="en">
        <body
          className={`antialiased ${inter.variable} ${balthazar.variable} font-inter text-[16px] leading-[24px] text-dark bg-main`}
        >
          {children}
        </body>
      </html>
    </Providers>
  );
}
