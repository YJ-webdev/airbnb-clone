"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquarePen } from "lucide-react";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";

export const PriceInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      input.style.width = `${input.value.length}ch`; // Set width based on input value length
    }
  }, [inputValue]);

  const formatNumber = (value: string): string => {
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue === "") return "";
    const numberValue = parseInt(cleanedValue, 10);
    return new Intl.NumberFormat("en-US").format(numberValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatNumber(value);
    setInputValue(formattedValue);
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="mx-auto mt-16">
      <div className="flex items-center justify-center">
        <span className="text-[38px] font-bold text-zinc-800 outline-none md:text-[48px]">
          $
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="mx-2 max-w-80 border-b-4 border-dashed border-zinc-800 text-center text-[38px] font-bold text-zinc-800 placeholder-slate-300 outline-none md:text-[48px]"
          ref={inputRef}
          style={{ minWidth: "1ch" }} // Ensure it has some minimum width
          maxLength={8}
          placeholder="0"
        />
        <div className="ml-1 flex cursor-pointer flex-col items-center justify-items-start">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <SquarePen size={25} onClick={handleIconClick} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
