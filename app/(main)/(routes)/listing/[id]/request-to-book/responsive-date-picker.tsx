import React from "react";
import dayjs, { Dayjs } from "dayjs";
import useForkRef from "@mui/utils/useForkRef";
import { DateRange, FieldType } from "@mui/x-date-pickers-pro/models";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DateRangePicker,
  DateRangePickerProps,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeFieldProps } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { eachDayOfInterval } from "date-fns";

interface DateRangeButtonFieldProps
  extends SingleInputDateRangeFieldProps<Dayjs> {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}

type DateRangeButtonFieldComponent = React.ForwardRefExoticComponent<
  DateRangeButtonFieldProps & React.RefAttributes<HTMLDivElement>
> & {
  displayName?: string;
  fieldType?: FieldType;
};

const DateRangeButtonField = React.forwardRef(
  (props: DateRangeButtonFieldProps, ref: React.Ref<HTMLElement>) => {
    const {
      setOpen,
      label,
      id,
      disabled,
      InputProps: { ref: containerRef } = {},
      inputProps: { "aria-label": ariaLabel } = {},
    } = props;

    const handleRef = useForkRef(ref, containerRef);
    return (
      <button
        id={id}
        disabled={disabled}
        ref={handleRef}
        aria-label={ariaLabel}
        onClick={() => setOpen?.((prev) => !prev)}
        className="m-0 w-fit bg-white p-0 underline outline-none hover:bg-white active:bg-white"
      >
        {label ? `${label}` : "Pick a date range"}
      </button>
    );
  },
) as DateRangeButtonFieldComponent;

DateRangeButtonField.displayName = "DateRangeButtonField";
DateRangeButtonField.fieldType = "single-input";

const ButtonDateRangePicker = React.forwardRef(
  (
    props: Omit<DateRangePickerProps<Dayjs>, "open" | "onOpen" | "onClose">,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <DateRangePicker
        slots={{ field: DateRangeButtonField, ...props.slots }}
        slotProps={{ field: { setOpen } as any }}
        ref={ref}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
    );
  },
);

ButtonDateRangePicker.displayName = "ButtonDateRangePicker";

interface DateRangePickerWithButtonFieldProps {
  startDate: Dayjs;
  endDate: Dayjs;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  reservation: { startDate: Date; endDate: Date }[];
}

export default function ResponsiveDateRangePickers({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  reservation,
}: DateRangePickerWithButtonFieldProps) {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    startDate,
    endDate,
  ]);
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

  const getFormattedDateRange = (start: Dayjs | null, end: Dayjs | null) => {
    if (start && !end) return start.format("MMM DD -");
    const startMonth = start?.format("MMM");
    const endMonth = end?.format("MMM");
    const startDateFormatted = start?.format("MMM DD");
    const endDateFormatted = end?.format("DD");

    if (startMonth === endMonth) {
      return `${startDateFormatted} - ${endDateFormatted}`;
    } else {
      return `${startDateFormatted} - ${endMonth} ${endDateFormatted}`;
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ButtonDateRangePicker
        disablePast
        label={getFormattedDateRange(value[0], value[1])}
        value={value}
        onChange={(newValue) => {
          const [newStartDate, newEndDate] = newValue;

          // Ensure endDate is always at least 1 day after startDate
          const validEndDate =
            newEndDate && newEndDate.isAfter(newStartDate)
              ? newEndDate
              : dayjs(newStartDate).add(1, "day");

          setValue([newStartDate, validEndDate]);
          setStartDate(dayjs(newStartDate));
          setEndDate(validEndDate); // Ensure endDate is updated properly
        }}
        shouldDisableDate={shouldDisableDate}
      />
    </LocalizationProvider>
  );
}
