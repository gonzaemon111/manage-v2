import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

export function Panel({ children }: Props) {
  return (
    <div className="p-8 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-50 shadow">
      {children}
    </div>
  );
}
