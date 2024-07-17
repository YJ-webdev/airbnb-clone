"use client";

import { useState } from "react";
import { PriceCheck } from "./price-check";
import { PriceInput } from "./price-input";
import { ActionBar } from "@/app/components/become-a-host/action-bar";

export default function PriceRoute() {
  const [dataLogged, setDataLogged] = useState(false);
  const [typedValue, setTypedValue] = useState<number>(0);
  return (
    <>
      <div className="mx-auto flex h-full flex-col">
        <h2 className="mx-auto h-[15Dvh] max-w-2xl pl-6 pr-6 pt-5 text-2xl font-semibold transition-colors md:pl-0 md:pr-0 md:text-3xl">
          Now, set your price!{" "}
          <span className="text-[20px] font-medium text-muted-foreground transition-colors md:pl-0 md:pr-0">
            —You can change it anytime.
          </span>
        </h2>
        <div className="mb-32 flex flex-col items-center justify-center gap-6">
          <PriceInput setTypedValue={setTypedValue} />
          <PriceCheck typedValue={typedValue} />
        </div>
      </div>
      <ActionBar dataLogged={dataLogged} />
    </>
  );
}
