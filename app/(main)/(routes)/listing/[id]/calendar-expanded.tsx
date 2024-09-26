"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";
import { useDatePick } from "@/app/context/date-pick-context";
import { eachDayOfInterval } from "date-fns";

const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [];

export default function Calendar2({
  reservation,
}: {
  reservation: { startDate: Date; endDate: Date }[];
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
    <>
      <div className="hidden w-full items-center rounded-lg border shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)] md:flex">
        <div className="mx-auto items-center p-1">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateRangePicker
              value={[startDate, endDate]}
              onChange={handleDateChange}
              disablePast
              shouldDisableDate={shouldDisableDate}
              slotProps={{
                // shortcuts: {
                //   items: shortcutsItems,
                // },
                actionBar: { actions: [] },
              }}
              calendars={2}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="w-[90Dvw] rounded-lg border p-1 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)] md:hidden">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateRangePicker
            value={[startDate, endDate]}
            onChange={handleDateChange}
            disablePast
            shouldDisableDate={shouldDisableDate}
            slotProps={{
              shortcuts: {
                items: shortcutsItems,
              },
              actionBar: { actions: [] },
            }}
          />
        </LocalizationProvider>
      </div>
    </>
  );
}
