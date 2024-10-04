"use client";

import { useEffect, useRef, useState } from "react";
import { useSearch } from "@/app/context/search-context";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BiSearch } from "react-icons/bi";
import { CalendarPopup, GuestsPopup, RegionCard } from "./popup-card";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Settings2 } from "lucide-react";

import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { SearchSettings } from "./search-settings";
import { useRouter } from "next/navigation";

export const Search = () => {
  const {
    inputValue,
    setInputValue,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
  } = useSearch();

  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility

  const [expanded, setExpanded] = useState(false);
  const [continent, setContinent] = useState<string | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [pets, setPets] = useState(0);

  const formattedCheckIn = checkIn ? dayjs(checkIn).format("MMM DD") : "";
  const formattedCheckOut = checkOut ? dayjs(checkOut).format("MMM DD") : "";

  const separatorRef1 = useRef(null);
  const separatorRef2 = useRef(null);
  const separatorRef3 = useRef(null);

  const [scrollY, setScrollY] = useState(0);

  const router = useRouter();

  const handleScroll = () => {
    setScrollY(window.scrollY);
    setExpanded(window.scrollY < 10); // Adjust div based on Y scroll position
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDialogOpen(false);

    const destination =
      inputValue === "I'm flexible" || inputValue.trim() === ""
        ? null
        : inputValue;

    const queryParams = new URLSearchParams();

    if (destination) {
      queryParams.set("destination", destination);
    }

    if (formattedCheckIn) {
      queryParams.set("startDate", formattedCheckIn);
    }

    if (formattedCheckOut) {
      queryParams.set("endDate", formattedCheckOut);
    }

    if (guests > 1) {
      queryParams.set("guests", guests.toString());
    }

    router.push(`/?${queryParams.toString()}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setGuests(adults + childrenCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adults, childrenCount]);

  useEffect(() => {
    if (continent) {
      setInputValue(continent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continent]);

  const displayValue = continent || inputValue;
  return (
    <>
      <form
        className="flex w-full cursor-pointer items-center justify-between self-center rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md sm:hidden"
        onSubmit={handleSubmit}
      >
        {inputValue?.trim() === "" || !inputValue ? (
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            className="ml-6 w-1/2 bg-none text-sm font-semibold capitalize placeholder-black outline-none"
            placeholder="Where"
          />
        ) : (
          <input
            type="text"
            className={`ml-6 w-1/2 bg-none text-sm font-semibold capitalize placeholder-black outline-none ${
              !displayValue ? "placeholder-muted-foreground" : ""
            }`}
            placeholder="City or Country"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        )}

        <div className="flex">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <div className="mx-2 rounded-full text-black outline-2">
                <Settings2 size={18} strokeWidth={1.5} className="m-2" />
              </div>
            </DialogTrigger>
            <DialogContent className="min-h-[100vh] w-[100vw] p-5 outline-none">
              <SearchSettings />
            </DialogContent>
          </Dialog>
          <button
            type="submit"
            className="mr-2 rounded-full bg-rose-500 p-2 text-white"
          >
            <BiSearch size={18} />
          </button>
        </div>
      </form>

      <form
        className={cn(
          "hidden self-center sm:block",
          expanded ? "-ml-60 -mr-60 h-[115px] md:-ml-14 lg:-ml-60" : "h-auto",
        )}
        onSubmit={handleSubmit}
      >
        <div className="relative h-full w-auto">
          {expanded && (
            <div className="mb-6 mt-[10px] cursor-default text-center font-semibold transition-all duration-1000">
              Stays
            </div>
          )}
          <div
            className={cn(
              "cursor-pointer rounded-full border shadow-sm",
              expanded
                ? "top-16 h-16 sm:w-[625px] md:-right-20 md:w-[750px] lg:right-1/2"
                : "hidden w-full py-2 hover:shadow-md sm:block",
            )}
          >
            <div className="flex h-full min-w-fit items-center justify-between">
              {expanded ? (
                <>
                  <HoverCard openDelay={0} closeDelay={100}>
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
                                  onChange={(e) =>
                                    setInputValue(e.target.value)
                                  }
                                  className="w-full bg-transparent text-sm capitalize placeholder-muted-foreground outline-none"
                                  placeholder="Anywhere or set region"
                                />
                              </>
                            ) : (
                              <>
                                <p className="text-muted-foreground">Where</p>
                                <input
                                  type="text"
                                  className={`w-full bg-transparent text-sm font-semibold capitalize placeholder-black outline-none ${
                                    !displayValue
                                      ? "placeholder-muted-foreground"
                                      : ""
                                  }`}
                                  placeholder="City or Country"
                                  onChange={(e) =>
                                    setInputValue(e.target.value)
                                  }
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
                  </HoverCard>{" "}
                  {/* Separator 1 */}
                  <div
                    ref={separatorRef1}
                    className="hidden h-8 transform border-l sm:block"
                  />
                </>
              ) : (
                <div
                  className="min-w-fit px-6 text-start text-sm font-semibold capitalize"
                  onClick={() => setExpanded(true)}
                >
                  {inputValue?.trim() === "" || !inputValue
                    ? "Anywhere"
                    : inputValue}
                </div>
              )}

              {expanded ? (
                <>
                  <HoverCard openDelay={0} closeDelay={100}>
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
                              <p className="font-semibold">
                                {formattedCheckIn}
                              </p>
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

                  <HoverCard openDelay={0} closeDelay={100}>
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
                              <p className="font-semibold">
                                {formattedCheckOut}
                              </p>
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
                </>
              ) : (
                <div
                  className="hidden min-w-fit border-x px-6 text-start text-sm font-semibold sm:block"
                  onClick={() => setExpanded(true)}
                >
                  {checkIn && checkOut
                    ? formattedCheckIn + " - " + formattedCheckOut
                    : "Anyweek"}
                </div>
              )}

              {expanded ? (
                <HoverCard openDelay={100} closeDelay={100}>
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
              ) : (
                <div
                  className="hidden min-w-fit px-6 text-start text-sm font-semibold sm:block"
                  onClick={() => setExpanded(true)}
                >
                  {guests === 1 && pets === 0 ? (
                    <p className="line-clamp-1">Who</p>
                  ) : (
                    <p className="line-clamp-1 font-semibold">
                      {guests === 1 ? `Guest 1` : `Guests ${guests}`}
                      {pets === 1 && `, Pet ${pets}`}
                    </p>
                  )}
                </div>
              )}
              <button
                type="submit"
                className={cn(
                  "rounded-full bg-rose-500 text-white hover:bg-rose-600",
                  expanded ? "absolute right-2 p-3" : "static mr-2 p-2",
                )}
              >
                <BiSearch size={18} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
