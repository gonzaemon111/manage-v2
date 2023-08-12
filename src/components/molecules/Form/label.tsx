import { LabelHTMLAttributes, PropsWithChildren } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  readonly className?: string;
}

export function FormLabel({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <label className={`text-left md:text-right ${className}`} {...props}>
      {children}
    </label>
  );
}
