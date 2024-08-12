"use client";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  CardNumberElementProps,
  CardExpiryElementProps,
  CardCvcElementProps,
} from "@stripe/react-stripe-js";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const stripeElementStyle = {
  base: {
    color: "#000000",
    fontSize: "16px",
    fontFamily: "Nunito, sans-serif",
    "::placeholder": {
      color: "#71717a",
    },
  },
  invalid: {
    color: "#000000",
    iconColor: "#000000",
  },
  complete: {
    color: "#000000",
  },
};

interface StripeInputProps {
  id: string;
  label: string;
  onChange?: (event: any) => void;
  className?: string;
}

const CardNumberInput = React.forwardRef<
  CardNumberElementProps,
  StripeInputProps
>(({ id, label, onChange, className }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <div className="form-item relative w-full">
      <CardNumberElement
        id={id}
        onBlur={() => setIsFocused(false)}
        onChange={(event) => {
          setIsInvalid(!!event.error);
          onChange?.(event); // propagate the change event if needed
        }}
        options={{ style: stripeElementStyle }}
        className={cn(
          "peer h-14 w-full rounded-t-lg border border-zinc-300 px-4 pb-2 pt-6 text-base font-semibold transition",
          {
            "border-2 border-black": isFocused && !isInvalid,
            "border-red-200 bg-rose-50": !isFocused && isInvalid,
            "border-2 border-red-500 text-foreground": isFocused && isInvalid,
          },
          className,
        )}
        onFocus={() => setIsFocused(true)}
      />
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-md absolute left-4 top-5 origin-[0] -translate-y-5 scale-75 transform text-muted-foreground duration-150",
            { "font-bold text-rose-500": isInvalid },
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
});

CardNumberInput.displayName = "CardNumberInput";

const CardExpiryInput = React.forwardRef<
  CardExpiryElementProps,
  StripeInputProps
>(({ id, label, onChange, className }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <div className="form-item relative w-full">
      <CardExpiryElement
        id={id}
        onBlur={() => setIsFocused(false)}
        onChange={(event) => {
          setIsInvalid(!!event.error);
          onChange?.(event); // propagate the change event if needed
        }}
        options={{ style: stripeElementStyle }}
        className={cn(
          "peer h-14 w-full rounded-bl-lg border-b border-l border-r border-zinc-300 bg-white px-4 pb-2 pt-6 text-base font-semibold text-zinc-900 transition",
          {
            "border-2 border-black": isFocused && !isInvalid,
            "border-red-200 bg-rose-50": !isFocused && isInvalid,
            "border-2 border-red-500 text-foreground": isFocused && isInvalid,
          },
          className,
        )}
        onFocus={() => setIsFocused(true)}
      />
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-md absolute left-4 top-5 origin-[0] -translate-y-5 scale-75 transform text-muted-foreground duration-150",
            { "font-bold text-rose-500": isInvalid },
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
});

CardExpiryInput.displayName = "CardExpiryInput";

const CardCvcInput = React.forwardRef<CardCvcElementProps, StripeInputProps>(
  ({ id, label, onChange, className }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);

    return (
      <div className="form-item relative w-full">
        <CardCvcElement
          id={id}
          onBlur={() => setIsFocused(false)}
          onChange={(event) => {
            setIsInvalid(!!event.error);
            onChange?.(event); // propagate the change event if needed
          }}
          options={{ style: stripeElementStyle }}
          className={cn(
            "peer h-14 w-full rounded-br-lg border-b border-r border-zinc-300 bg-white px-4 pb-2 pt-6 text-base font-semibold text-zinc-900 transition",
            {
              "border-2 border-black": isFocused && !isInvalid,
              "border-red-200 bg-rose-50": !isFocused && isInvalid,
              "border-2 border-red-500 text-foreground": isFocused && isInvalid,
            },
            className,
          )}
          onFocus={() => setIsFocused(true)}
        />
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-md absolute left-4 top-5 origin-[0] -translate-y-5 scale-75 transform text-muted-foreground duration-150",
              { "font-bold text-rose-500": isInvalid },
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

CardCvcInput.displayName = "CardCvcInput";

export { CardNumberInput, CardExpiryInput, CardCvcInput };
