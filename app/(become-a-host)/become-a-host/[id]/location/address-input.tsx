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
  setDataLogged: (value: boolean) => void;
  street: string;
  country: string | undefined;
  city: string | undefined;
  state: string | undefined;
  postalCode: string;
  setStreet: (value: string) => void;
  setCountry: (value: string) => void;
  setCity: (value: string) => void;
  setState: (value: string) => void;
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
  const [nation, setNation] = useState<ICountry | null>(null);
  const [province, setProvince] = useState<IState | null>(null);

  useEffect(() => {
    if (country) {
      const statesData = State.getStatesOfCountry(nation?.isoCode);
      setStates(statesData);
      setState(""); // reset state selection when nation changes
      setCity(""); // reset city selection when nation changes
    }
  }, [nation, setState, setCity, country]);

  useEffect(() => {
    if (province) {
      const citiesData = City.getCitiesOfState(
        nation?.isoCode || "",
        province.isoCode,
      );
      setCities(citiesData);
      setCity(""); // reset city selection when state changes
    }
  }, [province, nation, setCity]);

  useEffect(() => {
    if (street && postalCode && nation) {
      if (setCountry && nation) setCountry(nation.name);
      if (setState && province) setState(province.name);
      if (setCity && city) setCity(city);
      setDataLogged(true);
    } else {
      setDataLogged(false);
    }
  }, [
    street,
    postalCode,
    nation,
    setCountry,
    setState,
    setCity,
    province,
    city,
    setDataLogged,
  ]);

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
            setNation(
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
            value={city}
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
                setProvince(
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
