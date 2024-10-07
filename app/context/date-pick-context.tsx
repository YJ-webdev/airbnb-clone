"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// Extend Day.js with the plugin
dayjs.extend(isSameOrBefore);

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

  // Function to ensure end date is after start date
  const handleSetEndDate = (newEndDate: Dayjs | null) => {
    if (startDate && newEndDate) {
      // Check if the new end date is before or the same as the start date
      if (dayjs(newEndDate).isSameOrBefore(startDate, "day")) {
        const minEndDate = dayjs(startDate).add(1, "day"); // Set to 1 day after start date
        setEndDate(minEndDate); // Automatically adjust end date
      } else {
        setEndDate(newEndDate); // Approve setting the end date
      }
    } else {
      setEndDate(newEndDate); // Set end date as normal
    }
  };

  return (
    <DatePickContext.Provider
      value={{
        startDate,
        endDate,
        stayingNights,
        setStartDate,
        setEndDate: handleSetEndDate, // Use the new function here
      }}
    >
      {children}
    </DatePickContext.Provider>
  );
};
