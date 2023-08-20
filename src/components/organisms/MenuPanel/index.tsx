import Link from "next/link";
import { ReactNode } from "react";

export type Menu = Readonly<{
  readonly name: string;
  readonly href: string;
  readonly icon: ReactNode;
}>;

interface Props {
  readonly menu: Menu;
}

export function MenuPanel({ menu }: Props) {
  return (
    <Link
      className="flex flex-col mx-auto bg-white hover:bg-zinc-50 dark:bg-slate-700 dark:hover:bg-slate-600 w-full p-4 hover:shadow-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
      href={menu.href}
    >
      {menu.icon}
      <span className="text-center">{menu.name}</span>
    </Link>
  );
}
