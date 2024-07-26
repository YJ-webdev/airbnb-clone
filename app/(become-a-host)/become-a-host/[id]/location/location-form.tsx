"use client";

import { useEffect, useState, useCallback } from "react";
import { createLocation } from "@/app/action/create-listing";
import AddressInput from "./address-input";
import AddressMap from "./address-map";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { useProgress } from "@/app/context/progress-context";

export const LocationForm = ({ params }: { params: { id: string } }) => {
  const [dataLogged, setDataLogged] = useState(false);
  const [mapLocation, setMapLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [formedAddress, setFormedAddress] = useState("");
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [city, setCity] = useState<string | undefined>(undefined);

  const { progress, setProgress } = useProgress();

  useEffect(() => {
    setProgress(43);
  }, [setProgress]);

  // Memorized handleAddressSubmit function
  const handleAddressSubmit = useCallback(async (address: string) => {
    setFormedAddress(address);
    {
      formedAddress !== "" && setDataLogged(true);
    }
    const axios = require("axios");
    if (address) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY}`,
        );

        console.log("Geocoding Response:", response.data);

        if (response.data.status === "OK" && response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          setMapLocation({ lat, lng });
        } else if (response.data.status === "ZERO_RESULTS") {
          setMapLocation(null); // Clear map location if no results found
        } else {
          setMapLocation(null); // Clear map location on other errors
        }
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
        setMapLocation(null); // Clear map location on error
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect to trigger handleAddressSubmit when formedAddress changes
  useEffect(() => {
    handleAddressSubmit(formedAddress);
  }, [formedAddress, handleAddressSubmit]);

  return (
    <form action={createLocation} className="mb-28">
      <input type="hidden" name="listingId" value={params.id} />
      <input type="hidden" name="locationValue" value={formedAddress} />
      <input type="hidden" name="country" value={country} />
      <input type="hidden" name="city" value={city} />

      <div className="container mb-28 flex h-[70vh] max-w-4xl flex-col pt-32">
        <h2 className="flex-1 pb-10 text-2xl font-semibold md:text-3xl">
          Where&apos;s your place located?{" "}
        </h2>

        <div className="flex-grow" />
        <div className="flex max-w-4xl flex-1 flex-col items-center justify-between gap-8 md:flex-1 md:flex-row">
          <AddressInput
            location={handleAddressSubmit}
            setDataLogged={setDataLogged}
            setCountry={setCountry}
            setCity={setCity}
          />
          <AddressMap location={mapLocation} />
        </div>
      </div>
      <ActionBar
        dataLogged={dataLogged}
        prevHref={`/become-a-host/${params.id}/floor-plan`}
        currentStep={progress}
      />
    </form>
  );
};
