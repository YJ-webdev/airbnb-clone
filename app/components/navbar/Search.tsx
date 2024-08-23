"use client";

import { useEffect, useRef, useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BiSearch } from "react-icons/bi";
import { CalendarPopup, GuestsPopup, RegionCard } from "./popup-card";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Settings2 } from "lucide-react";
import { SeaerchSettings } from "./search-settings";

export const Search = () => {
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
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

  useEffect(() => {
    if (continent) {
      setInputValue(continent);
    }
  }, [continent]);

  useEffect(() => {
    if (inputValue) {
      // Add your custom logic here. For example:
      console.log("Input value changed:", inputValue);
      // You could also trigger other side effects or call a callback function here
    }
  }, [inputValue]);

  const displayValue = continent || inputValue;
  return (
    <>
      <div className="flex w-full cursor-pointer items-center justify-between rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md sm:hidden">
        <input
          className="ml-6 w-1/2 bg-none text-sm font-semibold placeholder-black outline-none"
          type="text"
          placeholder="Where"
        />

        <div className="flex">
          <Dialog>
            <DialogTrigger asChild>
              <div className="mx-2 rounded-full text-black outline-2">
                <Settings2 size={18} strokeWidth={1.5} className="m-2" />
              </div>
            </DialogTrigger>
            <DialogContent className="min-h-[100vh] w-[100vw] p-5 outline-none">
              <SeaerchSettings />
            </DialogContent>
          </Dialog>
          <div className="mr-2 rounded-full bg-rose-500 p-2 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>

      {!expanded ? (
        <div
          onClick={() => {
            setExpanded(true);
          }}
          className="hidden w-auto cursor-pointer rounded-full border py-2 shadow-sm transition hover:shadow-md sm:block"
        >
          <div className="flex items-center justify-between">
            <div className="px-6 text-start text-sm font-semibold">
              Anywhere
            </div>

            <div className="hidden border-x px-6 text-start text-sm font-semibold sm:block">
              Anyweek
            </div>

            <div className="hidden px-6 text-start text-sm font-semibold sm:block">
              Add Guests
            </div>

            <div className="mr-2 rounded-full bg-rose-500 p-2 text-white">
              <BiSearch size={18} />
            </div>
          </div>
        </div>
      ) : (
        // expanded
        <form className="hidden sm:block">
          <div className="relative h-32 w-auto py-2 transition">
            <div className="mt-[7px] cursor-default font-semibold">Stays</div>
            <div className="absolute right-1/2 top-16 h-16 translate-x-1/2 rounded-full border shadow-sm sm:w-[625px] md:-right-20 md:w-[750px] lg:right-1/2">
              <div className="relative flex h-full w-full items-center justify-between">
                <HoverCard openDelay={0} closeDelay={300}>
                  <div
                    className="group h-full w-48 md:w-56 md:flex-none"
                    onMouseEnter={() => handleMouseEnter(separatorRef1)}
                    onMouseLeave={() => handleMouseLeave(separatorRef1)}
                  >
                    <HoverCardTrigger asChild>
                      <div className="flex h-full w-full cursor-pointer rounded-full px-5 text-sm group-hover:bg-zinc-100 md:px-8">
                        <div className="flex flex-col self-center">
                          {inputValue?.trim() === "" || !inputValue ? (
                            <>
                              <p className="font-semibold">Where</p>
                              <input
                                type="text"
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full bg-transparent text-sm placeholder-muted-foreground outline-none"
                                placeholder="Anywhere or set region"
                              />
                            </>
                          ) : (
                            <>
                              <p className="text-muted-foreground">Where</p>
                              <input
                                type="text"
                                className={`w-full bg-transparent text-sm font-semibold placeholder-black outline-none ${
                                  !displayValue
                                    ? "placeholder-muted-foreground"
                                    : ""
                                }`}
                                placeholder="City or Country"
                                onChange={(e) => setInputValue(e.target.value)}
                                value={inputValue}
                              />
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

                <HoverCard openDelay={0} closeDelay={300}>
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

                <HoverCard openDelay={0} closeDelay={200}>
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

                <HoverCard openDelay={200} closeDelay={300}>
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
