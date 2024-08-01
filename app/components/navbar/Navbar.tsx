import { cn } from "@/lib/utils";
import getSession from "@/app/lib/get-session";

import { Logo } from "./logo";
import { LoginDialog } from "../form/login-dialog";
import { UserMenu } from "./user-menu";
import { Search } from "./search";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { continueListing } from "@/app/actions/create-listing";

type NavbarProps = {
  width?: string;
};

const Navbar = async ({ width }: NavbarProps) => {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id as string;
  const continueListingWithId = continueListing.bind(null, userId);

  return (
    <div className="z-10 border-b bg-white py-4 shadow-sm">
      <nav
        className={cn(
          "mx-auto flex items-center justify-between gap-3 px-5 md:gap-0",
          width ? `max-w-[1280px]` : "max-w-[1400px]",
        )}
      >
        <Logo />
        <Search />
        <div className="flex">
          {user ? (
            <form action={continueListingWithId}>
              <button
                type="submit"
                className="mr-2 line-clamp-1 hidden cursor-pointer text-nowrap rounded-full py-3 text-center text-[15px] font-semibold transition hover:bg-neutral-100 md:block md:px-4 lg:mr-4"
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
      </nav>
    </div>
  );
};

export default Navbar;
