import { redirect } from "next/navigation";
import { Metadata } from "next";

import { PersonalForm } from "./personal-form";
import { SecureLeaflet } from "./secure-leaflet";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";

import getSession from "@/app/lib/get-session";

export const metadata: Metadata = { title: "Airbnb | Account settings" };

export default async function SettingsPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="mb-28 flex max-w-[1280px] sm:min-h-[60vh]">
      <div className="flex w-full flex-col">
        <header className="mb-12 flex flex-col items-baseline justify-center">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p>
            Your name, profile image and contact information will be shown to
            guests.
          </p>
        </header>

        <div className="flex w-full gap-4 md:flex-1">
          <PersonalForm user={user} />
          {/* <hr /> */}
          {/* <PasswordForm user={user} /> */}
          <SecureLeaflet />
        </div>
      </div>
    </div>
  );
}
