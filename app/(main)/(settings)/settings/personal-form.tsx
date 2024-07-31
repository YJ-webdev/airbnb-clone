"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateProfile } from "@/app/action/update-profile";
import { useState, useTransition } from "react";

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
import { UpdateProfile, UpdateProfileSchema } from "@/schema/profile";
import { User } from "@prisma/client";
import { UserWithRoleAndFavoriteIds } from "@/types";

interface PersonalInfoProps {
  user: UserWithRoleAndFavoriteIds;
}

export const PersonalForm = ({ user }: PersonalInfoProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateProfile>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      email: user.email || undefined,
      name: user.name || undefined,
      // phone: user.phone || undefined,
      // governmentId: user.governmentId || undefined,
      // address: user.address || undefined,
      // emergencyContact: user.emergencyContact || undefined,
    },
  });

  async function onSubmit(values: UpdateProfile) {
    try {
      await updateProfile(values);
      console.log(user);
      form.reset(values);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex w-full flex-col items-end gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput {...field} id="name" label="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput {...field} id="email" label="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput {...field} id="phone" label="Phone number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="governmentId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput {...field} id="governmentId" label="Government ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput {...field} id="address" label="Adress" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emergency Contact"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput
                  {...field}
                  id="emergencyContact"
                  label="Emergency Contact"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormButton disabled={isPending} />
        <div className="absolute bottom-0 right-1/2 flex translate-x-1/2 items-center justify-center gap-x-2">
          <FormError message={error || undefined} />
          <FormSuccess message={success || undefined} />
        </div>
      </form>
    </Form>
  );
};
