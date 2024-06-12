"use client";

import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/images/logo.png"
      alt="Logo"
      height="100"
      width="100"
      className="hidden md:block cursor-pointer"
    />
  );
};
