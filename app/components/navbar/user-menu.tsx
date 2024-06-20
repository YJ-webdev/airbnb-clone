"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { LoginDialog } from "../dialog/login-dialog";
import { RegisterDialog } from "../dialog/register-dialog";
import { User } from "@prisma/client";
import { logOut } from "@/action/login";

interface UserMenuProps {
  currentUser?: User | null;
}

export const UserMenu = ({ currentUser }: UserMenuProps) => {
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
                <Avatar className="w-8 h-8 m-1">
                  <AvatarImage
                    src="images/user.png"
                    className="w-auto h-auto"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-xl shadow-[0_-1px_20px_3px_rgba(0,0,0,0.05)] w-48 bg-white overflow-hidden top-12 border-none py-3 space-y-2"
            >
              {currentUser ? (
                <>
                  <DropdownMenuItem
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    My trips
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    My favorites
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    My reservations
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    Airbnb my home
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    My property
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => logOut()}
                  >
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    className="px-3 py-2 cursor-pointer"
                    onClick={handleLoginClick}
                  >
                    Log in
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleRegisterClick}
                    className="px-3 py-2 cursor-pointer"
                  >
                    Sign up
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {}}
                    className="px-3 py-2 cursor-pointer"
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
