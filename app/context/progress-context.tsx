"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProgressContextProps {
  progress: number;
  setProgress: (value: number) => void;
}

const ProgressContext = createContext<ProgressContextProps | undefined>(
  undefined,
);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState(0);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
