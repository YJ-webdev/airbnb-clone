import { LogoHost } from "@/app/components/navbar/logo-host";
import getSession from "@/app/lib/get-session";
import { DoorClosed, DoorOpen } from "lucide-react";
import Link from "next/link";

const HostNavbar = async () => {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id as string;

  return (
    <nav className="fixed z-10 h-[50px] w-full bg-black py-3">
      <div className="container flex max-w-[1370px] items-center justify-between gap-3 px-5">
        <LogoHost />
        <Link
          href="/host"
          className="line-clamp-1 flex items-center text-white hover:text-gray-300"
        >
          Exit{" "}
          <DoorOpen strokeWidth={1.5} className="ml-2 inline-block h-6 w-6" />
        </Link>
      </div>
    </nav>
  );
};

export default HostNavbar;
