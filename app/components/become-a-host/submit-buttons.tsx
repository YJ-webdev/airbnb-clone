"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface CreationSubmitProps {
  dataLogged: boolean;
  nextText?: string;
  nextPage?: string;
  className?: string;
}

export function CreationSubmit({
  dataLogged,
  nextText,
  className,
}: CreationSubmitProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {dataLogged ? (
        pending ? (
          <Button
            disabled
            size="lg"
            className="px-7 py-6 text-[16px] font-bold"
          >
            Saving
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            className={cn("px-7 py-6 text-[16px] font-bold", className)}
          >
            {nextText ?? "Save / Next"}
          </Button>
        )
      ) : (
        <Button disabled size="lg" className="px-7 py-6 text-[16px] font-bold">
          {nextText ?? "Save / Next"}
        </Button>
      )}
    </>
  );
}
