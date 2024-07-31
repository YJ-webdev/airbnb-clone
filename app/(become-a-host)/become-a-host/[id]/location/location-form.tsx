"use client";

import { useEffect, useState, useCallback } from "react";
import { createLocation } from "@/app/action/create-listing";
import AddressInput from "./address-input";
import AddressMap from "./address-map";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { useProgress } from "@/app/context/progress-context";

type LocationFormProps = {
  params: { id: string };
  userId: string;
  initialState?: string;
  initialCountry?: string;
  initialCity?: string;
  initialStreet?: string;
  initialPostalCode?: string;
  initialMarkerLocation?: string;
  initialLat?: number;
  initialLng?: number;
};

export const LocationForm = ({
  params,
  userId,
  initialCountry,
  initialState,
  initialCity,
  initialStreet,
  initialPostalCode,
  initialLng,
  initialLat,
}: LocationFormProps) => {
  const [dataLogged, setDataLogged] = useState(false);
  const [street, setStreet] = useState(initialStreet || "");
  const [country, setCountry] = useState<string | undefined>(initialCountry);
  const [city, setCity] = useState(initialCity || "");
  const [state, setState] = useState<string | undefined>(initialState);
  const [postalCode, setPostalCode] = useState(initialPostalCode || "");
  const [lat, setLat] = useState<number>(initialLat || 0);
  const [lng, setLng] = useState<number>(initialLng || 0);

  const createLocationWithId = createLocation.bind(null, userId);
  const { progress, setProgress } = useProgress();

  const initialMarkerLocation = { lat: initialLat || 0, lng: initialLng || 0 };

  const [mapLocation, setMapLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(initialMarkerLocation);

  // Memorized handleAddressSubmit function
  const handleAddressSubmit = useCallback(async (address: string) => {
    setStreet(address);
    setProgress(43);

    const axios = require("axios");
    if (address !== initialStreet) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY}`,
        );

        console.log("Geocoding Response:", response.data);

        if (response.data.status === "OK" && response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          setMapLocation({ lat, lng });
          setLat(lat);
          setLng(lng);
        } else if (response.data.status === "ZERO_RESULTS") {
          setMapLocation(null);
        } else {
          setMapLocation(null);
        }
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
        setMapLocation(null);
      }
    }
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

      <input type="hidden" name="lat" value={lat} />
      <input type="hidden" name="lng" value={lng} />

      <div className="container mb-28 flex h-[70vh] max-w-4xl flex-col pt-28">
        <h2 className="flex-1 pb-10 text-2xl font-semibold md:text-3xl">
          Where&apos;s your place located?{" "}
        </h2>

        <div className="flex-grow" />
        <div className="flex max-w-4xl flex-1 flex-col items-center justify-between gap-1 md:flex-1 md:flex-row md:gap-10">
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
          <AddressMap location={mapLocation} setLat={setLat} setLng={setLng} />
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
