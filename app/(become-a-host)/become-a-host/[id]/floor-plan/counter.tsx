"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface CounterProps {
  name: string;
  setCount: (value: number) => void;
  small?: boolean;
  initialCount?: number;
}

export const Counter = ({
  small,
  name,
  setCount,
  initialCount,
}: CounterProps) => {
  const [amount, setAmount] = useState(initialCount || 0);

  const increase = () => {
    if (amount < 16) {
      setAmount(amount + 1);
    }
    setCount(amount + 1);
  };
  const decrease = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
    setCount(amount - 1);
  };

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={amount} />
      <Button
        variant="outline"
        type="button"
        onClick={decrease}
        className={cn(
          "ml-2 rounded-full border-zinc-300 bg-white p-0 text-muted-foreground hover:bg-white",
          amount === 0
            ? "cursor-default opacity-30 hover:border-zinc-300 hover:text-muted-foreground"
            : "hover:border-black hover:text-black",
          small ? "h-8 w-8" : "h-9 w-9",
        )}
      >
        <Minus size={14} />
      </Button>
      <p
        className={cn(
          "text-lg font-semibold",
          amount === 0 ? "text-zinc-400" : "text-zinc-800",
        )}
      >
        {amount === 16 ? "16 +" : amount}
      </p>
      <Button
        variant="outline"
        size="icon"
        type="button"
        className={cn(
          "h-9 w-9 rounded-full border-zinc-300 bg-white p-0 text-muted-foreground hover:bg-white",
          amount === 16
            ? "cursor-default opacity-30 hover:border-zinc-300 hover:text-muted-foreground"
            : "hover:border-black hover:text-black",
          small ? "h-8 w-8" : "h-9 w-9",
        )}
        onClick={increase}
      >
        <Plus size={14} />
      </Button>
    </div>
  );
};
