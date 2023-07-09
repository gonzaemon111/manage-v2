import NextLink from "next/link";
import { ReactNode } from "react";

interface Props {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
}

export function Link({ href, children, className }: Props) {
  return (
    <NextLink
      href={href}
      className={`text-sky-500 transition-colors duration-200 transform hover:text-sky-600 dark:hover:text-sky-300 hover:underline ${className}`}
    >
      {children}
    </NextLink>
  );
}
