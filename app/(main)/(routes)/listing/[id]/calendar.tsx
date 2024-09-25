"use client";

import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useDatePick } from "@/app/context/date-pick-context";
import dayjs, { Dayjs } from "dayjs";
import { eachDayOfInterval } from "date-fns";

export default function Calendar({
  reservation,
}: {
  reservation:
    | {
        startDate: Date;
        endDate: Date;
      }[]
    | undefined;
}) {
  const { startDate, endDate, setStartDate, setEndDate } = useDatePick();

  const sixMonthsFromNow = dayjs().add(6, "month");

  let disableDates: Date[] = [];

  reservation?.forEach((reservationItem) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate),
    });

    disableDates = [...disableDates, ...dateRange];
  });

  const shouldDisableDate = (date: Dayjs) => {
    const isDisabled = disableDates.some((disabledDate) =>
      dayjs(disabledDate).isSame(date, "day"),
    );
    const isAfterSixMonths = dayjs(date).isAfter(sixMonthsFromNow, "day");

    return isDisabled || isAfterSixMonths;
  };

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
          shouldDisableDate={shouldDisableDate}
          localeText={{ start: "Check-in", end: "Check-out" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
