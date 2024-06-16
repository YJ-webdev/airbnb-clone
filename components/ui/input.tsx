import * as React from "react";

import { cn } from "@/lib/utils";
import { FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: "password" | "name" | "email";
  label: string;
  type?: string;
  formatPrice?: boolean;
  errors: FieldErrors;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, type, label, formatPrice, errors, ...props }, ref) => {
    const [value, setValue] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    return (
      <div className="w-full relative">
        {formatPrice && (
          <BiDollar
            size={24}
            className="text-neutral-700 absolute top-5 left-2"
          />
        )}
        <input
          id={id}
          placeholder=" "
          value={value}
          onChange={handleChange}
          type={type}
          className={cn(
            "peer w-full pt-5 pb-4 px-4 bg-white border-2 text-black text-md font-semibold focus:border-zinc-700 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4",
            formatPrice && "pl-9",
            errors[id] && "border-rose-500 focus:border-rose-500"
          )}
          ref={ref}
          {...props}
        />
        <label
          className={cn(
            "absolute text-md duration-150 transform -translate-y-3 top-6 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-5 left-4 ",
            formatPrice && "left-9",
            errors[id] && "text-rose-500",
            value && "scale-75 -translate-y-5"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
