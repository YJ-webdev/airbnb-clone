"use client";

import ImageUpload from "./image-upload";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { Info } from "lucide-react";
import { createImages } from "@/app/action/create-listing";

export default function PhotosRoute({ params }: { params: { id: string } }) {
  const [dataLogged, setDataLogged] = useState(false);
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const router = useRouter();

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append("listingId", params.id as string);

  //   imageSrc.forEach((file) => {
  //     formData.append("images", file);
  //   });

  //   try {
  //     const response = await fetch("/api/upload-images", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       console.log("Images uploaded successfully");
  //       router.push(`/become-a-host/${params.id}/description`);
  //     } else {
  //       const errorText = await response.text();
  //       console.error(
  //         "Failed to upload images:",
  //         response.status,
  //         response.statusText,
  //         errorText,
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error uploading images:", error);
  //   }
  // };

  return (
    <>
      <form action={createImages}>
        <input type="hidden" name="listingId" value={params.id} />
        <input type="hidden" name="imageSrc" value={imageSrc as string[]} />

        <div className="mx-auto flex max-w-2xl flex-col space-y-2 p-5 md:pl-0 md:pr-0 md:pt-5">
          <h2 className="text-2xl font-semibold transition-colors md:text-3xl">
            Add some photos of your place
          </h2>
          <div className="flex">
            <Info size={15} className="mr-2 translate-y-1" />
            <p className="text-sm md:text-base">
              You&apos;ll need 5 photos to get started. You can add more (Max.
              20) or make changes later.
            </p>
          </div>
        </div>
        <ImageUpload setDataLogged={setDataLogged} setImageSrc={setImageSrc} />
        <ActionBar
          dataLogged={dataLogged}
          prevHref={`/become-a-host/${params.id}/location`}
        />
      </form>
    </>
  );
}
