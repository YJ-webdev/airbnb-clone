"use client";

import { createDescription } from "@/app/action/create-listing";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

export default function DescriptionRoute({
  params,
}: {
  params: { id: string };
}) {
  const [dataLogged, setDataLogged] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const descriptionMaxLength = 500;

  useEffect(() => {
    if (title && description) {
      setDataLogged(true);
    } else {
      setDataLogged(false);
    }
  }, [title, description]);

  return (
    <div className="flex flex-col">
      <form action={createDescription}>
        <input type="hidden" name="listingId" value={params.id} />
        {/* <input type="hidden" name="title" value={title} /> */}
        <input type="hidden" name="description" value={description} />
        <div className="mx-auto mb-28 flex min-h-[60vh] max-w-2xl flex-col gap-y-5 p-5 md:pl-0 md:pr-0 md:pt-5">
          <div className="mb-5 flex flex-1 flex-col space-y-2">
            <h2 className="text-2xl font-semibold transition-colors md:text-3xl">
              Title & Description{" "}
            </h2>
            <div className="flex items-center">
              <Info size={15} className="mr-2" />
              <p className="line-clamp-1 text-sm md:text-base">
                You can change it later anytime.
              </p>
            </div>
          </div>
          <Input
            name="title"
            required
            placeholder="Short titles work best."
            type="text"
            className="text-md max-w-1xl h-12 border border-zinc-500 px-4 font-medium placeholder:text-muted-foreground focus:outline focus:outline-1 focus:outline-black"
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />

          <Textarea
            name="description"
            required
            placeholder="Share what makes your place special."
            className="text-md max-w-1xl h-60 border border-zinc-500 font-medium focus:outline focus:outline-1 focus:outline-black"
            maxLength={500}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="text-end">
            {description.length}/{descriptionMaxLength}
          </p>
        </div>
        <ActionBar dataLogged={dataLogged} />
      </form>
    </div>
  );
}
