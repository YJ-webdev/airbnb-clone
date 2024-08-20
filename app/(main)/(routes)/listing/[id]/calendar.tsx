"use client";

import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useDatePick } from "@/app/context/date-pick-context";

export default function Calendar() {
  const { startDate, endDate, setStartDate, setEndDate } = useDatePick();

  const handleDateChange = (newValue: any) => {
    setStartDate(newValue[0]);
    setEndDate(newValue[1]); // newValue is an array with the start and end dates
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <DateRangePicker
          value={[startDate, endDate]}
          onChange={handleDateChange}
          disablePast
          // shouldDisableDate={}
          localeText={{ start: "Check-in", end: "Check-out" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
