"use client";

import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";

export default function DescriptionRoute() {
  const [dataLogged, setDataLogged] = useState(false);
  const [description, setDescription] = useState("");
  const maxLength = 500;

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };
  return (
    <div className="mx-auto flex h-[70vh] max-w-2xl flex-col">
      <h2 className="flex-1 p-5 text-2xl font-semibold transition-colors md:pl-0 md:pr-0 md:pt-5 md:text-3xl">
        Title & Description{" "}
        <span className="text-[20px] font-medium text-muted-foreground">
          —You can always change it later.
        </span>
      </h2>
      <div className="mb-[10%] flex flex-col gap-y-5 p-5 md:pl-0 md:pr-0 md:pt-5">
        <form>
          <div className="max-w-1xl flex flex-col gap-y-5">
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
    </div>
  );
}
