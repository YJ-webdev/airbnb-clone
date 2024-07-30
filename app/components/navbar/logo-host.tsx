import Image from "next/image";
import Link from "next/link";
import React from "react";
import WhiteLogo from "@/public/images/whitelogo.png";

export const LogoHost = () => {
  return (
    <Link href="/">
      <Image
        src={WhiteLogo}
        alt="Host Logo"
        height="100"
        width="200"
        className="z-10 w-[80px]"
      />
    </Link>
  );
};
