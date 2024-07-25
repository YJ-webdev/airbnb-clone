"use client";

import { useEffect } from "react";
import { PersonnalInfo } from "./personnal-info";
import { useContentWidth } from "@/app/context/ContentWidthContext";
import { UserWithRoleAndFavoriteIds } from "@/types";

interface ClientPageProps {
  name: string;
  email: string;
  image: string;
}

const ClientPage = ({ name, email, image }: ClientPageProps) => {
  const { setContentWidth } = useContentWidth();

  useEffect(() => {
    setContentWidth("1088px"); // Example width for max-w-7xl

    return () => {
      setContentWidth("100%"); // Reset to default width on unmount
    };
  }, [setContentWidth]);

  return (
    <div className="container mb-80 mt-10 max-w-[68rem]">
      <PersonnalInfo name={name} email={email} image={image} />
    </div>
  );
};

export default ClientPage;
