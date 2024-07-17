"use client";

import DotPattern from "@/components/magicui/dot-pattern";
import { useState } from "react";
import { PriceCheck } from "./price-check";
import { PriceInput } from "./price-input";
import { Info } from "lucide-react";
import { createPrice } from "@/app/action/create-listing";

export default function PriceRoute({ params }: { params: { id: string } }) {
  const [typedValue, setTypedValue] = useState<number>(0);

  return (
    <div className="relative h-full overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className="fixed left-0 top-0 h-full w-full"
        style={{
          maskImage: "radial-gradient(circle, transparent 70%, black 40%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 25%, black 40%)",
        }}
      />
      <div className="mx-auto flex h-[15Dvh] max-w-2xl flex-col items-baseline gap-4 pl-6 pr-6 pt-5 md:pl-0 md:pr-0">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Now, set your price!
        </h2>

        <div className="flex items-center">
          <Info size={15} className="mr-2" />
          <p className="text-sm md:text-base">
            You can change it later anytime.
          </p>
        </div>
      </div>

      <form action={createPrice}>
        <input type="hidden" name="listingId" value={params.id} />
        <input type="hidden" name="price" value={typedValue} />
        <div className="mb-32 flex flex-col items-center justify-center gap-6">
          <PriceInput setTypedValue={setTypedValue} params={params} />
          <PriceCheck typedValue={typedValue} />
        </div>{" "}
      </form>
    </div>
  );
}
