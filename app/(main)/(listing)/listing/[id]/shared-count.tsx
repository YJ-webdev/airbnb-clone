"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface SharedCounterProps {
  name: string;
  count: number;
  setCount: (value: number) => void;
  total: number;
  small?: boolean;
  initialCount?: number;
  min?: number;
  max: number;
}

export const SharedCounter = ({
  small,
  name,
  count,
  setCount,
  initialCount,
  min,
  max,
  total,
}: SharedCounterProps) => {
  const [amount, setAmount] = useState(min);

  const increase = () => {
    if (total < max) {
      setCount(count + 1);
    }
  };

  const decrease = () => {
    // Check if count is greater than min, defaulting to 0 if min is not provided
    if (count > (min || 0)) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={count} />
      <Button
        variant="outline"
        type="button"
        onClick={decrease}
        className={cn(
          "rounded-full border-zinc-300 bg-white p-0 text-muted-foreground hover:bg-white",
          count === min ?? 0
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
          count === 0 ? "text-zinc-400" : "text-zinc-800",
          small ? "text-base" : "text-lg",
        )}
      >
        {count === 16 ? "16 +" : count}
      </p>

      <Button
        variant="outline"
        size="icon"
        type="button"
        className={cn(
          "h-9 w-9 rounded-full border-zinc-300 bg-white p-0 text-muted-foreground hover:bg-white",
          count === max ?? 16
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
