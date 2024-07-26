"use client";

import DesktopLogo from "@/public/images/desktop-logo.png";
import MobileLogo from "@/public/images/airbnb-mobile.webp";
import Image from "next/image";
import "@/app/globals.css";
import Link from "next/link";

export const Logo = () => {
  return (
    <>
      <Link href="/">
        <Image
          src={DesktopLogo}
          alt="Desktop Logo"
          height="100"
          width="100"
          priority={true}
          className="desktop-logo mr-6 hidden cursor-pointer lg:block"
          style={{ height: "2rem" }}
        />

        <Image
          src={MobileLogo}
          alt="Mobile Logo"
          height="200"
          width="200"
          className="mobile-logo min-w-[44px] cursor-pointer lg:hidden"
        />
      </Link>
    </>
  );
};
