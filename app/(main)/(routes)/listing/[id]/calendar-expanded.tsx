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

const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [];

export default function Calendar2() {
  const { startDate, endDate, setStartDate, setEndDate } = useDatePick();

  const sixMonthsFromNow = dayjs().add(6, "month");

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
              shouldDisableDate={(date) =>
                dayjs(date).isAfter(sixMonthsFromNow, "day")
              }
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
            shouldDisableDate={(date) =>
              dayjs(date).isAfter(sixMonthsFromNow, "day")
            }
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
