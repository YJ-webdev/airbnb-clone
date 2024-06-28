"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export const Counter = () => {
  const [amount, setAmount] = useState(1);

  const increase = () => {
    if (amount < 16) {
      setAmount(amount + 1);
    }
  };
  const decrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  return (
    <div className="flex items-center gap-x-4">
      <Button
        variant="outline"
        type="button"
        onClick={decrease}
        className={cn(
          "h-9 w-9 rounded-full border-zinc-300 bg-white p-0 text-muted-foreground hover:bg-white",
          amount === 1
            ? "cursor-default opacity-30 hover:border-zinc-300 hover:text-muted-foreground"
            : "hover:border-black hover:text-black",
        )}
      >
        <Minus size={14} />
      </Button>
      <p className="text-lg font-semibold">{amount === 16 ? "16 +" : amount}</p>
      <Button
        variant="outline"
        size="icon"
        type="button"
        className={cn(
          "h-9 w-9 rounded-full border-zinc-300 bg-white p-0 text-muted-foreground hover:bg-white",
          amount === 16
            ? "cursor-default opacity-30 hover:border-zinc-300 hover:text-muted-foreground"
            : "hover:border-black hover:text-black",
        )}
        onClick={increase}
      >
        <Plus size={14} />
      </Button>
    </div>
  );
};
