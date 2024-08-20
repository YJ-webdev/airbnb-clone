"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Social } from "./social";
import { FormInput } from "./form-input";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { register } from "@/app/actions/register";

import { Register, RegisterSchema } from "@/schema/auth";
import { SubmitButton } from "./submit-button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const RegisterDialog = ({ className }: { className?: string }) => {
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
    <>
      <DialogHeader
        className={cn(
          "sticky top-0 -mb-4 border-b-[1px] px-6 pb-6 pt-6 text-center",
          className,
        )}
      >
        <DialogTitle className="text-center">Welcome to Airbnb</DialogTitle>
        <DialogDescription className="text-center">
          Create your account
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="flex-1 overflow-auto p-6">
        <Form {...form}>
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
            <FormError message={error} />
            <FormSuccess message={success} />

            <SubmitButton isPending={isPending} label="Sign up" />

            <p className="text-center text-sm hover:underline">
              Already have an account?
            </p>
          </form>
        </Form>
        <Social />
      </ScrollArea>
    </>
  );
};
