import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";

export const PriceCheck = () => {
  return (
    <div className="mt-4">
      <Collapsible>
        <CollapsibleTrigger className="mx-auto mb-7 flex w-64 items-center justify-center text-[19px] font-medium [&[data-state=open]>svg]:rotate-180">
          <p className="mr-2">
            Guest Price: <span>$136,941</span>
          </p>{" "}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mx-auto mt-1 w-72 bg-gradient-to-b from-[#fff] to-[#fcfcfc]">
          <div className="flex flex-col gap-4">
            <div>
              <div className="mx-auto flex w-64 justify-between text-base font-normal">
                <p>Base price</p> <p>$120,000</p>
              </div>
              <div className="mx-auto flex w-64 justify-between text-base font-normal">
                <p>Guest service fee</p> <p>$16,941</p>
              </div>
              <hr className="mx-auto my-1 flex w-64 justify-between border-black" />
              <div className="mx-auto flex w-64 justify-between text-base font-semibold">
                <p>Guest price</p> <p>$136,941</p>
              </div>
            </div>
            <div>
              <div className="mx-auto mb-2 flex w-64 justify-between border-b-4 border-double border-black bg-yellow-50 text-base font-semibold">
                <p>You earn</p> <p>$116,040</p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
