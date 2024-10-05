"use client";

import { TriangleAlert } from "lucide-react";
import { FormError } from "@/app/components/form/form-error";
import { FormInput } from "@/app/components/form/form-input";
import { FormSuccess } from "@/app/components/form/form-success";
import { Social } from "@/app/components/form/social";
import { SubmitButton } from "@/app/components/form/submit-button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Register, RegisterSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { register } from "../actions/register";

export default function AuthRegister() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider."
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: Register) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className="mx-auto mb-20 mt-10 flex max-w-[480px] flex-col overflow-hidden p-0">
      <div className="flex max-h-[75%] flex-col overflow-hidden p-0">
        <div
          className={cn(
            "sticky top-0 space-y-3 border-b-[1px] px-6 pb-6 pt-6 text-center",
            "mb-2 border-none",
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <h2 className="relative text-center text-lg font-semibold">
              <TriangleAlert className="absolute -left-8 top-1 h-5 w-5" />
              Something went wrong
            </h2>
          </div>
          <p className="text-center text-sm">Create your account</p>
        </div>

        {/* Wrapping all form fields within the FormProvider */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormInput
                        {...field}
                        id="email"
                        label="Email"
                        disabled={isPending}
                        errors={form.formState.errors}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormInput
                        id="name"
                        {...field}
                        label="Name"
                        disabled={isPending}
                        errors={form.formState.errors}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormInput
                        id="password"
                        {...field}
                        type="password"
                        label="Password"
                        disabled={isPending}
                        errors={form.formState.errors}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <SubmitButton isPending={isPending} label="Sign up" />
          </form>
        </FormProvider>

        <Social disabled={isPending} />
      </div>
    </div>
  );
}
