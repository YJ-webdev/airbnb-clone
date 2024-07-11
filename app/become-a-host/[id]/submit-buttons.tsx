"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function CreationSubmit() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="px-7 py-6 text-[16px] font-bold">
          Saving
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          type="submit"
          size="lg"
          className="px-7 py-6 text-[16px] font-bold"
        >
          Save / Next
        </Button>
      )}
    </>
  );
}
