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
  min: number;
  max?: number;
}

export const Counter = ({
  small,
  name,
  setCount,
  initialCount,
  min,
  max,
}: CounterProps) => {
  const [amount, setAmount] = useState(initialCount ?? (min as number));

  const increase = () => {
    if (amount < (max ?? 16)) {
      setAmount(amount + 1);
      setCount(amount + 1);
    }
  };
  const decrease = () => {
    if (amount > (min ?? 0)) {
      setAmount(amount - 1);
      setCount(amount - 1);
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={amount} />
      <Button
        variant="outline"
        type="button"
        onClick={decrease}
        disabled={amount === min || amount === 0}
        className={cn(
          "rounded-full border-zinc-300 bg-white p-0 text-muted-foreground hover:bg-white",
          amount === min ?? 0
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
          small ? "text-base" : "text-lg",
        )}
      >
        {amount === 16 ? "16 +" : amount}
      </p>
      <Button
        variant="outline"
        size="icon"
        type="button"
        disabled={amount === max || amount === 16}
        className={cn(
          "h-9 w-9 rounded-full border-zinc-300 bg-white p-0 text-muted-foreground hover:bg-white",
          amount === max || amount === 16
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
