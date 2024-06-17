"use client";

import DesktopLogo from "@/public/images/desktop-logo.png";
import MobileLogo from "@/public/images/airbnb-mobile.webp";
import Image from "next/image";
import "@/app/globals.css";

export const Logo = () => {
  return (
    <>
      <Image
        src={DesktopLogo}
        alt="Desktop Logo"
        height="100"
        width="100"
        priority={true}
        className="hidden lg:block mr-6 cursor-pointer desktop-logo"
        style={{ height: "2rem" }}
      />
      <Image
        src={MobileLogo}
        alt="Mobile Logo"
        height="100"
        width="100"
        className="lg:hidden md:block hidden cursor-pointer mobile-logo"
      />
    </>
  );
};
