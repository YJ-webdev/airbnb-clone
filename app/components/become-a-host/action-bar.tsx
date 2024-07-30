"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreationSubmit } from "./submit-buttons";

import { useProgress } from "@/app/context/progress-context";
import { ProgressBar } from "./progress-bar";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActionBarProps {
  dataLogged: boolean;

  nextText?: string;
  prevText?: string;
  className?: string;
  currentStep?: number;
}

export function ActionBar({
  dataLogged,

  nextText,
  prevText,
  className,
  currentStep,
}: ActionBarProps) {
  const { progress, setProgress } = useProgress();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (currentStep !== undefined) {
      setProgress(currentStep);
    }
  }, [currentStep, setProgress]);

  return (
    <div className="fixed bottom-0 z-10 flex h-24 w-full flex-col border-t bg-white">
      <div className="container mx-auto flex h-full items-center justify-between px-5 lg:px-10">
        <button
          onClick={() => {
            router.back();
          }}
          className="rounded-sm bg-white px-5 py-3 text-[16px] font-bold hover:bg-zinc-100"
        >
          {prevText ?? "Previous"}
        </button>

        <CreationSubmit
          dataLogged={dataLogged}
          nextText={nextText}
          className={className}
        />
      </div>
      <div className="mt-2 w-full px-5 lg:px-10"></div>

      <ProgressBar value={progress} />
    </div>
  );
}
