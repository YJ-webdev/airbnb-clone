"use client";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  type?: "submit";
}

export const Button = ({
  type,
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "relative py-3 text-md text-white font-semibold border-[1px] border-rose-500 bg-rose-500 disabled:opacity-10 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full",
        outline && "bg-white text-black border-black",
        small && "py-1 text-sm font-light"
      )}
    >
      {Icon && <Icon size={22} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};
