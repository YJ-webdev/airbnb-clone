"use client";

import { Dayjs } from "dayjs";
import { createContext, useContext, useState } from "react";

interface SearchContextType {
  inputValue: string;
  setInputValue: (value: string) => void;
  checkIn: Dayjs | undefined;
  setCheckIn: (value: Dayjs) => void;
  checkOut: Dayjs | undefined;
  setCheckOut: (value: Dayjs) => void;
  guests: number;
  setGuests: (value: number) => void;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputValue, setInputValue] = useState("");
  const [checkIn, setCheckIn] = useState<Dayjs | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Dayjs | undefined>(undefined);
  const [guests, setGuests] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    new URLSearchParams(),
  );

  return (
    <SearchContext.Provider
      value={{
        inputValue,
        setInputValue,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        guests,
        setGuests,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
