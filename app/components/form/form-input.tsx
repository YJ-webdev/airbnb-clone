"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  formatPrice?: boolean;
  errors?: FieldErrors;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      disabled,
      type,
      formatPrice,
      errors,
      value,
      onChange,
      onBlur,
      name,
      className,
      placeholder,
      required,
    },
    ref,
  ) => {
    return (
      <div className="form-item relative w-full">
        {formatPrice && (
          <BiDollar
            size={24}
            className="absolute left-2 top-5 text-neutral-700"
          />
        )}
        <input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          type={type}
          disabled={disabled}
          autoComplete="off"
          required={required}
          className={cn(
            "text-md peer w-full rounded-lg border border-zinc-400 bg-white px-4 pb-2 pl-4 pt-5 font-semibold text-zinc-900 transition focus:border-zinc-700 disabled:cursor-not-allowed disabled:opacity-70",
            className,
            formatPrice && "pl-9",
            errors?.[id] &&
              "border-rose-500 text-rose-500 focus:outline-1 focus:outline-rose-500",
          )}
        />
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-md absolute left-4 top-5 origin-[0] -translate-y-1 scale-100 transform text-muted-foreground duration-150 peer-focus:-translate-y-5 peer-focus:scale-75",
              formatPrice && "left-9",
              errors?.[id] && "text-rose-500",
              (placeholder || value) && "-translate-y-5 scale-75",
              disabled && "text-zinc-400",
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

FormInput.displayName = "Input";

export { FormInput };
