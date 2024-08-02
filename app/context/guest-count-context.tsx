"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface GuestCountContextProps {
  adultCount: number;
  childCount: number;
  petCount: number;
  totalGuests: number;
  remainingGuests: number;
  setAdultCount: (count: number) => void;
  setChildCount: (count: number) => void;
  setPetCount: (count: number) => void;
}

const GuestCountContext = createContext<GuestCountContextProps>({
  adultCount: 1,
  childCount: 0,
  petCount: 0,
  totalGuests: 1,
  remainingGuests: 0,
  setAdultCount: () => {},
  setChildCount: () => {},
  setPetCount: () => {},
});

export const useGuestCount = () => useContext(GuestCountContext);

export const GuestCountProvider = ({
  children,
  maxGuests,
}: {
  children: React.ReactNode;
  maxGuests: number;
}) => {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [petCount, setPetCount] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [remainingGuests, setRemainingGuests] = useState(maxGuests - 1);

  useEffect(() => {
    const total = adultCount + childCount;
    setTotalGuests(total);
    setRemainingGuests(maxGuests - total);
  }, [adultCount, childCount, maxGuests]);

  return (
    <GuestCountContext.Provider
      value={{
        adultCount,
        childCount,
        petCount,
        totalGuests,
        remainingGuests,
        setAdultCount,
        setChildCount,
        setPetCount,
      }}
    >
      {children}
    </GuestCountContext.Provider>
  );
};
