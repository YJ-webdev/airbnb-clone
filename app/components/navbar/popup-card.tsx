import Image from "next/image";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { Counter } from "../counter";
import { cn } from "@/lib/utils";
import dayjs, { Dayjs } from "dayjs";

export const continents = [
  { name: "I'm flexible", img: "/images/continent/world-map.jpg" },
  { name: "Europe", img: "/images/continent/europe-map.webp" },
  { name: "Italy", img: "/images/continent/italy-map.webp" },
  { name: "Japan", img: "/images/continent/japan-map.webp" },
  { name: "Southeast Asia", img: "/images/continent/southeast-asia-map.webp" },
  { name: "United States", img: "/images/continent/united-states-map.webp" },
];

interface RegionCardProps {
  setContinent: (value: string) => void;
  continent?: string;
}

export const RegionCard = ({ continent, setContinent }: RegionCardProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {continents.map((c) => (
        <div
          key={c.name}
          onClick={() => setContinent(c.name)}
          className={cn(
            "flex cursor-pointer flex-col gap-2 rounded-lg p-3 hover:bg-zinc-200",
            continent === c.name && "bg-zinc-200",
          )}
        >
          <div className="overflow-hidden rounded-lg border">
            <Image src={c.img} alt={`${c.name} map`} width={200} height={200} />
          </div>
          <p className="tracking-tight">{c.name}</p>
        </div>
      ))}
    </div>
  );
};

interface CalendarPopupProps {
  setCheckIn: (date: Dayjs) => void;
  setCheckOut: (date: Dayjs) => void;
}

export const CalendarPopup = ({
  setCheckIn,
  setCheckOut,
}: CalendarPopupProps) => {
  const sixMonthsFromNow = dayjs().add(6, "month");

  return (
    <div className="mx-auto w-fit">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateRangeCalendar"]}>
          <DateRangeCalendar
            disablePast
            shouldDisableDate={(date) =>
              dayjs(date).isAfter(sixMonthsFromNow, "day")
            }
            onChange={(value) => {
              if (value) {
                const [start, end] = value;

                const validEnd =
                  end && dayjs(end).diff(dayjs(start), "day") < 1
                    ? dayjs(start).add(1, "day")
                    : end;

                setCheckIn(start && dayjs(start).format("MMM-DD"));
                setCheckOut(validEnd && dayjs(validEnd).format("MMM-DD"));
              }
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

interface GuestsPopupProps {
  pets: number;
  adults: number;
  childrenCount: number;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
  setPets: (value: number) => void;
  className?: string;
}

export const GuestsPopup = ({
  pets,
  adults,
  childrenCount,
  setAdults,
  setChildren,
  setPets,
  className,
}: GuestsPopupProps) => {
  return (
    <div className="flex flex-col gap-7 p-3">
      <div className="flex items-center justify-between gap-5">
        <div className="flex flex-col">
          <p className={cn("font-semibold", className)}>Adults</p>
          <p className="text-sm text-muted-foreground">Ages above 18</p>
        </div>
        <Counter
          small
          name="adultCount"
          setCount={setAdults}
          initialCount={adults}
          min={1}
          max={16}
        />
      </div>

      <div className="border-b"></div>
      <div className="flex items-center justify-between gap-5">
        <div className="flex flex-col">
          <p className={cn("font-semibold", className)}>Children</p>
          <p className="text-sm text-muted-foreground">Ages below 18</p>
        </div>
        <Counter
          small
          name="childrenCount"
          setCount={setChildren}
          initialCount={childrenCount}
          min={0}
          max={16}
        />
      </div>

      <div className="border-b"></div>
      <div className="flex items-center justify-between gap-5">
        <div className="flex flex-col">
          <p className={cn("font-semibold", className)}>Pets</p>
          <p className="text-sm text-muted-foreground">
            Bringing a service animal?
          </p>
        </div>
        <Counter
          small
          min={0}
          max={1}
          initialCount={pets}
          name="petsCount"
          setCount={setPets}
        />
      </div>
    </div>
  );
};
