import { LogoHost } from "@/app/components/navbar/logo-host";
import getSession from "@/app/lib/get-session";

const HostNavbar = async () => {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id as string;

  return (
    <nav className="fixed z-10 h-[50px] w-full bg-black py-3">
      <div className="container flex max-w-[1370px] items-center justify-between gap-3 px-5">
        <LogoHost />
        <h1 className="line-clamp-1 text-sm text-white">
          We are excited to have you on board!
        </h1>
      </div>
    </nav>
  );
};

export default HostNavbar;
