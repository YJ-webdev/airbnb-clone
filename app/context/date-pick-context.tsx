"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface DatePickContextProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  stayingNights: number;
  setStartDate: (startDate: Dayjs | null) => void;
  setEndDate: (endDate: Dayjs | null) => void;
}

const DatePickContext = createContext<DatePickContextProps>({
  startDate: null,
  endDate: null,
  stayingNights: 0,
  setStartDate: () => {},
  setEndDate: () => {},
});

export const useDatePick = () => useContext(DatePickContext);

export const DatePickProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [stayingNights, setStayingNights] = useState(1);

  useEffect(() => {
    if (startDate && endDate) {
      const nights = dayjs(endDate).diff(dayjs(startDate), "day");
      setStayingNights(nights);
    } else {
      setStayingNights(1);
    }
  }, [startDate, endDate]);

  return (
    <DatePickContext.Provider
      value={{
        startDate,
        endDate,
        stayingNights,
        setStartDate,
        setEndDate,
      }}
    >
      {children}
    </DatePickContext.Provider>
  );
};
