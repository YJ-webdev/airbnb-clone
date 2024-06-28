import { createCategoryPage } from "@/action/create-listing";
import { SelectCategory } from "@/app/components/select-category";
import { CreationSubmit } from "@/app/components/submit-buttons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StructureRoute({ params }: { params: { id: string } }) {
  return (
    <div className="mx-auto">
      <h2 className="mx-auto p-5 text-center text-2xl font-semibold tracking-tight transition-colors md:text-3xl">
        Which of these best describes your home?
      </h2>

      <form action={createCategoryPage}>
        <input type="hidden" name="listingId" value={params.id} />
        <SelectCategory />

        <div className="fixed bottom-0 z-10 h-24 w-full border-t bg-white">
          <div className="mx-auto flex h-full items-center justify-between px-5 lg:px-10">
            <Button
              variant="secondary"
              size="lg"
              className="font-bold underline"
              asChild
            >
              <Link href="/">Back</Link>
            </Button>{" "}
            <CreationSubmit />
          </div>
        </div>
      </form>
    </div>
  );
}
