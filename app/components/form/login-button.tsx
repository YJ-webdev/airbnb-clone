import { Button } from "@/components/ui/button";
import React from "react";

interface LoginButtonProps {
  isPending: boolean;
  label: string;
}
export const LoginButton = ({ isPending, label }: LoginButtonProps) => {
  return (
    <Button
      disabled={isPending}
      type="submit"
      className="w-full rounded-lg bg-gradient-to-r from-rose-500 to-[#e3326d] py-[25px] text-[16px] font-semibold"
    >
      {isPending ? "Please, wait.." : label}
    </Button>
  );
};
