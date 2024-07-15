"use client";

import { ActionBar } from "@/app/components/become-a-host/action-bar";

import { useState } from "react";
import ImageUpload from "./image-upload";
import { Info } from "lucide-react";

export default function PhotosRoute() {
  const [dataLogged, setDataLogged] = useState(false);

  return (
    <>
      <form>
        <div className="mx-auto flex max-w-2xl flex-col space-y-2 p-5 md:pl-0 md:pr-0 md:pt-5">
          <h2 className="text-2xl font-semibold transition-colors md:text-3xl">
            Add some photos of your place
          </h2>
          <div className="flex">
            <Info size={15} className="mr-2 translate-y-1" />
            <p className="text-sm md:text-base">
              You&apos;ll need 5 photos to get started. You can add more or make
              changes later.
            </p>
          </div>
        </div>
        <ImageUpload />

        <ActionBar dataLogged={dataLogged} />
      </form>
    </>
  );
}
