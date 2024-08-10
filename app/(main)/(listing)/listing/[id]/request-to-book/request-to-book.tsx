"use client";

import { UserWithRoleAndFavoriteIds } from "@/types";
import { Listing } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiCreditCardLight } from "react-icons/pi";
import { FormInput } from "@/app/components/form/form-input";
import { useEffect, useState, useTransition } from "react";
import { RightPanel } from "./right-panel";
import { useRouter } from "next/navigation";
import { PAYMENT_METHODS } from "@/app/lib/payment-method";
import { Country, ICountry } from "country-state-city";
import { SubmitButton } from "@/app/components/form/submit-button";
import dayjs from "dayjs";
import ResponsiveDateRangePickers from "./responsive-date-picker";

export default function RequestToBook({
  data,
  user,
}: {
  data: Listing & {
    user: {
      name: string | null; // 'name' can be 'null' if not set
    };
  };
  user: UserWithRoleAndFavoriteIds;
}) {
  if (!user) console.log("login");

  let countryData = Country.getAllCountries();

  const searchParams = useSearchParams();
  const router = useRouter();

  const initialStartDate = dayjs(searchParams.get("startDate"));
  const initialEndDate = dayjs(searchParams.get("endDate"));
  const initialadultCount = Number(searchParams.get("adultCount"));
  const initialchildCount = Number(searchParams.get("childCount"));
  const initialpetCount = Number(searchParams.get("petCount"));

  const [startDate, setStartDate] = useState(initialStartDate || null);
  const [endDate, setEndDate] = useState(initialEndDate || null);
  const [adultCount, setAdultCount] = useState(initialadultCount);
  const [childCount, setChildCount] = useState(initialchildCount);
  const [petCount, setPetCount] = useState(initialpetCount);

  const [cardCompany, setCardCompany] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState<ICountry | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGoBack = () => {
    router.back();
  };

  const handleCardCompanyInputChange = (cardCompany: string) => {
    setCardCompany(cardCompany);
  };

  const handleCountryInputChange = (value: string) => {
    const selectedCountry = countryData.find((c) => c.isoCode === value);
    setCountry(selectedCountry || null);
  };

  const handleCardNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value);
  };

  const handleZipcodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value);
  };

  return (
    <div className="container mt-5 flex max-w-[1280px] flex-col">
      <div className="flex items-center gap-2">
        <button onClick={handleGoBack}>
          <ChevronLeft className="h-8 w-8 rounded-full bg-zinc-500/10 p-2 hover:bg-zinc-500/10 md:bg-white" />
        </button>
        <h1 className="text-xl font-semibold">Confirm and pay</h1>
      </div>

      <div className="mb-5 mt-2 flex flex-col md:w-full md:flex-row-reverse md:gap-7 lg:gap-12">
        <RightPanel data={data} startDate={startDate} endDate={endDate} />
        <div className="mb-10 flex flex-col gap-7 md:flex-1 md:p-5">
          {/* your trip */}
          <div className="mt-7 flex flex-col gap-2 md:mt-0">
            <h2 className="mb-2 text-lg font-semibold">Your Trip</h2>

            <div className="flex items-center justify-between gap-2">
              <p>Dates</p>

              <ResponsiveDateRangePickers
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <p>Guests</p>
              <p>{adultCount === 1 ? "1 Adult" : `${adultCount} Adults`}</p>
            </div>
            {childCount === 0 ? (
              ""
            ) : (
              <p className="text-end">
                {childCount === 1 ? "1 Child" : `${childCount} Children`}
              </p>
            )}
            {petCount === 0 ? (
              ""
            ) : (
              <p className="text-end">
                {petCount === 1 ? "1 Pet" : `${petCount} Pets`}
              </p>
            )}
          </div>
          <hr />
          {/* pay with */}
          <div className="flex flex-col gap-2">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">Pay with</h2>
              <Image
                src="/images/pay-with.png"
                alt="card"
                width={300}
                height={300}
                className="h-6 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col gap-5">
              <Select
                value={cardCompany}
                onValueChange={handleCardCompanyInputChange}
              >
                <SelectTrigger className="h-14 w-full rounded-lg border border-zinc-300 pl-5 text-base">
                  <SelectValue
                    placeholder={
                      <div className="flex items-center gap-2">
                        <PiCreditCardLight className="h-6 w-6 text-zinc-500" />
                        <p className="text-zinc-500">Credit or Debit Card</p>
                      </div>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((paymentMethod) => (
                    <SelectItem
                      className="flex h-14 text-base"
                      value={paymentMethod.name}
                      key={paymentMethod.name}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={paymentMethod.icon}
                          alt={paymentMethod.name}
                          width={40}
                          height={40}
                          className="h-auto w-6 object-contain text-zinc-500"
                        />
                        <p>{paymentMethod.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-col">
                <FormInput
                  label="Card Number"
                  value={cardNumber}
                  id="cardNumber"
                  onChange={handleCardNumberInputChange}
                  placeholder="**** **** **** ****"
                  className="h-14 rounded-b-none rounded-t-lg border-zinc-300 border-b-white"
                  type="number"
                  required
                />
                <div className="flex">
                  <FormInput
                    label="Expiry Date"
                    id="expiryDate"
                    value={expiryDate}
                    placeholder="MM/YY"
                    onChange={handleExpiryDateInputChange}
                    className="h-14 rounded-t-none rounded-br-none border-zinc-300 border-r-white"
                    type="number"
                    required
                  />
                  <FormInput
                    label="CVV"
                    id="cvv"
                    value={cvv}
                    onChange={handleCvvInputChange}
                    className="h-14 rounded-t-none rounded-bl-none border-zinc-300"
                    placeholder="***"
                    type="password"
                    required
                  />
                </div>
              </div>
              <FormInput
                label="Zipcode"
                id="zipcode"
                value={zipcode}
                onChange={handleZipcodeInputChange}
                className="h-14 border-zinc-300"
                required
              />
              <Select onValueChange={handleCountryInputChange}>
                <SelectTrigger className="h-14 w-full rounded-lg border border-zinc-300 pl-5 text-base">
                  <SelectValue
                    placeholder={
                      <p className="text-zinc-500">Country / region</p>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {countryData.map((country) => (
                    <SelectItem
                      key={country.isoCode} // Use isoCode as the key
                      value={country.isoCode} // Pass the isoCode as the value
                      className="flex text-base"
                    >
                      <div className="flex items-center gap-3">
                        <p>{country.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <hr />
          {/* ground rules */}
          <div className="mb-5 flex flex-col gap-2">
            <h2 className="mb-2 text-lg font-semibold">Ground rules</h2>{" "}
            <p>
              We ask every guest to remember a few simple things about what
              makes a great guest.
            </p>
            <ul className="custom-bullet pl-5">
              <li>Follow the house rules</li>
              <li>Treat your Host's home like your own</li>
            </ul>
          </div>
          <hr />
          <p className="pb-5 text-sm">
            By selecting the button below, I agree to the Host's House Rules,
            Ground rules for guests, Airbnb's Rebooking and Refund Policy, and
            that Airbnb can charge my payment method if I'm responsible for
            damage.
          </p>
          <SubmitButton
            isPending={isPending}
            label="Confirm and Pay"
            className="h-14"
          ></SubmitButton>
        </div>
      </div>
    </div>
  );
}