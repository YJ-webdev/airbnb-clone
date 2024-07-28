"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  disabled2?: boolean;
  connecting?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  type?: "submit";
}

export const AuthButton = ({
  type,
  label,
  onClick,
  disabled,
  disabled2,
  connecting,
  outline,
  small,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "text-md relative h-[50px] w-full rounded-lg border-[1px] border-rose-500 bg-rose-500 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-10",
        outline && "border-black bg-white text-black",
        small && "py-1 text-sm font-light",
        disabled && "cursor-not-allowed opacity-60",
        disabled2 && "cursor-not-allowed opacity-60",
        connecting && "cursor-not-allowed opacity-60",
      )}
    >
      {Icon && <Icon size={22} className="absolute left-4 top-3" />}
      {connecting ? (
        <div className="flex items-center justify-center gap-2">
          Connecting to {label}...
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <>Continue with {label}</>
      )}
    </button>
  );
};
