"use client";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { FormButton } from "@/app/(main)/(settings)/settings/form-button";
import { useEffect, useState, useTransition } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { continents, GuestsPopup } from "./popup-card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";

export const SeaerchSettings = () => {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const [continent, setContinent] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<Dayjs | undefined>(undefined);
  const [endDate, setEndDate] = useState<Dayjs | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [guests, setGuests] = useState<number>(1);
  const [pets, setPets] = useState(0);

  const [isPending, startTransition] = useTransition();

  const handleDateChange = (newValue: any) => {
    setStartDate(newValue[0]);
    setEndDate(newValue[1]); // newValue is an array with the start and end dates
  };

  useEffect(() => {
    setGuests(adults + childrenCount);
  }, [adults, childrenCount]);

  useEffect(() => {
    setInputValue(continent);
  }, [continent]);
  return (
    <form className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-lg font-semibold">Stays</h1>
      <Accordion
        type="single"
        collapsible
        className="flex h-full w-full flex-col"
      >
        <AccordionItem value="item-1 h-full">
          <AccordionTrigger className="justyfy-between flex items-center">
            <h3 className="text-lg font-semibold"> Where to?</h3>
            <p className="text-sm">
              {inputValue === undefined ||
              inputValue === "I'm flexible" ||
              inputValue?.trim() === ""
                ? "Anywhere"
                : inputValue}
            </p>
          </AccordionTrigger>
          <AccordionContent className="flex flex-grow flex-col">
            <div className="flex h-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md">
              <input
                className="ml-6 mr-5 h-8 w-full bg-none text-sm font-semibold placeholder-black outline-none"
                type="text"
                placeholder="City or Country"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
            </div>
            <p className="mt-2 text-center text-sm">or</p>
            <div className="mb-5 grid grid-cols-3">
              {continents.map((c) => (
                <div
                  key={c.name}
                  onClick={() => setContinent(c.name)}
                  className={cn(
                    "flex cursor-pointer flex-col rounded-lg p-2 hover:bg-zinc-200",
                    continent === c.name && "bg-zinc-200",
                  )}
                >
                  <div className="overflow-hidden rounded-lg border">
                    <Image
                      src={c.img}
                      alt={`${c.name} map`}
                      width={200}
                      height={200}
                    />
                  </div>
                  <p className="text-sm tracking-tight">{c.name}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="justyfy-between my-0 flex items-center py-0">
            <h3 className="text-lg font-semibold">When&apos;s your trip?</h3>{" "}
            <p className="text-sm">
              {startDate && endDate ? (
                <>
                  {startDate.format("MMM-DD")} - {endDate.format("MMM-DD")}
                </>
              ) : (
                <>I&apos;m flexible</>
              )}
            </p>
          </AccordionTrigger>
          <AccordionContent className="m-0 p-0">
            <div className="mx-auto mt-2 w-fit self-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateRangeCalendar"]}>
                  <DateRangeCalendar
                    calendars={1}
                    disablePast
                    onChange={handleDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="justyfy-between flex items-baseline">
            <h3 className="text-lg font-semibold">Who&apos;s coming?</h3>

            {guests === 1 && pets === 0 ? (
              <p className="line-clamp-1 text-sm">Alone</p>
            ) : (
              <p className="line-clamp-1 text-sm">
                {guests === 1 ? `Guest 1` : `Guests ${guests}`}
                {pets === 1 && `, Pet ${pets}`}
              </p>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <GuestsPopup
              adults={adults}
              childrenCount={childrenCount}
              pets={pets}
              setAdults={setAdults}
              setChildren={setChildrenCount}
              setPets={setPets}
              className="text-base"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <FormButton disabled={isPending} label="Search" className="h-16 w-full" />
    </form>
  );
};
