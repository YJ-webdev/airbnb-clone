"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SelectCategory } from "./select-category";
import { CreationSubmit } from "@/app/components/become-a-host/submit-buttons";
import { createStructure } from "@/app/action/create-listing";
import { useState } from "react";
import { ActionBar } from "@/app/components/become-a-host/action-bar";

export default function StructureRoute({ params }: { params: { id: string } }) {
  const [dataLogged, setDataLogged] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <>
      <h2 className="mx-auto mb-5 max-w-2xl p-5 text-2xl font-semibold tracking-tight transition-colors md:text-3xl">
        Which of these best describes your home?
      </h2>

      <form action={createStructure}>
        <input type="hidden" name="listingId" value={params.id} />
        <input type="hidden" name="category" value={selectedCategory} />

        <SelectCategory
          setDataLogged={setDataLogged}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        <ActionBar dataLogged={dataLogged} prevText="Cancel" />
      </form>
    </>
  );
}
