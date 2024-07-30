import { redirect } from "next/navigation";
import { CategoryForm } from "./category-form";
import getSession from "@/app/lib/get-session";

export default async function BecomeAHostPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user || !user.id) {
    return redirect("/login");
  }

  return (
    <div className="pt-20">
      <h2 className="mx-auto mb-5 max-w-2xl p-5 text-2xl font-semibold tracking-tight transition-colors md:text-3xl">
        Which of these best describes your home?
      </h2>

      <CategoryForm userId={user.id} />
    </div>
  );
}
