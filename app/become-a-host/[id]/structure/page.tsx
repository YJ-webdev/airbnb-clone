import getSession from "@/app/lib/get-session";
import { redirect } from "next/navigation";
import { CategoryForm } from "./category-form";

export default async function StructureRoute({
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
    <>
      <h2 className="mx-auto mb-5 max-w-2xl p-5 text-2xl font-semibold tracking-tight transition-colors md:text-3xl">
        Which of these best describes your home?
      </h2>

      <CategoryForm params={params} />
    </>
  );
}
