"use client";

import DesktopLogo from "@/public/images/desktop-logo.png";
import MobileLogo from "@/public/images/airbnb-mobile.webp";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <div className="min-w-fit cursor-pointer place-self-start">
      <Link href="/">
        <Image
          src={DesktopLogo}
          alt="Desktop Logo"
          height="100"
          width="100"
          priority={true}
          className="desktop-logo mt-2 hidden lg:block xl:static"
          style={{ height: "2rem" }}
        />

        <Image
          src={MobileLogo}
          alt="Mobile Logo"
          height="200"
          width="200"
          className="mobile-logo mt-[1px] min-w-[44px] lg:hidden"
        />
      </Link>
    </div>
  );
};
