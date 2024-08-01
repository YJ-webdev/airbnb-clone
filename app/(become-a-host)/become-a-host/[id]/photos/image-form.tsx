"use client";

import ImageUpload from "./image-upload";
import { useEffect, useState } from "react";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { Info } from "lucide-react";
import { createImages } from "@/app/actions/create-listing";
import { useProgress } from "@/app/context/progress-context";

import React from "react";

export const ImageForm = ({
  params,
  userId,
}: {
  params: { id: string };
  userId: string;
}) => {
  const [dataLogged, setDataLogged] = useState(false);
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const { progress, setProgress } = useProgress();

  const createImagesWithId = createImages.bind(null, userId);

  useEffect(() => {
    setProgress(57);
  }, [setProgress]);

  return (
    <form action={createImagesWithId}>
      <input type="hidden" name="listingId" value={params.id} />
      <input type="hidden" name="imageSrc" value={imageSrc as string[]} />

      <div className="container mb-10 flex max-w-3xl flex-col space-y-2 pt-28">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Add some photos of your place
        </h2>
        <div className="flex">
          <Info size={15} className="mr-2 translate-y-1" />
          <p className="text-sm md:text-base">
            You&apos;ll need 5 photos to get started. You can add more (Max. 20)
            or make changes later.
          </p>
        </div>
      </div>
      <ImageUpload setDataLogged={setDataLogged} setImageSrc={setImageSrc} />

      <ActionBar
        dataLogged={dataLogged}
        prevHref={`/become-a-host/${params.id}/location`}
        currentStep={progress}
      />
    </form>
  );
};
