import { PropsWithChildren } from "react";

export function FormItem({
  className,
  children,
}: PropsWithChildren<{ readonly className?: string }>) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-5 gap-4 items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}
