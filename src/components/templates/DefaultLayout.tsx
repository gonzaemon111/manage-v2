"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";
import { Header } from "../organisms/Header";
import { Sidebar } from "../organisms/Sidebar";

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data: session } = useSession();
  console.log("ClientSession");
  console.log(session);

  return (
    <>
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
    </>
  );
}
