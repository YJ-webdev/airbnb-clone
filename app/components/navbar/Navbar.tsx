import React from "react";
import getSession from "@/app/lib/get-session"; // Adjust path as necessary
import { ResponsiveContainer } from "./responsive-container";

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <nav className="z-10 border-b bg-white py-4 shadow-sm">
      <ResponsiveContainer user={user} />
    </nav>
  );
};

export default Navbar;
