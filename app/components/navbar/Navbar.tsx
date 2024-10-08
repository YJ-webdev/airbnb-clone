import { cn } from "@/lib/utils";
import getSession from "@/app/lib/get-session";

import { Logo } from "./Logo";
import { UserMenu } from "./user-menu";
import { Search } from "./Search";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { continueListing } from "@/app/actions/create-listing";
import { AuthDialog } from "../auth-dialog";

export type Width = {
  width?: "1100px" | "1280px";
};

export const Navbar = async ({ width }: Width) => {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id as string;
  const continueListingWithId = continueListing.bind(null, userId);

  return (
    <div className="sticky top-0 z-50 border-b bg-white py-4">
      <nav
        className={cn(
          "relative mx-auto flex max-w-[1400px] items-start justify-between gap-3 px-5 md:gap-0",
          width === "1280px" && `max-w-[1280px]`,
          width === "1100px" && `max-w-[1100px]`,
        )}
      >
        <Logo />
        <Search />
        <div className="flex place-self-end self-start">
          {user ? (
            <form action={continueListingWithId}>
              <button
                type="submit"
                className="mr-2 mt-1 line-clamp-1 hidden cursor-pointer text-nowrap rounded-full py-3 text-center text-[15px] font-semibold transition hover:bg-neutral-100 md:block md:border md:px-4 lg:mr-4"
              >
                Airbnb your home
              </button>
            </form>
          ) : (
            <AuthDialog />
          )}

          <UserMenu user={user} />
        </div>
      </nav>
    </div>
  );
};
