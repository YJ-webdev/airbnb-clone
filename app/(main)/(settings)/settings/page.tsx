import { redirect } from "next/navigation";
import { Metadata } from "next";

import getSession from "@/app/lib/get-session";
import { PersonalInfo } from "./personnal-info";
import { SecureLeaflet } from "./secure-leaflet";

export const metadata: Metadata = { title: "Airbnb | Account settings" };

export default async function SettingsPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="container mb-28 mt-5 flex max-w-[68rem]">
      <div className="w-full">
        <h1 className="mb-5 mt-5 text-xl font-semibold sm:mb-12 sm:text-2xl">
          Settings
        </h1>
        <div className="flex gap-12">
          <PersonalInfo user={user} />
          <SecureLeaflet />
        </div>
      </div>
    </div>
  );
}
