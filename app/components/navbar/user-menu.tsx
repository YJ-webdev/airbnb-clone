"use client";

import { User } from "next-auth";
import { signOut } from "next-auth/react";

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
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface UserMenuProps {
  user?: User;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex cursor-pointer items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md focus:outline-none md:px-2 md:py-1">
          <AiOutlineMenu className="md:ml-1" />
          <div className="hidden md:block">
            <UserAvatar user={user} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="top-12 w-60 space-y-0 overflow-hidden rounded-xl border-none py-1 shadow-[0_-2px_22px_5px_rgba(0,0,0,0.08)]"
        >
          {user ? (
            <>
              <DropdownMenuItem
                className="cursor-pointer px-3 py-3 text-[15px] font-semibold"
                onClick={() => {}}
              >
                Trips
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer px-3 py-3 text-[15px] font-semibold"
                onClick={() => {}}
              >
                Wishlists
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer px-3 py-3 text-[15px] font-light"
                onClick={() => {}}
              >
                Airbnb your home
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
            </>
          ) : (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="cursor-pointer px-3 py-3 text-[15px] font-semibold"
                  >
                    Log in
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="flex max-h-[75%] flex-col overflow-hidden p-0">
                  <LoginDialog />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="cursor-pointer px-3 py-3 text-[15px] font-light"
                  >
                    Sign Up
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="flex max-h-[75%] flex-col overflow-hidden p-0">
                  <RegisterDialog />
                </DialogContent>
              </Dialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {}}
                className="cursor-pointer px-3 py-3 text-[15px] font-light"
              >
                Airbnb your home
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
