import Link from "next/link";
import { ReactNode, ComponentPropsWithoutRef, forwardRef } from "react";

interface LinkProps {
  readonly name: string;
  readonly href: string;
  readonly icon?: ReactNode;
}

type Props = ComponentPropsWithoutRef<"button"> & {
  readonly name: string;
  readonly icon?: ReactNode;
  readonly onClick?: () => void;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ name, icon, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={
        props.disabled
          ? "text-white bg-slate-300 border-slate-500 opacity-95 font-medium text-sm px-10 py-2.5 text-center shadow-md inline-flex items-center gap-2 mr-2 mb-2"
          : "text-white bg-primary hover:bg-blue-500 opacity-95 hover:opacity-90 transition-all duration-200 transform focus:ring-4 focus:outline-none font-medium text-sm px-10 py-2.5 text-center shadow-md hover:shadow-xl inline-flex items-center gap-2 mr-2 mb-2"
      }
      {...props}
    >
      {icon}
      {name}
    </button>
  )
);

Button.displayName = "Button";

export function LinkButton({ name, icon, href }: LinkProps) {
  return (
    <Link
      href={href}
      className="text-white bg-primary hover:bg-blue-500 opacity-95 hover:opacity-90 transition-all duration-200 transform focus:ring-4 focus:outline-none font-medium text-sm px-10 py-2.5 text-center shadow-md hover:shadow-xl inline-flex items-center gap-2 mr-2 mb-2"
    >
      {icon}
      {name}
    </Link>
  );
}
