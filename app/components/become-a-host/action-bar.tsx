import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreationSubmit } from "./submit-buttons";

interface ActionBarProps {
  dataLogged: boolean;
}

export function ActionBar({ dataLogged }: ActionBarProps) {
  return (
    <div className="fixed bottom-0 z-10 h-24 w-full border-t bg-white">
      <div className="mx-auto flex h-full items-center justify-between px-5 lg:px-10">
        <Button
          variant="secondary"
          size="lg"
          className="bg-white px-3 py-6 text-[16px] font-bold underline hover:bg-zinc-100"
          asChild
        >
          <Link href="/">Previous</Link>
        </Button>
        <CreationSubmit dataLogged={dataLogged} />
      </div>
    </div>
  );
}
