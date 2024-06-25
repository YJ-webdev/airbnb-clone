import * as React from "react";

import { cn } from "@/lib/utils";
import { FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: "password" | "name" | "email";
  label?: string;
  type?: string;
  formatPrice?: boolean;
  errors?: FieldErrors;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, type, label, formatPrice, errors, ...props }, ref) => {
    const [value, setValue] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    return (
      <div className="relative w-full">
        {formatPrice && (
          <BiDollar
            size={24}
            className="absolute left-2 top-5 text-neutral-700"
          />
        )}
        <input
          id={id}
          placeholder=" "
          value={value}
          onChange={handleChange}
          type={type}
          className={cn(
            "text-md peer w-full rounded-md border-2 bg-white px-4 pb-4 pl-4 pt-5 font-semibold text-black outline-none transition focus:border-zinc-700 disabled:cursor-not-allowed disabled:opacity-70",
            formatPrice && "pl-9",
            errors && "border-rose-500 focus:border-rose-500",
          )}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "text-md absolute left-4 top-6 origin-[0] -translate-y-3 transform duration-150 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75",
            formatPrice && "left-9",
            errors && "text-rose-500",
            value && "-translate-y-5 scale-75",
          )}
        >
          {label}
        </label>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
