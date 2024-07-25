import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Braeadcrumb } from "./breadcrumb";
import { FormElement } from "./form-element";
import { SecureLeaflet } from "./secure-leaflet";
import { Input } from "@/app/components/login-dialog/Input";

interface PersonalInfoProps {
  name: string;
  email: string;
  image: string;
}

export const PersonnalInfo = ({ name, email, image }: PersonalInfoProps) => {
  return (
    <div className="w-full">
      <Braeadcrumb />
      <h1 className="my-6 text-3xl font-bold">Personal Info</h1>

      <div className="mt-12 flex justify-between">
        <div className="flex w-full flex-col gap-4 md:w-3/5">
          <Input id="name" label="Name" value={name} />

          <Input id="email" label="Email" value={email} />
          <Input id="image" label="Image" value={image} />
        </div>
        <SecureLeaflet />
      </div>
    </div>
  );
};
