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

type TCountry = ICountry | null | string;
type TState = IState | null | string;
type TCity = ICity | null | string;

interface AddressFormProps {
  setDataLogged: (value: boolean) => void;
  street: string;
  country: TCountry;
  city: TCity;
  state: TState;
  postalCode: string;
  setStreet: (value: string) => void;
  setCountry: (value: TCountry) => void;
  setCity: (value: TCity) => void;
  setState: (value: TState) => void;
  setPostalCode: (value: string) => void;
}

const AddressInput = ({
  setDataLogged,
  street,
  country,
  city,
  state,
  postalCode,
  setStreet,
  setCountry,
  setCity,
  setState,
  setPostalCode,
}: AddressFormProps) => {
  const countryData = Country.getAllCountries();
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    if (country) {
      const statesData = State.getStatesOfCountry(
        typeof country === "string" ? country : country.isoCode,
      );
      setStates(statesData);
      setState(""); // reset state selection when nation changes
      setCity(""); // reset city selection when nation changes
    }
  }, [country, setState, setCity]);

  useEffect(() => {
    if (state) {
      const citiesData = City.getCitiesOfState(
        typeof country === "string" ? country : country?.isoCode || "",
        typeof state === "string" ? state : state.isoCode,
      );
      setCities(citiesData);
      setCity(""); // reset city selection when state changes
    }
  }, [state, country, setCity]);

  useEffect(() => {
    if (street && postalCode && country) {
      setDataLogged(true);
    } else {
      setDataLogged(false);
    }
  }, [street, postalCode, country, setDataLogged]);

  return (
    <div className="mb-10 flex min-h-[360px] w-full flex-col bg-white md:mb-0 md:h-[55vh] md:w-2/5">
      <div className="mb-10 flex md:flex-1">
        <Info className="mr-2 h-3 w-3 md:h-6 md:w-6" />
        <p className="text-sm md:text-base">
          Your address is only shared with guests after they&apos;ve made a
          reservation.
        </p>
      </div>

      <div className="flex flex-col md:flex-1">
        <select
          id="country"
          name="country"
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
            id="location-input"
            name="address"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Address"
            required
            className="w-full border-b border-gray-300 p-2 outline-none"
          />

          <input
            id="apt"
            name="apt"
            type="text"
            placeholder="Apt, Suite, etc (optional)"
            className="w-full border-b border-gray-300 p-2 outline-none"
          />

          <select
            id="city"
            name="city"
            onChange={(e) => setCity(e.target.value)}
            value={typeof city === "string" ? city : city?.name || ""}
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
              id="state"
              name="state"
              onChange={(e) =>
                setState(
                  states.find((s) => s.isoCode === e.target.value) || null,
                )
              }
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
              id="postal_code-input"
              name="postalCode"
              type="text"
              maxLength={6}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Zip/Postal code"
              required
              className="ml-2 w-1/2 border-b border-gray-300 p-2 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
