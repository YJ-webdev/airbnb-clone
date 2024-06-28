import getSession from "@/app/lib/get-session";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { PersonnalInfo } from "./personnal-info";

export const metadata: Metadata = { title: "Airbnb | Account settings" };

export default async function SettingsPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/?callbackUrl=/settings");
  }

  return <PersonnalInfo user={user} />;
}
