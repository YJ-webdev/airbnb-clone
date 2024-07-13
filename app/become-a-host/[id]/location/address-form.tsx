"use client";

import { useState, useEffect } from "react";
import {
  Country,
  State,
  City,
  ICountry,
  IState,
  ICity,
} from "country-state-city";
import { Info } from "lucide-react";

interface AddressFormProps {
  location: (address: string) => void;
  setDataLogged: (data: boolean) => void;
}

const AddressForm = ({ location, setDataLogged }: AddressFormProps) => {
  const countryData = Country.getAllCountries();

  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [state, setState] = useState<IState | null>(null);
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState<ICountry | null>(null);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    if (country) {
      const statesData = State.getStatesOfCountry(country.isoCode);
      setStates(statesData);
      setState(null); // reset state selection when country changes
      setLocality(""); // reset city selection when country changes
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      const citiesData = City.getCitiesOfState(
        country?.isoCode || "",
        state.isoCode,
      );
      setCities(citiesData);
      setLocality(""); // reset city selection when state changes
    }
  }, [state, country]);

  const formedAddress = `${address} ${locality} ${state?.name || ""} ${postalCode} ${country?.name}`;

  if (address && postalCode && country) {
    setDataLogged(true);
  } else {
    setDataLogged(false);
  }

  useEffect(() => {
    location(formedAddress);
  }, [location, formedAddress]);

  return (
    <div className="flex h-[55vh] w-2/5 flex-col bg-white">
      <div className="flex flex-1">
        <Info size={24} className="mr-2" />
        <p className="text-sm md:text-base">
          Your address is only shared with guests after they&apos;ve made a
          reservation.
        </p>
      </div>

      <div>
        <select
          onChange={(e) =>
            setCountry(
              countryData.find((c) => c.isoCode === e.target.value) || null,
            )
          }
          required
          className="w-full border-b border-gray-300 p-2 outline-none"
        >
          <option value="">Select your country</option>

          {countryData.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
        <div className="mt-5 flex flex-col space-y-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
            id="location-input"
            className="w-full border-b border-gray-300 p-2 outline-none"
          />

          <input
            type="text"
            placeholder="Apt, Suite, etc (optional)"
            className="w-full border-b border-gray-300 p-2 outline-none"
          />

          <select
            onChange={(e) => setLocality(e.target.value)}
            value={locality}
            className="w-full border-b border-gray-300 p-2 outline-none"
          >
            <option value="">City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <div className="flex justify-between">
            <select
              onChange={(e) =>
                setState(
                  states.find((s) => s.isoCode === e.target.value) || null,
                )
              }
              value={state?.isoCode || ""}
              className="mr-2 w-1/2 border-b border-gray-300 p-2 outline-none"
            >
              <option value="">State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Zip/Postal code"
              required
              id="postal_code-input"
              className="ml-2 w-1/2 border-b border-gray-300 p-2 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
