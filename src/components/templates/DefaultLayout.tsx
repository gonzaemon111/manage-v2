"use client";
import { ReactNode, useState } from "react";
import { Header } from "../organisms/Header";
import { Sidebar } from "../organisms/Sidebar";
import { SessionProvider, useSession } from "next-auth/react";

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data: session } = useSession();

  return (
    <SessionProvider>
      <Header
        sidebarOpen={sidebarOpen}
        handleSidebarOpen={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex h-[calc(100%-64px)]">
        <Sidebar sidebarOpen={sidebarOpen} />
        <main className="w-full bg-slate-100 dark:bg-slate-900">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
