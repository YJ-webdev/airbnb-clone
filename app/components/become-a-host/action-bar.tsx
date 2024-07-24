"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreationSubmit } from "./submit-buttons";

import { useProgress } from "@/app/context/progress-context";
import { ProgressBar } from "./progress-bar";

interface ActionBarProps {
  dataLogged: boolean;
  prevHref?: string;
  nextText?: string;
  prevText?: string;
  className?: string;
  currentStep?: number;
}

export function ActionBar({
  dataLogged,
  prevHref,
  nextText,
  prevText,
  className,
  currentStep,
}: ActionBarProps) {
  const { progress, setProgress } = useProgress();

  useEffect(() => {
    if (currentStep !== undefined) {
      setProgress(currentStep);
    }
  }, [currentStep, setProgress]);

  return (
    <div className="fixed bottom-0 z-10 flex h-24 w-full flex-col border-t bg-white">
      <div className="container mx-auto flex h-full items-center justify-between px-5 lg:px-10">
        <Button
          variant="secondary"
          size="lg"
          className="bg-white px-3 py-6 text-[16px] font-bold underline hover:bg-zinc-100"
          asChild
        >
          <Link href={prevHref ?? "/"}>{prevText ?? "Previous"}</Link>
        </Button>
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
