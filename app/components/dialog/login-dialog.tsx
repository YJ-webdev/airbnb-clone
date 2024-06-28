"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login, LoginSchema } from "@/schema";
import { login } from "@/action/login";

import { useState, useTransition } from "react";
import { FormError } from "../form-error";
import { Social } from "./social";
import { Button } from "@/components/ui/button";
import { Input } from "../Input";

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

export const LoginDialog = () => {
  const [error, setError] = useState<string | undefined>("");
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

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        if (!data?.error) {
          window.location.reload();
        }
      });
    });
  };

  return (
    <>
      <DialogHeader className="sticky top-0 -mb-4 border-b-[1px] px-6 pb-6 pt-6 text-center">
        <DialogTitle className="text-center">Welcome back!</DialogTitle>
        <DialogDescription className="text-center">
          Log in with your account
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
                      <Input
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
                      <Input
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
            <FormError message={error} />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[#d31152] to-[#e3326d] py-[25px] text-[16px] font-semibold"
            >
              {isPending ? "Please, wait.." : "Log in"}
            </Button>
          </form>
        </Form>
        <Social disabled={isPending} />
      </ScrollArea>
    </>
  );
};
