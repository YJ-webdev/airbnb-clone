"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Register, RegisterSchema } from "@/schema";
import { register } from "@/action/register";

import { useEffect, useState, useTransition } from "react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

interface RegisterDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterDialog = ({ isOpen, onClose }: RegisterDialogProps) => {
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

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setError("");
      setSuccess("");
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[75%] overflow-hidden flex flex-col p-0">
        <DialogHeader className="sticky top-0 pb-6 border-b-[1px] text-center pt-6 px-6 -mb-4">
          <DialogTitle className="text-center">Welcome to Airbnb</DialogTitle>
          <DialogDescription className="text-center">
            Create your account
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 overflow-auto p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="email"
                          {...field}
                          label="Email"
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
                        <Input
                          id="name"
                          {...field}
                          label="Name"
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
                          id="password"
                          {...field}
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
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                type="submit"
                className="rounded-lg w-full font-semibold text-[16px] py-6 bg-gradient-to-r from-[#d31152] to-[#ec316f]"
              >
                Sign up
              </Button>
            </form>
          </Form>
          <Social />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
