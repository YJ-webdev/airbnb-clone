import { Info } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LocationRoute() {
  return (
    <div className="mx-auto">
      <h2 className="mx-auto max-w-2xl pb-2 pl-6 pr-6 pt-5 text-2xl font-semibold transition-colors md:pl-0 md:pr-0 md:text-3xl">
        Where&apos;s your place located?{" "}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Info />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-nunito p-2 text-base font-medium">
                Your address is only shared with guests after they&apos;ve made
                a reservation.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h2>
    </div>
  );
}
