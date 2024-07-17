"use client";

import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { Info } from "lucide-react";
import { useState } from "react";

export default function ReviewRoute({ params }: { params: { id: string } }) {
  const [dataLogged, setDataLogged] = useState(false);

  return (
    <>
      <div className="mx-auto mb-28 flex min-h-[60vh] max-w-4xl flex-col gap-y-5 p-5 md:pl-0 md:pr-0 md:pt-5">
        <div className="mb-5 flex flex-1 flex-col space-y-2">
          <h2 className="text-2xl font-semibold transition-colors md:text-3xl">
            Review your listing
          </h2>
          <div className="flex items-center">
            <Info size={15} className="mr-2" />
            <p className="line-clamp-1 text-sm md:text-base">
              Here&apos;s what we&apos;ll show to guests. Make sure everything
              looks good.
            </p>
          </div>
        </div>
        <div className="container"></div>
      </div>

      <ActionBar
        dataLogged={dataLogged}
        nextText="List Home"
        prevHref={`/become-a-host/${params.id}/price`}
      />
    </>
  );
}
