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
    <Button
      onClick={onClick}
      disabled={isPending}
      type={type === "button" ? "button" : "submit"}
      className={cn(
        "w-full rounded-lg bg-gradient-to-r from-rose-500 to-[#e3326d] py-[25px] text-[16px] font-semibold",
        className,
      )}
    >
      {isPending ? "Please, wait.." : label}
    </Button>
  );
};
