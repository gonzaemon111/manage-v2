"use client";
import "./globals.css";
import { DefaultLayout } from "@/components/templates/DefaultLayout";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className + " h-screen w-screen"}>
        <SessionProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
