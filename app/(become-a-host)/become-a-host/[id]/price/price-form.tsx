"use client";

import DotPattern from "@/components/magicui/dot-pattern";
import { useEffect, useState } from "react";
import { PriceCheck } from "./price-check";
import { PriceInput } from "./price-input";
import { Info } from "lucide-react";
import { createPrice } from "@/app/action/create-listing";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { GUEST_SERVICE_FEE } from "@/app/lib/rates";
import { useProgress } from "@/app/context/progress-context";

interface PriceFormProps {
  params: { id: string };
  userId: string;
  initialPrice?: number;
}

export const PriceForm = ({ params, userId, initialPrice }: PriceFormProps) => {
  const [dataLogged, setDataLogged] = useState(false);
  const [typedValue, setTypedValue] = useState<number>(initialPrice || 0);
  const { progress, setProgress } = useProgress();

  const createPriceWithId = createPrice.bind(null, userId);

  const unformattedGuestPrice = typedValue * GUEST_SERVICE_FEE + typedValue;

  useEffect(() => {
    if (typedValue > 10 && typedValue < 10000) {
      setDataLogged(true);
    } else {
      setDataLogged(false);
    }
    setProgress(85);
  }, [setProgress, typedValue]);

  return (
    <form action={createPriceWithId}>
      <input type="hidden" name="listingId" value={params.id} />
      <input type="hidden" name="enteredPrice" value={typedValue} />
      <input type="hidden" name="guestPrice" value={unformattedGuestPrice} />

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
        <div className="container mb-28 flex h-full min-h-[70%] max-w-2xl flex-col pt-32">
          <div className="flex flex-1 flex-col items-baseline gap-2">
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

          <div className="flex-grow" />
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <PriceInput
              setDataLogged={setDataLogged}
              setTypedValue={setTypedValue}
              initialPrice={initialPrice}
            />
            <PriceCheck typedValue={typedValue} />
            <p className="text-sm font-bold text-rose-500 md:text-base">
              {typedValue > 1000 ? `Price is too high` : ``}
            </p>
          </div>
        </div>

        <ActionBar
          dataLogged={dataLogged}
          prevHref={`/become-a-host/${params.id}/description`}
          currentStep={progress}
        />
      </div>
    </form>
  );
};
