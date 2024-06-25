"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormElement } from "@/app/components/form-field";
import { User } from "next-auth";
import { Braeadcrumb } from "@/app/components/breadcrumb";

import { SecureLeaflet } from "@/app/components/secure-leaflet";

interface PersonalInfoProps {
  user: User;
}

const NameSchema = z.object({
  name: z.string().min(1),
});

const EmailSchema = z.object({
  email: z.string().email(),
});

export const PersonnalInfo = ({ user }: PersonalInfoProps) => {
  const nameform = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: user.name || "",
    },
  });

  const emailform = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: user.email || "",
    },
  });

  const username = user.name;
  const useremail = user.email;

  return (
    <div className="m-auto mb-80 mt-10 max-w-[68rem] px-10 md:px-10">
      <Braeadcrumb />
      <h1 className="my-6 text-3xl font-bold">Personal Info</h1>

      <div className="mt-12 flex justify-between">
        <div className="w-full md:w-3/5">
          <FormElement
            user={user}
            description="This is how your first name will appear to Hosts and guests. "
            id="name"
            label="Name"
            errors={nameform.formState.errors}
            form={nameform}
            data={username}
          />
          <FormElement
            user={user}
            description="Use an address you’ll always have access to."
            id="email"
            label="Email"
            errors={emailform.formState.errors}
            form={emailform}
            data={useremail}
          />
        </div>
        <SecureLeaflet />
      </div>
    </div>
  );
};
