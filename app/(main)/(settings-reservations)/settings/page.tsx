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
    <div className="container mb-28 mt-10 flex max-w-[1280px] sm:min-h-[60vh]">
      <div className="flex w-full flex-col">
        <header className="mb-8 flex flex-col items-baseline justify-center">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p>
            Your name, profile image and contact information will be shown to
            guests.
          </p>
        </header>

        <div className="flex flex-1 flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          <Avatar className="group relative m-1 flex h-20 w-20 items-center justify-center bg-zinc-200 transition-all duration-200">
            {user ? (
              user.image ? (
                <AvatarImage
                  src={user.image}
                  className="h-full w-full group-hover:brightness-[70%]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center transition-all duration-200 group-hover:opacity-50">
                  <span className="text-center text-lg font-medium text-white">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )
            ) : (
              <AvatarImage src="images/user.png" className="h-auto w-auto" />
            )}
            <Pencil className="absolute z-10 h-6 w-6 text-white opacity-0 transition-all duration-200 group-hover:opacity-100" />
          </Avatar>
          <div className="flex w-full flex-col gap-4 md:flex-1">
            <PersonalForm user={user} />
            {/* <hr /> */}
            {/* <PasswordForm user={user} /> */}
          </div>
          <SecureLeaflet />
        </div>
      </div>
    </div>
  );
}
