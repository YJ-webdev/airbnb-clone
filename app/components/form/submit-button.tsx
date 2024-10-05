import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface SubmitButtonProps {
  isPending?: boolean;
  label: string;
  className?: string;
  type?: "button";
  onClick?: () => void;
}
export const SubmitButton = ({
  isPending,
  label,
  className,
  onClick,

  type,
}: SubmitButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isPending}
      type={type === "button" ? "button" : "submit"}
      className={cn(
        "h-[50px] w-full rounded-lg border bg-gradient-to-r from-rose-500 to-[#e3326d] py-3 text-[16px] font-semibold text-white outline-1",
        className,
      )}
    >
      {isPending ? "Please, wait.." : label}
    </button>
  );
};
