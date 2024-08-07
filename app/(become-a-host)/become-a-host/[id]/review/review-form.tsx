"use client";

import { createApproval } from "@/app/actions/create-listing";

import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { ReviewListing } from "./review-listing";
import { Listing, User } from "@prisma/client";
import { useProgress } from "@/app/context/progress-context";

interface ReveiwFormProps {
  params: { id: string };
  data: Listing & { user: User };
  userId: string;
}

export const ReviewForm = ({ params, data, userId }: ReveiwFormProps) => {
  const [dataLogged, setDataLogged] = useState(true);
  const { progress, setProgress } = useProgress();

  const createApprovalWithId = createApproval.bind(null, userId);

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  return (
    <form action={createApprovalWithId}>
      <input type="hidden" name="listingId" value={params.id} />

      <div className="container mb-28 flex max-w-4xl flex-col gap-y-5 pt-[90px]">
        <div className="mb-3 flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold transition-colors md:text-3xl">
            Review your listing
          </h2>
          <div className="flex items-center">
            <Info size={15} className="mr-2" />
            <p className="text-sm md:text-base">
              Here&apos;s what we&apos;ll show to guests. Make sure everything
              looks good.
            </p>
          </div>
        </div>

        <ReviewListing data={data} />
      </div>

      <ActionBar
        currentStep={100}
        dataLogged={dataLogged}
        nextText="Send Listing"
        prevHref={`/become-a-host/${params.id}/price`}
        className={
          "bg-gradient-to-r from-rose-500 to-[#e3326d] transition-colors hover:from-[#fd56aa] hover:to-[#f86596]"
        }
      />
    </form>
  );
};
