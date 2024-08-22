"use client";

import { useEffect, useRef, useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BiSearch } from "react-icons/bi";
import { CalendarPopup, GuestsPopup, RegionCard } from "./popup-card";
import { useStaticRangePicker } from "@mui/x-date-pickers-pro/internals/hooks/useStaticRangePicker";

export const Search = () => {
  const [expanded, setExpanded] = useState(false);
  const [continent, setContinent] = useState<string | undefined>(undefined);
  const [checkIn, setCheckIn] = useState<string | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<string | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [guests, setGuests] = useState<number>(1);
  const [pets, setPets] = useState(0);

  const separatorRef1 = useRef(null);
  const separatorRef2 = useRef(null);
  const separatorRef3 = useRef(null);

  const handleMouseEnter = (ref: any) => {
    if (ref.current) {
      ref.current.style.opacity = "0";
    }
  };

  const handleMouseLeave = (ref: any) => {
    if (ref.current) {
      ref.current.style.opacity = "1";
    }
  };

  useEffect(() => {
    setGuests(adults + childrenCount);
  }, [adults, childrenCount]);

  return (
    <>
      {!expanded ? (
        <div
          onClick={() => {
            setExpanded(true);
          }}
          className="w-full cursor-pointer rounded-full border py-2 shadow-sm transition hover:shadow-md md:w-auto"
        >
          <div className="flex items-center justify-between">
            <div className="px-6 text-sm font-semibold">Anywhere</div>
            <div className="hidden flex-1 border-x px-6 text-center text-sm font-semibold sm:block">
              Anyweek
            </div>
            <div className="flex items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
              <div className="hidden sm:block">Add Guests</div>
              <div className="rounded-full bg-rose-500 p-2 text-white">
                <BiSearch size={18} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // expanded
        <>
          <div className="w-full cursor-pointer rounded-full border py-2 shadow-sm transition hover:shadow-md sm:hidden md:w-auto">
            <div className="flex items-center justify-between">
              <div className="px-6 text-sm font-semibold">Anywhere</div>
              <div className="hidden flex-1 border-x px-6 text-center text-sm font-semibold sm:block">
                Anyweek
              </div>
              <div className="flex items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
                <div className="hidden sm:block">Add Guests</div>
                <div className="rounded-full bg-rose-500 p-2 text-white">
                  <BiSearch size={18} />
                </div>
              </div>
            </div>
          </div>

          <form className="hidden sm:block">
            <div className="relative h-32 w-auto py-2 transition">
              <div className="mt-[7px] cursor-default font-semibold">Stays</div>
              <div className="absolute right-1/2 top-16 h-16 translate-x-1/2 rounded-full border shadow-sm sm:w-[625px] md:-right-20 md:w-[750px] lg:right-1/2">
                <div className="relative flex h-full w-full items-center justify-between">
                  <HoverCard openDelay={0} closeDelay={0}>
                    <div
                      className="group h-full w-48 md:w-56 md:flex-none"
                      onMouseEnter={() => handleMouseEnter(separatorRef1)}
                      onMouseLeave={() => handleMouseLeave(separatorRef1)}
                    >
                      <HoverCardTrigger asChild>
                        <div className="flex h-full w-full cursor-pointer rounded-full px-5 text-sm group-hover:bg-zinc-100 md:px-8">
                          <div className="flex flex-col self-center">
                            {continent ? (
                              <>
                                <p className="text-muted-foreground">Where</p>
                                <p className="font-semibold">{continent}</p>
                              </>
                            ) : (
                              <>
                                <p className="font-semibold">Where</p>
                                <p className="text-muted-foreground">
                                  Anywhere or set region
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent
                        align="start"
                        sideOffset={8}
                        className="card w-[460px] rounded-3xl border-none p-5"
                      >
                        <RegionCard
                          continent={continent}
                          setContinent={setContinent}
                        />
                      </HoverCardContent>
                    </div>
                  </HoverCard>
                  {/* Separator 1 */}
                  <div
                    ref={separatorRef1}
                    className="hidden h-8 transform border-l sm:block"
                  />

                  <HoverCard openDelay={0} closeDelay={0}>
                    <div
                      className="group hidden h-full flex-1 sm:block"
                      onMouseEnter={() => {
                        handleMouseEnter(separatorRef1);
                        handleMouseEnter(separatorRef2);
                      }}
                      onMouseLeave={() => {
                        handleMouseLeave(separatorRef1);
                        handleMouseLeave(separatorRef2);
                      }}
                    >
                      <HoverCardTrigger asChild>
                        <div
                          onClick={() => {}}
                          className="flex h-full w-full cursor-pointer flex-col justify-center rounded-full px-5 text-sm group-hover:bg-zinc-100 md:pl-8"
                        >
                          {checkIn ? (
                            <>
                              <p className="text-muted-foreground">Check in</p>
                              <p className="font-semibold">{checkIn}</p>
                            </>
                          ) : (
                            <>
                              <p className="font-semibold">Check in</p>
                              <p className="text-muted-foreground">Add dates</p>
                            </>
                          )}
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent
                        sideOffset={8}
                        className="card -p-10 absolute left-[-248px] top-0 w-fit rounded-3xl border-none md:left-[-299px] md:w-[750px] md:p-6"
                      >
                        <CalendarPopup
                          setCheckIn={setCheckIn}
                          setCheckOut={setCheckOut}
                        />
                      </HoverCardContent>
                    </div>
                  </HoverCard>

                  {/* Separator 2 */}
                  <div
                    ref={separatorRef2}
                    className="hidden h-8 transform border-l sm:block"
                  />

                  <HoverCard openDelay={0} closeDelay={0}>
                    <div
                      className="group hidden h-full flex-1 sm:block"
                      onMouseEnter={() => {
                        handleMouseEnter(separatorRef2);
                        handleMouseEnter(separatorRef3);
                      }}
                      onMouseLeave={() => {
                        handleMouseLeave(separatorRef2);
                        handleMouseLeave(separatorRef3);
                      }}
                    >
                      <HoverCardTrigger asChild>
                        <div
                          onClick={() => {}}
                          className="flex h-full cursor-pointer flex-col justify-center rounded-full px-5 text-sm group-hover:bg-zinc-100 md:pl-8"
                        >
                          {checkOut ? (
                            <>
                              {" "}
                              <p className="text-muted-foreground">Check out</p>
                              <p className="font-semibold">{checkOut}</p>
                            </>
                          ) : (
                            <>
                              <p className="font-semibold">Check out</p>
                              <p className="text-muted-foreground">Add dates</p>
                            </>
                          )}
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent
                        sideOffset={8}
                        className="card -p-10 absolute -left-[359px] top-0 w-fit rounded-3xl border-none md:left-[-449px] md:w-[750px] md:p-6"
                      >
                        <CalendarPopup
                          setCheckIn={setCheckIn}
                          setCheckOut={setCheckOut}
                        />
                      </HoverCardContent>
                    </div>
                  </HoverCard>

                  {/* Separator 3 */}
                  <div
                    ref={separatorRef3}
                    className="hidden h-8 transform border-l sm:block"
                  />

                  <HoverCard openDelay={0} closeDelay={0}>
                    <div
                      className="group hidden h-full w-52 sm:block md:w-56"
                      onMouseEnter={() => {
                        handleMouseEnter(separatorRef3);
                      }}
                      onMouseLeave={() => {
                        handleMouseLeave(separatorRef3);
                      }}
                    >
                      <HoverCardTrigger asChild>
                        <div
                          onClick={() => {}}
                          className="flex h-full w-full items-center justify-between gap-3 rounded-full text-sm hover:bg-zinc-100"
                        >
                          <div className="hidden w-fit flex-col px-5 sm:block md:pl-8">
                            {guests === 1 && pets === 0 ? (
                              <>
                                <p className="font-semibold">Who</p>
                                <p className="line-clamp-1 text-muted-foreground">
                                  Alone or add guest
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="text-muted-foreground">Who</p>
                                <p className="line-clamp-1 font-semibold">
                                  {guests === 1
                                    ? `Guest 1`
                                    : `Guests ${guests}`}
                                  {pets === 1 && `, Pet ${pets}`}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent
                        align="end"
                        sideOffset={8}
                        className="card w-[400px] rounded-3xl border-none p-6"
                      >
                        <GuestsPopup
                          adults={adults}
                          childrenCount={childrenCount}
                          pets={pets}
                          setAdults={setAdults}
                          setChildren={setChildrenCount}
                          setPets={setPets}
                        />
                      </HoverCardContent>
                    </div>
                  </HoverCard>
                  <button
                    type="submit"
                    className="absolute right-2 rounded-full bg-rose-500 p-3 text-white hover:bg-rose-600"
                  >
                    <BiSearch size={18} />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};
