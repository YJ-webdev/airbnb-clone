import { redirect } from "next/navigation";
import { FloorFrom } from "./floor-form";
import getSession from "@/app/lib/get-session";
import { Steps } from "@/app/components/become-a-host/steps";

export default async function FloorPlanPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return (
    <div className="relative mb-28">
      <h2 className="mx-auto max-w-2xl pl-6 pr-6 pt-6 text-2xl font-semibold transition-colors md:pl-0 md:pr-0 md:pt-5 md:text-3xl">
        Let&apos;s start with the basics!
      </h2>

      <FloorFrom params={params} />
    </div>
  );
}
