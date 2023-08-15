import { ComponentPropsWithoutRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type Props = ComponentPropsWithoutRef<"input"> & {
  readonly error?: FieldError;
};

export const FormTextInput = forwardRef<HTMLInputElement, Props>(
  ({ className, error, ...props }, ref) => (
    <div className="col-span-4">
      <input
        ref={ref}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none focus:ring-offset-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        {...props}
      />
      {error && <span className="text-rose-400 text-xs">{error.message}</span>}
    </div>
  )
);

FormTextInput.displayName = "FormTextInput";
