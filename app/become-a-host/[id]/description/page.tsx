"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";

export default function DescriptionRoute() {
  const [description, setDescription] = useState("");
  const maxLength = 500;

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };
  return (
    <>
      <div className="mx-auto max-w-2xl">
        <h2 className="mx-auto p-5 text-2xl font-semibold transition-colors md:pb-5 md:pl-0 md:pr-0 md:pt-5 md:text-3xl">
          Title & Description{" "}
          <span className="text-[20px] font-medium text-muted-foreground">
            —You can always change it later.
          </span>
        </h2>
      </div>
      <form>
        <div className="mx-auto mb-36 flex max-w-2xl flex-col gap-y-5 p-5 md:pb-5 md:pl-0 md:pr-0 md:pt-5">
          <Input
            name="title"
            required
            placeholder="Title —Short titles work best."
            type="text"
            className="text-md font-medium placeholder:text-muted-foreground"
            maxLength={32}
          />

          <div>
            <Textarea
              name="description"
              required
              placeholder="Description —Share what makes your place special."
              className="text-md h-60 font-medium"
              maxLength={500}
              onChange={handleDescriptionChange}
            />
            <div className="mt-2 text-end">{description.length}/500</div>
          </div>
        </div>
      </form>
    </>
  );
}
