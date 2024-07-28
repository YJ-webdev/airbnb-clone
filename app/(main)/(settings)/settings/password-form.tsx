"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePassword, UpdatePasswordSchema } from "@/schema";
import { updatePassword } from "@/app/action/update-profile";
import { useState } from "react";
import { UserWithRoleAndFavoriteIds } from "@/types";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";

import { FormError } from "@/app/components/form/form-error";
import { FormSuccess } from "@/app/components/form/form-success";
import { FormInput } from "@/app/components/form/form-input";
import { FormButton } from "./form-button";

interface PersonalInfoProps {
  user?: UserWithRoleAndFavoriteIds;
}

export const PasswordForm = ({ user }: PersonalInfoProps) => {
  const [passwordError, setPasswordError] = useState<string | undefined>("");
  const [passwordSuccess, setPasswordSuccess] = useState<string | undefined>(
    "",
  );
  const [isPending, setIsPending] = useState(false);

  const form = useForm<UpdatePassword>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onPasswordSubmit = async (values: UpdatePassword) => {
    setPasswordError("");
    setPasswordSuccess("");
    setIsPending(true);
    const data = await updatePassword(values);
    setPasswordError(data.error);
    setPasswordSuccess(data.success);
    setIsPending(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onPasswordSubmit)}
        className="relative flex w-full flex-col items-end gap-4"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput
                  {...field}
                  id="currentPassword"
                  label="Current Password"
                  name="currentPassword"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput
                  {...field}
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput
                  {...field}
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormButton isPending={isPending} />
        <div className="absolute bottom-0 right-1/2 flex translate-x-1/2 items-center justify-center gap-x-2">
          <FormError message={passwordError || ""} />
          <FormSuccess message={passwordSuccess || ""} />
        </div>
      </form>
    </Form>
  );
};
