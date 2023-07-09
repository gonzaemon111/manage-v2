import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

export function Container({ children }: Props) {
  return <div className="p-8">{children}</div>;
}
