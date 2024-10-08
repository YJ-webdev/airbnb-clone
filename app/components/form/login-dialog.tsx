"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { FormError } from "./form-error";
import { Social } from "./social";

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
  DialogContent,
} from "@/components/ui/dialog";
import { login } from "@/app/actions/login";
import { cn } from "@/lib/utils";
import { FormSuccess } from "./form-success";
import { FormInput } from "./form-input";

import { Login, LoginSchema } from "@/schema/auth";
import { SubmitButton } from "./submit-button";

interface LoginDialogProps {
  urlError?: string;
  title?: string;
  subTitle?: string;
  onOpenRegister: () => void;
}

export const LoginDialog = ({
  urlError,
  title,
  subTitle,
  onOpenRegister,
}: LoginDialogProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: Login) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <DialogContent className="flex max-h-[75%] flex-col overflow-hidden p-0">
      <DialogHeader
        className={cn(
          "sticky top-0 -mb-4 border-b-[1px] px-6 pb-6 pt-6 text-center",
          title && "border-none",
        )}
      >
        <DialogTitle className="text-center">
          {title ?? "Welcome back!"}
        </DialogTitle>
        <DialogDescription className="text-center">
          {subTitle ?? "Log in with your account"}
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
                        disabled={isPending}
                        id="email"
                        label="Email"
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
                        {...field}
                        disabled={isPending}
                        id="password"
                        type="password"
                        label="Password"
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

            <SubmitButton isPending={isPending} label="Log in" />

            <p
              className="text-center text-sm hover:underline"
              onClick={onOpenRegister}
            >
              You don&apos;t have an account?
            </p>
          </form>
        </Form>
        <Social disabled={isPending} />
      </ScrollArea>
    </DialogContent>
  );
};
