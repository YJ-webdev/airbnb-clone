"use client";

import { useEffect, useState, useCallback } from "react";
import AddressForm from "./address-form";
import AddressMap from "./address-map";

export default function LocationRoute() {
  const [mapLocation, setMapLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formedAddress, setFormedAddress] = useState<string>("");

  // Memorized handleAddressSubmit function
  const handleAddressSubmit = useCallback(async (address: string) => {
    setFormedAddress(address);
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
          setErrorMessage(null); // Clear any previous error messages
        } else if (response.data.status === "ZERO_RESULTS") {
          setMapLocation(null); // Clear map location if no results found
          setErrorMessage(null);
        } else {
          setMapLocation(null); // Clear map location on other errors
          setErrorMessage(`Geocoding error: ${response.data.status}`);
        }
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
        setMapLocation(null); // Clear map location on error
        setErrorMessage(
          "Error fetching geocoding data. Please try again later.",
        );
      }
    }
  }, []);

  // Effect to trigger handleAddressSubmit when formedAddress changes
  useEffect(() => {
    handleAddressSubmit(formedAddress);
  }, [formedAddress, handleAddressSubmit]);

  return (
    <>
      <h2 className="mx-auto max-w-3xl pb-2 pl-6 pr-6 pt-5 text-2xl font-semibold transition-colors md:pl-0 md:pr-0 md:text-3xl">
        Where&apos;s your place located?{" "}
      </h2>
      <div className="mx-auto flex max-w-3xl flex-1 items-center justify-center gap-14 pb-2 pl-6 pr-6 pt-5 md:pl-0 md:pr-0">
        <AddressForm onSubmit={handleAddressSubmit} />
        <AddressMap location={mapLocation} />
      </div>
      {errorMessage && (
        <p className="mx-auto max-w-3xl pb-2 pl-6 pr-6 pt-2 text-sm italic text-red-500 md:pl-0 md:pr-0">
          {errorMessage}
        </p>
      )}
    </>
  );
}
