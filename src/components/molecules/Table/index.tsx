import { PropsWithChildren } from "react";

interface Props {
  readonly className?: string;
}

export function Table({ className, children }: PropsWithChildren<Props>) {
  return (
    <div className="relative overflow-x-auto shadow-md">
      <table
        className={`w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-slate-300 dark:border-slate-600 ${className}`}
      >
        {children}
      </table>
    </div>
  );
}

export function Thead({ className, children }: PropsWithChildren<Props>) {
  return (
    <thead
      className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ${className}`}
    >
      {children}
    </thead>
  );
}

export function Tbody({ className, children }: PropsWithChildren<Props>) {
  return <tbody className={`${className}`}>{children}</tbody>;
}

export function Tr({ className, children }: PropsWithChildren<Props>) {
  return <tr className={`${className}`}>{children}</tr>;
}

interface ThProps {
  readonly className?: string;
  readonly scope?: string;
}

export function Th({ className, scope, children }: PropsWithChildren<ThProps>) {
  return (
    <th scope={scope} className={`${className}`}>
      {children}
    </th>
  );
}

export function Td({ className, children }: PropsWithChildren<Props>) {
  return <td className={`px-6 py-4 ${className}`}>{children}</td>;
}
