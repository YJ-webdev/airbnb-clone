import { redirect } from "next/navigation";
import { Metadata } from "next";

import prisma from "@/app/lib/db";
import getSession from "@/app/lib/get-session";
import { PersonnalInfo } from "./personnal-info";

export const metadata: Metadata = { title: "Airbnb | Account settings" };

export default async function SettingsPage() {
  const session = await getSession();
  const user = session?.user;

  const data = await prisma.user.findFirst({
    where: {
      id: user?.id,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="container mb-28 mt-5 flex max-w-[68rem]">
      <PersonnalInfo user={user} />
    </div>
  );
}
