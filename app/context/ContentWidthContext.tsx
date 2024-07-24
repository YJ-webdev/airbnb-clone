"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface ContentWidthContextProps {
  contentWidth: string;
  setContentWidth: (width: string) => void;
}

const ContentWidthContext = createContext<ContentWidthContextProps | undefined>(
  undefined,
);

export const ContentWidthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contentWidth, setContentWidthState] = useState<string>("100%");

  const setContentWidth = useCallback((width: string) => {
    setContentWidthState(width);
  }, []);

  return (
    <ContentWidthContext.Provider value={{ contentWidth, setContentWidth }}>
      {children}
    </ContentWidthContext.Provider>
  );
};

export const useContentWidth = () => {
  const context = useContext(ContentWidthContext);
  if (context === undefined) {
    throw new Error(
      "useContentWidth must be used within a ContentWidthProvider",
    );
  }
  return context;
};
