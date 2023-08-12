import { FormEventHandler, PropsWithChildren } from "react";

interface Props {
  readonly className?: string;
  readonly onSubmit?: FormEventHandler<HTMLFormElement>;
}

export function Form({
  className,
  onSubmit,
  children,
}: PropsWithChildren<Props>) {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col space-y-4 ${className}`}
    >
      {children}
    </form>
  );
}
