"use client";

import { Logo } from "./logo";
import { createListing } from "@/app/action/create-listing";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginDialog } from "../login-dialog/login-dialog";
import { UserMenu } from "./user-menu";
import { useContentWidth } from "@/app/context/ContentWidthContext";
import styled from "styled-components";
import { Search } from "./search";
import { UserWithRoleAndFavoriteIds } from "@/types";

interface ResponsiveContainerProps {
  user?: UserWithRoleAndFavoriteIds;
}

export const ResponsiveContainer = ({ user }: ResponsiveContainerProps) => {
  const userId = user?.id as string;
  const createListingWithId = createListing.bind(null, {
    userId,
  });

  const ResponsiveContainer = styled.div<{ contentWidth: string }>`
    max-width: ${({ contentWidth }) => contentWidth};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  `;

  const { contentWidth } = useContentWidth();

  return (
    <ResponsiveContainer contentWidth={contentWidth}>
      <div className="container flex items-center justify-between gap-3 md:gap-0">
        <Logo />
        <Search />
        <div className="flex">
          {user ? (
            <form action={createListingWithId}>
              <button
                type="submit"
                className="line-clamp-1 hidden cursor-pointer text-nowrap rounded-full py-3 text-center text-[15px] font-semibold transition hover:bg-neutral-100 md:block md:px-4 lg:mr-4"
              >
                Airbnb your home
              </button>
            </form>
          ) : (
            <Dialog>
              <DialogTrigger className="line-clamp-1 hidden cursor-pointer text-nowrap rounded-full py-3 text-center text-[15px] font-semibold transition hover:bg-neutral-100 md:block md:px-4 lg:mr-4">
                Airbnb your home
              </DialogTrigger>
              <DialogContent className="flex max-h-[75%] flex-col overflow-hidden p-0">
                <LoginDialog />
              </DialogContent>
            </Dialog>
          )}

          <UserMenu user={user} />
        </div>
      </div>
    </ResponsiveContainer>
  );
};
