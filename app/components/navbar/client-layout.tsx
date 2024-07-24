"use client";

import React from "react";
import styled from "styled-components";
import Navbar from "./navbar";
import { useContentWidth } from "@/app/context/ContentWidthContext";

const ResponsiveNavbar = styled.div<{ contentWidth: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto; // Center the navbar
  display: flex;
  justify-content: space-between;
`;

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { contentWidth } = useContentWidth();

  return (
    <>
      <ResponsiveNavbar contentWidth={contentWidth}>
        <Navbar />
      </ResponsiveNavbar>
      <main>{children}</main>
    </>
  );
};

export default ClientLayout;
