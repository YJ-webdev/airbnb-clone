"use client";

import { useEffect, useState, useCallback } from "react";
import { createLocation } from "@/app/action/create-listing";
import AddressInput from "./address-input";
import AddressMap from "./address-map";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { useProgress } from "@/app/context/progress-context";
import { ICity, ICountry, IState } from "country-state-city";

type LocationFormProps = {
  params: { id: string };
  userId: string;
  initialState?: string;
  initialCountry?: string;
  initialCity?: string;
  initialStreet?: string;
  initialPostalCode?: string;
};

export const LocationForm = ({
  params,
  userId,
  initialCountry,
  initialState,
  initialCity,
  initialStreet,
  initialPostalCode,
}: LocationFormProps) => {
  const [dataLogged, setDataLogged] = useState(false);
  const [street, setStreet] = useState(initialStreet || "");
  const [country, setCountry] = useState<string | undefined>(initialCountry);
  const [city, setCity] = useState(initialCity || "");
  const [state, setState] = useState<string | undefined>(initialState);
  const [postalCode, setPostalCode] = useState(initialPostalCode || "");
  const [mapLocation, setMapLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const createLocationWithId = createLocation.bind(null, userId);

  const { progress, setProgress } = useProgress();

  useEffect(() => {
    if (country && street && postalCode !== "") {
      setDataLogged(true);
    } else {
      setDataLogged(false);
    }
    setProgress(43);
  }, [setProgress, street, country, city, state, postalCode]);

  // Memorized handleAddressSubmit function
  const handleAddressSubmit = useCallback(async (address: string) => {
    setStreet(address);

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
    handleAddressSubmit(street);
  }, [street, handleAddressSubmit]);

  return (
    <form action={createLocationWithId} className="mb-28">
      <input type="hidden" name="listingId" value={params.id} />
      <input type="hidden" name="street" value={street} />
      <input type="hidden" name="postalCode" value={postalCode} />
      <input type="hidden" name="country" value={country} />
      <input type="hidden" name="city" value={city} />
      <input type="hidden" name="state" value={state} />

      <div className="container mb-28 flex h-[70vh] max-w-4xl flex-col pt-28">
        <h2 className="flex-1 pb-10 text-2xl font-semibold md:text-3xl">
          Where&apos;s your place located?{" "}
        </h2>

        <div className="flex-grow" />
        <div className="flex max-w-4xl flex-1 flex-col items-center justify-between gap-8 md:flex-1 md:flex-row">
          <AddressInput
            setDataLogged={setDataLogged}
            street={street}
            country={country}
            city={city}
            state={state}
            postalCode={postalCode}
            setStreet={setStreet}
            setCountry={setCountry}
            setCity={setCity}
            setState={setState}
            setPostalCode={setPostalCode}
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
