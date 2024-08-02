"use client";

import { createContext, useContext, useState } from "react";
import { Dayjs } from "dayjs";

interface DatePickContextProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDate: (startDate: Dayjs) => void;
  setEndDate: (endDate: Dayjs) => void;
}

const DatePickContext = createContext<DatePickContextProps>({
  startDate: null,
  endDate: null,
  setStartDate: () => {},
  setEndDate: () => {},
});

export const useDatePick = () => {
  const context = useContext(DatePickContext);
  if (!context) {
    throw new Error("useDatePick must be used within a DatePickProvider");
  }
  return context;
};

export const DatePickProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  return (
    <DatePickContext.Provider
      value={{ startDate, endDate, setStartDate, setEndDate }}
    >
      {children}
    </DatePickContext.Provider>
  );
};
