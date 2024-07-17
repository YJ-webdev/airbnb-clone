import getSession from "@/app/lib/get-session";
import { Logo } from "./logo";
import { Search } from "./search";
import { UserMenu } from "./user-menu";
import { AirbnbYourHomeButton } from "./airbnb-your-home-button";
import { createListing } from "@/app/action/create-listing";

export const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <nav className="z-10 border-b bg-white py-4 shadow-sm">
      <div className="container flex items-center justify-between gap-3 md:gap-0">
        <Logo />
        <Search />
        <div className="flex">
          <AirbnbYourHomeButton user={user} />
          <UserMenu user={user} />
        </div>
      </div>
    </nav>
  );
};
