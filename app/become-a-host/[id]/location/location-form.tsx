"use client";

import { useEffect, useState, useCallback } from "react";
import { createLocation } from "@/app/action/create-listing";
import AddressInput from "./address-input";
import AddressMap from "./address-map";
import { ActionBar } from "@/app/components/become-a-host/action-bar";

export const LocationForm = ({ params }: { params: { id: string } }) => {
  const [dataLogged, setDataLogged] = useState(false);
  const [mapLocation, setMapLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [formedAddress, setFormedAddress] = useState("");
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [city, setCity] = useState<string | undefined>(undefined);

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
  }, []);

  // Effect to trigger handleAddressSubmit when formedAddress changes
  useEffect(() => {
    handleAddressSubmit(formedAddress);
  }, [formedAddress, handleAddressSubmit]);

  return (
    <form action={createLocation}>
      <input type="hidden" name="listingId" value={params.id} />
      <input type="hidden" name="locationValue" value={formedAddress} />
      <input type="hidden" name="country" value={country} />
      <input type="hidden" name="city" value={city} />

      <div className="mx-auto flex max-w-3xl flex-1 items-center justify-center gap-14 pb-2 pl-6 pr-6 pt-5 md:pl-0 md:pr-0">
        <AddressInput
          location={handleAddressSubmit}
          setDataLogged={setDataLogged}
          setCountry={setCountry}
          setCity={setCity}
        />
        <AddressMap location={mapLocation} />
      </div>

      <ActionBar
        dataLogged={dataLogged}
        prevHref={`/become-a-host/${params.id}/floor-plan`}
      />
    </form>
  );
};
