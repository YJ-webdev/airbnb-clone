import * as React from "react";
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
import { DemoItem, DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface DateRangeButtonFieldProps
  extends SingleInputDateRangeFieldProps<Dayjs> {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}

type DateRangeButtonFieldComponent = ((
  props: DateRangeButtonFieldProps & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { fieldType?: FieldType };

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
        onClick={() => {
          setOpen?.((prev) => !prev);
        }}
      >
        <p className="underline">{label}</p>
      </button>
    );
  },
) as DateRangeButtonFieldComponent;

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
        slotProps={{ field: { setOpen, open } as any }}
        ref={ref}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
    );
  },
);

interface DateRangePickerWithButtonFieldProps {
  startDate: Dayjs;
  endDate: Dayjs;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

export default function ResponsiveDateRangePickers({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: DateRangePickerWithButtonFieldProps) {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    startDate,
    endDate,
  ]);

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
        label={getFormattedDateRange(value[0], value[1])}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setStartDate(dayjs(newValue[0]));
          setEndDate(dayjs(newValue[1]));
        }}
      />
    </LocalizationProvider>
  );
}
