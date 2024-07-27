"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormElement } from "./form-element";
import { SecureLeaflet } from "./secure-leaflet";
import { Input } from "@/app/components/login-dialog/Input";
import { useState } from "react";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface PersonalInfoProps {
  user?: UserWithRoleAndFavoriteIds;
}

export const PersonnalInfo = ({ user }: PersonalInfoProps) => {
  const [name, setName] = useState(user?.name!);
  const [email, setEmail] = useState(user?.email!);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="w-full">
      <h1 className="my-6 text-2xl font-semibold">Settings</h1>

      <div className="mt-12 flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
        <Avatar className="group relative m-1 flex h-28 w-28 items-center justify-center bg-zinc-200 transition-all duration-200">
          {user ? (
            user.image ? (
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
            )
          ) : (
            <>
              <AvatarImage src="images/user.png" className="h-auto w-auto" />
            </>
          )}
          <Pencil className="absolute z-10 h-6 w-6 text-white opacity-0 transition-all duration-200 group-hover:opacity-100" />
        </Avatar>

        <div className="flex w-full flex-col items-end gap-4 md:flex-1">
          <div className="flex w-full flex-col gap-4">
            <h3 className="font-semibold">Change Profile</h3>
            <Input
              id="name"
              label="Name"
              value={name as string}
              onChange={handleNameChange}
            />
            <Input
              id="email"
              label="Email"
              value={email as string}
              onChange={handleEmailChange}
            />
          </div>
          <Button
            type="submit"
            className="h-[50px] rounded-lg bg-rose-500 text-base font-semibold hover:bg-rose-400"
          >
            Confirm
          </Button>
          <div className="flex w-full flex-col gap-4">
            <hr />
            <h3 className="font-semibold">Change Password</h3>
            <Input
              type="password"
              id="password"
              label="CurrentPassword"
              value={password as string}
              onChange={handlePasswordChange}
            />
            <Input
              type="password"
              id="newPassword"
              label="New Password"
              value={newPassword as string}
              onChange={handleNewPasswordChange}
            />
            <Input
              type="password"
              id="confirmPassword"
              label="Confirm Password"
              value={confirmPassword as string}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <Button
            type="submit"
            className="h-[50px] rounded-lg bg-rose-500 text-base font-semibold hover:bg-rose-400"
          >
            Confirm
          </Button>
        </div>

        <SecureLeaflet />
      </div>
    </div>
  );
};
