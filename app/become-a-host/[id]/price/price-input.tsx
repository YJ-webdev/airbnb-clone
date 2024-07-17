import { Montserrat } from "next/font/google";
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pointer } from "lucide-react";

interface PriceInputProps {
  setTypedValue: Dispatch<SetStateAction<number>>;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const PriceInput = ({ setTypedValue }: PriceInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      input.style.width = `${input.value.length + 1}ch`;
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

  const handleRawInput = (inputValue: string) => {
    // Clean the input value to remove non-digit characters
    const cleanedValue = inputValue.replace(/[^\d]/g, "");

    // Convert the cleaned value to a number (if necessary)
    const numberValue = parseInt(cleanedValue, 10);
    setTypedValue(numberValue);
    // Use `numberValue` for your calculations or further processing
  };

  return (
    <div className="z-10 mx-auto mt-16">
      <div className="flex items-baseline">
        <div className="flex items-center justify-center">
          <span
            className={`${montserrat.className} text-[60px] font-bold text-zinc-800 outline-none md:text-[70px]`}
          >
            $
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className={`${montserrat.className} w-12 text-center text-[60px] font-bold text-zinc-800 placeholder-slate-300 outline-none md:text-[70px]`}
            ref={inputRef}
            style={{ minWidth: "3ch" }}
            maxLength={6}
            minLength={2}
            placeholder="123"
            onInput={(e) => handleRawInput(e.currentTarget.value)} // Correct usage of onInput in React
          />
        </div>
        <div className="flex cursor-pointer flex-col">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Pointer size={25} strokeWidth={2} onClick={handleIconClick} />
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
