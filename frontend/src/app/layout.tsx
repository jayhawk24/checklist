import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import localFont from 'next/font/local';
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Checklist ✅",
  description: "Get Check Done",
};

const gilroy = localFont({
  src: [
    {
      path: '../../public/fonts/Gilroy-Light.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gilroy-SemiBold.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gilroy-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    }
  ],
  variable: '--font-gilroy',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={gilroy.className}>
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
