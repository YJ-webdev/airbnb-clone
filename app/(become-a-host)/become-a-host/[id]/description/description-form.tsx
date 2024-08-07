"use client";

import { createDescription } from "@/app/actions/create-listing";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { useProgress } from "@/app/context/progress-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

interface DescriptionFormProps {
  params: { id: string };
  userId: string;
  initialTitle?: string;
  initialDescription?: string;
}

export const DescriptionForm = ({
  params,
  userId,
  initialTitle,
  initialDescription,
}: DescriptionFormProps) => {
  const [dataLogged, setDataLogged] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const createDescriptionWithId = createDescription.bind(null, userId);

  const descriptionMaxLength = 500;

  const { progress, setProgress } = useProgress();

  useEffect(() => {
    if (title && description) {
      setDataLogged(true);
    } else {
      setDataLogged(false);
    }
    setProgress(71);
  }, [setProgress, title, description]);

  return (
    <form action={createDescriptionWithId}>
      <input type="hidden" name="listingId" value={params.id} />
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="description" value={description} />

      <div className="container mb-28 flex h-[70vh] max-w-2xl flex-col pt-28">
        <div className="mb-10 flex flex-col space-y-2">
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
        <div className="flex-grow" />
        <div className="flex flex-col gap-y-5">
          <Input
            name="title"
            required
            value={title}
            placeholder="Short but Significant"
            type="text"
            className="text-md max-w-1xl h-12 border border-zinc-500 px-4 font-medium placeholder:text-muted-foreground focus:outline focus:outline-1 focus:outline-black"
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />

          <Textarea
            name="description"
            required
            value={description}
            placeholder="Share what makes your place special."
            className="text-md max-w-1xl h-60 border border-zinc-500 font-medium focus:outline focus:outline-1 focus:outline-black"
            maxLength={500}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="text-end">
            {description?.length}/{descriptionMaxLength}
          </p>
        </div>
        <div className="flex-grow" />
      </div>

      <ActionBar
        dataLogged={dataLogged}
        prevHref={`/become-a-host/${params.id}/photos`}
        currentStep={progress}
      />
    </form>
  );
};
