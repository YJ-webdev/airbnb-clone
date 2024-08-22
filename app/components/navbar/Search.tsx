"use client";

import { useEffect, useRef, useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BiSearch } from "react-icons/bi";
import { CalendarPopup, GuestsPopup, RegionCard } from "./popup-card";

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [continent, setContinent] = useState<string | undefined>(undefined);
  const [checkIn, setCheckIn] = useState<string | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<string | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [guests, setGuests] = useState<number | undefined>(undefined);
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
    const handleScroll = () => {
      if (open) {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  useEffect(() => {
    setGuests(adults + childrenCount);
  }, [adults, childrenCount]);

  return (
    <>
      {open ? (
        <div
          onClick={() => {
            setOpen(true);
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
        <form>
          <div className="relative h-32 w-[1000px] py-2 transition md:w-auto">
            <div className="mt-[7px] cursor-default font-semibold">Stays</div>
            <div className="absolute right-1/2 top-16 h-16 w-[750px] translate-x-1/2 cursor-pointer rounded-full border shadow-sm">
              <div className="relative flex h-full w-full items-center justify-between">
                <HoverCard openDelay={0} closeDelay={0}>
                  <div
                    className="group h-full w-fit"
                    onMouseEnter={() => handleMouseEnter(separatorRef1)}
                    onMouseLeave={() => handleMouseLeave(separatorRef1)}
                  >
                    <HoverCardTrigger asChild>
                      <div className="flex h-full w-56 rounded-full px-8 text-sm group-hover:bg-zinc-100">
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
                <div ref={separatorRef1} className="h-8 transform border-l" />

                <HoverCard openDelay={0} closeDelay={0}>
                  <div
                    className="group h-full flex-1"
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
                        className="hidden h-full flex-col justify-center rounded-full pl-8 text-sm group-hover:bg-zinc-100 sm:flex"
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
                      className="card absolute left-0 w-[750px] rounded-3xl border-none p-6"
                      style={{ position: "absolute", top: 0, left: -301 }}
                    >
                      <CalendarPopup
                        setCheckIn={setCheckIn}
                        setCheckOut={setCheckOut}
                      />
                    </HoverCardContent>
                  </div>
                </HoverCard>

                {/* Separator 2 */}
                <div ref={separatorRef2} className="h-8 transform border-l" />

                <HoverCard openDelay={0} closeDelay={0}>
                  <div
                    className="group h-full flex-1"
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
                        className="hidden h-full flex-col justify-center rounded-full pl-8 text-sm group-hover:bg-zinc-100 sm:flex"
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
                      className="card w-[750px] rounded-3xl border-none p-6"
                      style={{ position: "absolute", top: 0, left: -451 }}
                    >
                      <CalendarPopup
                        setCheckIn={setCheckIn}
                        setCheckOut={setCheckOut}
                      />
                    </HoverCardContent>
                  </div>
                </HoverCard>

                {/* Separator 3 */}
                <div ref={separatorRef3} className="h-8 transform border-l" />

                <HoverCard openDelay={0} closeDelay={0}>
                  <div
                    className="group h-full"
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
                        className="flex h-full w-56 items-center justify-between gap-3 rounded-full text-sm hover:bg-zinc-100"
                      >
                        <div className="hidden w-fit flex-col pl-8 sm:block">
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
                                {guests === 1 ? `Guest 1` : `Guests ${guests}`}
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
      )}
    </>
  );
};
