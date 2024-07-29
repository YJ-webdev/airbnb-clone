import { redirect } from "next/navigation";
import { Metadata } from "next";

import { PersonalForm } from "./personal-form";
import { SecureLeaflet } from "./secure-leaflet";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { PasswordForm } from "./password-form";
import getSession from "@/app/lib/get-session";

export const metadata: Metadata = { title: "Airbnb | Account settings" };

export default async function SettingsPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="container mb-28 mt-5 flex max-w-2xl sm:min-h-[60vh]">
      <div className="flex w-full flex-col">
        <h1 className="mb-5 mt-5 text-xl font-semibold sm:mb-12 sm:text-2xl">
          Settings
        </h1>
        <div className="flex-grow" />
        <div className="flex gap-12 sm:top-1/2">
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
              {/* <hr />
              <PasswordForm user={user} /> */}
            </div>
            {/* <SecureLeaflet /> */}
          </div>
        </div>
        <div className="flex-grow" />
      </div>
    </div>
  );
}
