"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { DefaultLayout } from "@/components/templates/DefaultLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={"h-screen w-screen"}>
        <SessionProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
