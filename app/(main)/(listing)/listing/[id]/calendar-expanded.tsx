"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";

const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
  {
    label: "This Week",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("week"), today.endOf("week")];
    },
  },

  {
    label: "Current Month",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Next Month",
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf("month").add(1, "day");
      return [startOfNextMonth, startOfNextMonth.endOf("month")];
    },
  },
  { label: "Reset", getValue: () => [null, null] },
];

export default function calendar2() {
  return (
    <>
      <div className="hidden rounded-lg border p-1 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)] md:block">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateRangePicker
            disablePast
            slotProps={{
              shortcuts: {
                items: shortcutsItems,
              },
              actionBar: { actions: [] },
            }}
            calendars={2}
          />
        </LocalizationProvider>
      </div>

      <div className="rounded-lg border p-1 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)] md:hidden">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateRangePicker
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
