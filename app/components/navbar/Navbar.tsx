import getSession from "@/app/lib/get-session";
import { Logo } from "./logo";
import { Search } from "./search";
import { UserMenu } from "./user-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginDialog } from "../login-dialog/login-dialog";
import { createListing } from "@/app/action/create-listing";
import prisma from "@/app/lib/db";

export const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;

  const createListingWithId = createListing.bind(null, {
    userId: user?.id as string,
  });

  return (
    <nav className="z-10 border-b bg-white py-4 shadow-sm">
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
    </nav>
  );
};
