"use client";

import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function DescriptionRoute() {
  const [dataLogged, setDataLogged] = useState(false);
  const [description, setDescription] = useState("");
  const maxLength = 500;

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };
  return (
    <div className="flex flex-col">
      <form>
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
            placeholder="Title —Short titles work best."
            type="text"
            className="text-md max-w-1xl font-medium placeholder:text-muted-foreground"
            maxLength={100}
          />

          <Textarea
            name="description"
            required
            placeholder="Description —Share what makes your place special."
            className="text-md h-60 font-medium"
            maxLength={500}
            onChange={handleDescriptionChange}
          />
          <p className="text-end">{description.length}/500</p>
        </div>
        <ActionBar dataLogged={dataLogged} />
      </form>
    </div>
  );
}
