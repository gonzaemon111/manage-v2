import { forwardRef, ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"textarea">;

export const FormTextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={`col-span-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none focus:ring-offset-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
      {...props}
    ></textarea>
  )
);

FormTextArea.displayName = "FormTextArea";
