"use client";

import { signOut } from "next-auth/react";
import { UserAvatar } from "./user-avatar";
import { AiOutlineMenu } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { continueListing } from "@/app/actions/create-listing";
import { UserWithRoleAndFavoriteIds } from "@/types";

import { RegisterDialog } from "../form/register-dialog";
import { LoginDialog } from "../form/login-dialog";
import { useRef, useState } from "react";

interface UserMenuProps {
  user?: UserWithRoleAndFavoriteIds;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const continueListingWithId = continueListing.bind(null, user?.id as string);

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  const handleOpenRegister = () => {
    setOpenLoginDialog(false); // Close login dialog
    setOpenRegisterDialog(true); // Open register dialog
  };

  const handleOpenLogin = () => {
    setOpenLoginDialog(true); // Open login dialog
    setOpenRegisterDialog(false); // Close register dialog
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex cursor-pointer items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1">
          <AiOutlineMenu className="md:ml-1" />
          <div className="hidden md:block">
            <UserAvatar user={user} />
          </div>
        </DropdownMenuTrigger>

        {user ? (
          <DropdownMenuContent
            align="end"
            className="top-12 w-60 space-y-0 overflow-hidden rounded-xl border-none py-1 shadow-[0_2px_10px_3px_rgba(0,0,0,0.05)]"
          >
            <DropdownMenuItem
              asChild
              className="cursor-pointer px-3 py-3 text-[15px] font-semibold"
            >
              <Link href="/reservations">Trips</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="cursor-pointer px-3 py-3 text-[15px] font-light"
            >
              <Link href="/favorite">Wishlists</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer px-3 py-3 text-[15px] font-light">
              <form action={continueListingWithId} className="w-full">
                <button type="submit" className="w-full text-start">
                  Airbnb your home
                </button>
              </form>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className="cursor-pointer px-3 py-3 text-[15px] font-light"
            >
              <Link href="/settings">Account settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer px-3 py-3 text-[15px] font-light"
              onClick={() => signOut()}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent
            align="end"
            className="top-12 w-40 space-y-0 overflow-hidden rounded-xl border-none py-1 shadow-[0_2px_10px_3px_rgba(0,0,0,0.05)]"
          >
            <Dialog open={openLoginDialog} onOpenChange={setOpenLoginDialog}>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer px-3 py-3 text-[15px] font-semibold"
                >
                  Log in
                </DropdownMenuItem>
              </DialogTrigger>

              <LoginDialog onOpenRegister={handleOpenRegister} />
            </Dialog>
            <Dialog
              open={openRegisterDialog}
              onOpenChange={setOpenRegisterDialog}
            >
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer px-3 py-3 text-[15px] font-light"
                >
                  Sign Up
                </DropdownMenuItem>
              </DialogTrigger>

              <RegisterDialog onOpenLogin={handleOpenLogin} />
            </Dialog>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
};
