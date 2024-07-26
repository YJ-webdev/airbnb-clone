import { createListing } from "@/app/action/create-listing";
import { LogoHost } from "@/app/components/navbar/logo-host";
import getSession from "@/app/lib/get-session";

const HostNavbar = async () => {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id as string;
  const createListingWithId = createListing.bind(null, {
    userId,
  });

  return (
    <nav className="fixed z-10 mb-10 h-14 w-full bg-black py-3">
      <div className="container flex max-w-[1370px] items-center justify-between gap-3 px-5">
        <LogoHost />
        <h1 className="mb-10 line-clamp-1 translate-y-1 items-center justify-center text-center text-sm font-semibold text-white">
          We are excited to have you on board!
        </h1>
      </div>
    </nav>
  );
};

export default HostNavbar;
