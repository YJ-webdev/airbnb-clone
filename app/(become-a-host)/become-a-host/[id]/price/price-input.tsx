import { Montserrat } from "next/font/google";
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
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
  setDataLogged: (value: boolean) => void;
  initialPrice?: number;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const PriceInput = ({
  setTypedValue,
  setDataLogged,
  initialPrice,
}: PriceInputProps) => {
  const [inputValue, setInputValue] = useState<string | number>(
    initialPrice || "",
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      input.style.width = `${input.value.length + 1}ch`;
    }
  }, [inputValue]);

  const formatNumber = useCallback((value: string): string => {
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue === "") return "";
    const numberValue = parseInt(cleanedValue, 10);
    return new Intl.NumberFormat("en-US").format(numberValue);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const formattedValue = formatNumber(value);
    setInputValue(formattedValue);

    // Data log available check
    if (Number(formattedValue) >= 10 && Number(formattedValue) < 10000) {
      setDataLogged(true);
    } else {
      setDataLogged(false);
    }
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRawInput = (inputValue: string) => {
    // Clean the input value to remove non-digit characters
    const cleanedValue = inputValue.replace(/[^\d]/g, "");
    const numberValue = parseInt(cleanedValue, 10);
    setTypedValue(numberValue);
  };

  return (
    <div className="mx-auto mt-16">
      <div className="flex items-baseline">
        <div className="flex items-center justify-center">
          <span
            className={`${montserrat.className} text-[60px] font-bold text-zinc-800 outline-none md:text-[70px]`}
          >
            $
          </span>

          {/* Ensure to handle null or undefined value for initial state */}
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
            onInput={(e) => handleRawInput(e.currentTarget.value)}
          />
        </div>
        <div className="flex cursor-pointer flex-col">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger type="button">
                <Pointer size={25} strokeWidth={2} onClick={handleIconClick} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Focus</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
