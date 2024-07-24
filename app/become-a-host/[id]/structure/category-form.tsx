"use client";

import { SelectCategory } from "./select-category";
import { createStructure } from "@/app/action/create-listing";
import { useEffect, useState } from "react";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { useProgress } from "@/app/context/progress-context";

export const CategoryForm = ({ params }: { params: { id: string } }) => {
  const [dataLogged, setDataLogged] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { progress, setProgress } = useProgress();

  useEffect(() => {
    setProgress(14);
  }, []);

  return (
    <form action={createStructure}>
      <input type="hidden" name="listingId" value={params.id} />
      <input type="hidden" name="category" value={selectedCategory} />

      <SelectCategory
        setDataLogged={setDataLogged}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <ActionBar
        dataLogged={dataLogged}
        prevText="Cancel"
        currentStep={progress}
      />
    </form>
  );
};
