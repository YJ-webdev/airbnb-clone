"use client";

import { useState } from "react";
import { PriceCheck } from "./price-check";
import { PriceInput } from "./price-input";

export default function PriceRoute() {
  const [typedValue, setTypedValue] = useState<number>(0);
  return (
    <div className="mx-auto flex h-[60vh] flex-col">
      <h2 className="mx-auto max-w-2xl flex-1 pl-6 pr-6 pt-5 text-2xl font-semibold transition-colors md:pl-0 md:pr-0 md:text-3xl">
        Now, set your price!{" "}
        <span className="text-[20px] font-medium text-muted-foreground transition-colors md:pl-0 md:pr-0">
          —You can change it anytime.
        </span>
      </h2>
      <div className="mb-[5%] flex flex-col items-center justify-center gap-6">
        <PriceInput setTypedValue={setTypedValue} />
        <PriceCheck typedValue={typedValue} />
      </div>
    </div>
  );
}
