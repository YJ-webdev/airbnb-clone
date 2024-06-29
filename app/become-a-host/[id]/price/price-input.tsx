"use client";
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

  return (
    <div className="mx-auto items-center">
      <div>
        <span className="text-[48px] font-bold text-zinc-800 outline-none">
          $
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="border-b-4 border-dashed border-zinc-800 text-center text-[48px] font-bold text-zinc-800 outline-none"
          ref={inputRef}
          style={{ minWidth: "1ch" }} // Ensure it has some minimum width
          maxLength={8}
        />
      </div>
    </div>
  );
};
