"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateProfile } from "@/app/actions/update-profile";
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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";

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
        className="relative flex w-full flex-col gap-6 md:w-3/5 md:flex-row"
      >
        <Avatar
          onClick={() => {}}
          className="group relative m-1 flex h-20 w-20 items-center justify-center self-center bg-zinc-200 transition-all duration-200 md:self-start"
        >
          {user.image ? (
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
          )}
          <Pencil className="absolute z-10 h-6 w-6 text-white opacity-0 transition-all duration-200 group-hover:opacity-100" />
        </Avatar>
        <div className="flex flex-1 flex-col items-end gap-3">
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
        </div>
      </form>
    </Form>
  );
};
