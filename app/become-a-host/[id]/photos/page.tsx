"use client";

import { ActionBar } from "@/app/components/become-a-host/action-bar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useState } from "react";
import Previews from "./image-upload";

export default function PhotosRoute() {
  const [dataLogged, setDataLogged] = useState(false);

  return (
    <>
      <h2 className="mx-auto max-w-2xl pb-2 pl-6 pr-6 pt-5 text-2xl font-semibold tracking-tight transition-colors md:pl-0 md:pr-0 md:text-3xl">
        Add some photos of your place{" "}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Info />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-nunito p-2 text-base font-medium">
                You&apos;ll need 5 photos to get started. You can add more or
                make changes later.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h2>
      <Previews />
      <div h-26></div>
      <ActionBar dataLogged={dataLogged} />
    </>
  );
}
