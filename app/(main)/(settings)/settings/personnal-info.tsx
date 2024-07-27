"use client";

import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateProfile,
  UpdateProfileSchema,
  UpdatePassword,
  UpdatePasswordSchema,
} from "@/schema";
import { updateProfile, updatePassword } from "@/app/action/update-profile";
import { useState } from "react";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/app/components/login-dialog/Input";
import { Pencil } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/app/components/login-dialog/form-error";
import { FormSuccess } from "@/app/components/login-dialog/form-success";

interface PersonalInfoProps {
  user?: UserWithRoleAndFavoriteIds;
}

const FormFieldComponent = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input {...field} id={name} label={label} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const PersonalInfo = ({ user }: PersonalInfoProps) => {
  const [profileError, setProfileError] = useState<string | undefined>("");
  const [passwordError, setPasswordError] = useState<string | undefined>("");
  const [profileSuccess, setProfileSuccess] = useState<string | undefined>("");
  const [passwordSuccess, setPasswordSuccess] = useState<string | undefined>(
    "",
  );
  const [isProfilePending, setProfilePending] = useState(false);
  const [isPasswordPending, setPasswordPending] = useState(false);

  const profileForm = useForm<UpdateProfile>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
    },
  });

  const passwordForm = useForm<UpdatePassword>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = async (values: UpdateProfile) => {
    setProfileError("");
    setProfileSuccess("");
    setProfilePending(true);
    await updateProfile(values).then((data) => {
      setProfileError(data.error);
      setProfileSuccess(data.success);
    });
    setProfilePending(false);
  };

  const onPasswordSubmit = async (values: UpdatePassword) => {
    setPasswordError("");
    setPasswordSuccess("");
    setPasswordPending(true);
    await updatePassword(values).then((data) => {
      setPasswordError(data.error);
      setPasswordSuccess(data.success);
    });
    setPasswordPending(false);
  };

  return (
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
        <FormProvider {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            className="relative flex w-full flex-col items-end gap-4"
          >
            <div className="flex w-full flex-col gap-4">
              <h3 className="font-semibold">Change Profile</h3>
              <FormFieldComponent name="name" label="Name" />
              <FormFieldComponent name="email" label="Email" />
            </div>
            <Button
              type="submit"
              disabled={isProfilePending}
              className="h-[50px] rounded-lg bg-rose-500 text-base font-semibold hover:bg-rose-400"
            >
              {isProfilePending ? "Updating..." : "Confirm"}
            </Button>
            <div className="absolute bottom-0 right-1/2 flex translate-x-1/2 items-center justify-center gap-x-2">
              <FormError message={profileError || ""} />
              <FormSuccess message={profileSuccess || ""} />
            </div>
          </form>
        </FormProvider>

        <FormProvider {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="relative flex w-full flex-col items-end gap-4"
          >
            <div className="flex w-full flex-col gap-4">
              <hr />
              <h3 className="font-semibold">Change Password</h3>
              <FormFieldComponent
                name="currentPassword"
                label="Current Password"
              />
              <FormFieldComponent name="newPassword" label="New Password" />
              <FormFieldComponent
                name="confirmPassword"
                label="Confirm Password"
              />
            </div>
            <Button
              type="submit"
              disabled={isPasswordPending}
              className="h-[50px] rounded-lg bg-rose-500 text-base font-semibold hover:bg-rose-400"
            >
              {isPasswordPending ? "Updating..." : "Confirm"}
            </Button>
            <div className="absolute bottom-0 right-1/2 flex translate-x-1/2 items-center justify-center gap-x-2">
              <FormError message={passwordError || ""} />
              <FormSuccess message={passwordSuccess || ""} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
