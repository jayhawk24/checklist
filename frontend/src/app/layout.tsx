import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import localFont from 'next/font/local';
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/commons/sidebar";

export const metadata: Metadata = {
  title: "Ticklist ✅",
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
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body className={cn(`min-h-screen bg-background ${gilroy.className}`)}>
          <Sidebar
          >
            {children}
          </Sidebar>
          <Toaster position="bottom-right" />
        </body>
      </Providers>
    </html>
  );
}
