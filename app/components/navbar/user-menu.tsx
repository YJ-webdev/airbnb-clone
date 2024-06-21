"use client";

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";

import { LoginDialog } from "../dialog/login-dialog";
import { RegisterDialog } from "../dialog/register-dialog";
import { UserAvatar } from "./user-avatar";

import { AiOutlineMenu } from "react-icons/ai";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  user?: User;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginDialogOpen(true);
  };

  const handleCloseLoginDialog = () => {
    setIsLoginDialogOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterDialogOpen(true);
  };

  const handleCloseRegisterDialog = () => {
    setIsRegisterDialogOpen(false);
  };

  return (
    <>
      <div className="relative">
        <div className="flex items-center gap-auto">
          <div
            onClick={() => {}}
            className="hidden md:block lg:mr-4 text-sm text-center line-clamp-1 text-nowrap font-semibold py-3 md:px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            Airbnb your home
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
              <AiOutlineMenu className="md:ml-1" />
              <div className="hidden md:block">
                <UserAvatar user={user} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-xl shadow-[0_-1px_20px_3px_rgba(0,0,0,0.05)] w-48 overflow-hidden top-12 border-none py-1 space-y-0"
            >
              {user ? (
                <>
                  <DropdownMenuItem
                    className="px-3 py-3 cursor-pointer text-[15px]"
                    onClick={() => {}}
                  >
                    My trips
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-3 py-3 cursor-pointer text-[15px]"
                    onClick={() => {}}
                  >
                    My favorites
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-3 py-3 cursor-pointer text-[15px]"
                    onClick={() => {}}
                  >
                    My reservations
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-3 py-3 cursor-pointer text-[15px]"
                    onClick={() => {}}
                  >
                    My property
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-3 py-3 cursor-pointer text-[15px]"
                    onClick={() => {}}
                  >
                    Airbnb my home
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="px-3 py-3 cursor-pointer text-[15px]"
                    onClick={() => signOut()}
                  >
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    className="px-3 py-3 cursor-pointer text-[15px]"
                    onClick={handleLoginClick}
                  >
                    Log in
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleRegisterClick}
                    className="px-3 py-3 cursor-pointer text-[15px]"
                  >
                    Sign up
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {}}
                    className="px-3 py-3 cursor-pointer text-[15px]"
                  >
                    Airbnb your home
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={handleCloseLoginDialog}
      />
      <RegisterDialog
        isOpen={isRegisterDialogOpen}
        onClose={handleCloseRegisterDialog}
      />
    </>
  );
};
