"use client";

import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { SelectCategory } from "./select-category";
import { CreationSubmit } from "@/app/components/become-a-host/submit-buttons";
import { createCategoryPage } from "@/app/action/create-listing";
import { useState } from "react";

export default function StructureRoute({ params }: { params: { id: string } }) {
  const [dataLogged, setDataLogged] = useState(false);

  return (
    <>
      <h2 className="mx-auto max-w-2xl p-5 text-2xl font-semibold tracking-tight transition-colors md:text-3xl">
        Which of these best describes your home?
      </h2>

      <form action={createCategoryPage}>
        <input type="hidden" name="listingId" value={params.id} />
        <SelectCategory setDataLogged={setDataLogged} />

        <div className="fixed bottom-0 z-10 h-24 w-full border-t bg-white">
          <div className="mx-auto flex h-full items-center justify-between px-5 lg:px-10">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white px-3 py-6 text-[16px] font-bold underline hover:bg-zinc-100"
              asChild
            >
              <Link href="/">
                <Undo2 size={22} className="mr-2" /> Back to home
              </Link>
            </Button>
            <CreationSubmit dataLogged={dataLogged} />
          </div>
        </div>
      </form>
    </>
  );
}
