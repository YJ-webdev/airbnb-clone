"use client";

import { useContentWidth } from "@/app/context/ContentWidthContext";
import { useEffect } from "react";

export default function BecomeAHostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setContentWidth } = useContentWidth();

  useEffect(() => {
    setContentWidth("1340px"); // Example width for max-w-7xl
    return () => {
      setContentWidth("100%"); // Reset to default width on unmount
    };
  }, [setContentWidth]);

  return <div className="mx-auto mt-3">{children}</div>;
}
