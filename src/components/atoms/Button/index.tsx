import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  readonly name: string;
  readonly icon?: ReactNode;
  readonly onClick?: () => void;
}

interface LinkProps {
  readonly name: string;
  readonly href: string;
  readonly icon?: ReactNode;
}

export function Button({ name, icon, onClick }: Props) {
  return (
    <button
      type="button"
      className="text-white bg-primary hover:bg-blue-500 opacity-95 hover:opacity-90 transition-all duration-200 transform focus:ring-4 focus:outline-none font-medium text-sm px-10 py-2.5 text-center shadow-md hover:shadow-xl inline-flex items-center gap-2 mr-2 mb-2"
      onClick={onClick}
    >
      {icon}
      {name}
    </button>
  );
}

export function LinkButton({ name, icon, href }: LinkProps) {
  return (
    <Link
      href={href}
      className="text-white bg-primary hover:bg-blue-500 opacity-95 hover:opacity-90 transition-all duration-200 transform focus:ring-4 focus:outline-none font-medium text-sm px-10 py-2.5 text-center shadow-md hover:shadow-xl inline-flex items-center mr-2 mb-2"
    >
      {icon}
      {name}
    </Link>
  );
}
