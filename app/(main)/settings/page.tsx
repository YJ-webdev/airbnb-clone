import { redirect } from "next/navigation";
import { Metadata } from "next";
import ClientPage from "./client-page";
import prisma from "@/app/lib/db";
import getSession from "@/app/lib/get-session";

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
    redirect("/?callbackUrl=/settings");
  }

  return (
    <ClientPage name={user?.name!} email={user?.email!} image={user?.image!} />
  );
}
