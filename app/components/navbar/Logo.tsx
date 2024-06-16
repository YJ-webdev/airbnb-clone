"use client";

import DesktopLogo from "@/public/images/desktop-logo.png";
import MobileLogo from "@/public/images/airbnb-mobile.webp";
import Image from "next/image";

export const Logo = () => {
  return (
    <>
      <Image
        src={DesktopLogo}
        alt="Desktop Logo"
        height="100"
        width="100"
        className="hidden lg:block mr-6 cursor-pointer"
      />

      <Image
        src={MobileLogo}
        alt="Mobile Logo"
        height="100"
        width="100"
        className="w-11 lg:hidden block cursor-pointer"
      />
    </>
  );
};
