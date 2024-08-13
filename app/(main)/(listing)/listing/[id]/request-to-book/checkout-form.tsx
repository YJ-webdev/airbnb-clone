"use client";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import React, { useMemo, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Country, ICountry } from "country-state-city";
import { cn } from "@/lib/utils";
import { UserWithRoleAndFavoriteIds } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiCreditCardLight } from "react-icons/pi";
import { PAYMENT_METHODS } from "@/app/lib/payment-method";
import { FormInput } from "@/app/components/form/form-input";
import { SubmitButton } from "@/app/components/form/submit-button";
import { GroundRules } from "./ground-rules";
import { createReserevation } from "@/app/actions/reservations";
import { Dayjs } from "dayjs";
import { Listing } from "@prisma/client";

interface CheckoutFormProps {
  clientSecret: string;
  user: UserWithRoleAndFavoriteIds;
  startDate: Dayjs;
  endDate: Dayjs;
  adults: number;
  stayingNights: number;
  pets?: number;
  childCount?: number;
  data: Listing & {
    user: {
      name: string | null; // 'name' can be 'null' if not set
    };
  };
}

export const CheckoutForm = ({
  clientSecret,
  user,
  startDate,
  endDate,
  adults,
  data,
  stayingNights,
  pets,
  childCount,
}: CheckoutFormProps) => {
  const countryData = useMemo(() => Country.getAllCountries(), []);

  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const [cardCompany, setCardCompany] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState<ICountry | null>(null);
  const [message, setMessage] = useState<string | null | undefined>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isCardElementFocused, setIsCardElementFocused] = useState(false);
  const [isExpiryDateFocused, setIsExpiryDateFocused] = useState(false);
  const [isCvcFocused, setIsCvcFocused] = useState(false);
  const [isCardElementInvalid, setIsCardElementInvalid] = useState(false);
  const [isExpiryDateInvalid, setIsExpiryDateInvalid] = useState(false);
  const [isCvcInvalid, setIsCvcInvalid] = useState(false);

  const handleCardCompanyInputChange = (cardCompany: string) => {
    setCardCompany(cardCompany);
  };
  const handleCountryInputChange = (value: string) => {
    const selectedCountry = countryData.find((c) => c.isoCode === value);
    setCountry(selectedCountry || null);
  };
  const handleZipcodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value);
  };

  const stripeElementStyle = {
    base: {
      color: "#000000",
      fontSize: "16px",
      fontFamily: "Nunito",
      "::placeholder": {
        color: "#71717a",
      },
    },
    invalid: {
      color: "#000000",
      iconColor: "#000000",
    },
    complete: {
      color: "#000000",
    },
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement)!,
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      },
    );

    if (error) {
      setIsProcessing(false);
      setMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      // Create a FormData object
      const formData = new FormData();

      // Populate the FormData with necessary fields
      formData.append("userId", user?.id!);
      formData.append("listingId", data.id);
      formData.append("startDate", startDate.toISOString());
      formData.append("endDate", endDate.toISOString());
      formData.append("totalPrice", paymentIntent.amount.toString());
      formData.append("adultCount", adults.toString());
      formData.append("childCount", childCount?.toString() || "0");
      formData.append("petCount", pets?.toString() || "0");
      formData.append("stayingNights", stayingNights.toString());

      try {
        await createReserevation(formData);
        redirect("/trips");
      } catch (error) {
        console.error("Failed to create reservation:", error);
        setMessage("Reservation creation failed. Please contact support.");
      }
    } else {
      console.log("Payment status:", paymentIntent.status);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-7 flex flex-col gap-2">
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
            <SelectTrigger className="h-14 w-full rounded-lg border border-zinc-300 pl-4 text-base">
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
            <div className="relative w-full">
              <CardNumberElement
                id="cardNumber"
                onBlur={() => {
                  setIsFocused(false);
                  setIsCardElementFocused(false);
                }}
                onFocus={() => {
                  setIsFocused(true);
                  setIsCardElementFocused(true);
                }}
                onChange={(event) => {
                  setIsCardElementInvalid(!!event.error);
                }}
                options={{
                  style: stripeElementStyle,
                  placeholder: "0000 0000 0000 0000",
                }}
                className={cn("card-input rounded-t-lg border", {
                  "outline-customized":
                    isCardElementFocused && !isCardElementInvalid,
                  "card-input-invalid":
                    !isCardElementFocused && isCardElementInvalid && !isFocused,
                  "outline-customized-invalid":
                    isCardElementFocused && isCardElementInvalid,
                })}
              />

              <label
                htmlFor="cardNumber"
                className={cn("card-label", {
                  "!font-bold !text-rose-500": isCardElementInvalid,
                })}
              >
                Card Number
              </label>
            </div>

            <div className="flex">
              <div className="relative w-full">
                <CardExpiryElement
                  id="expiryDate"
                  onBlur={() => {
                    setIsFocused(false);
                    setIsExpiryDateFocused(false);
                  }}
                  onFocus={() => {
                    setIsFocused(true);
                    setIsExpiryDateFocused(true);
                  }}
                  onChange={(event) => {
                    setIsExpiryDateInvalid(!!event.error);
                  }}
                  options={{ style: stripeElementStyle }}
                  className={cn(
                    "card-input rounded-bl-lg border-b border-l border-r",
                    {
                      "outline-customized":
                        isExpiryDateFocused && !isExpiryDateInvalid,
                      "card-input-invalid":
                        !isExpiryDateFocused &&
                        isExpiryDateInvalid &&
                        !isFocused,
                      "outline-customized-invalid":
                        isExpiryDateFocused && isExpiryDateInvalid,
                    },
                  )}
                />

                <label
                  htmlFor="expiryDate"
                  className={cn("card-label", {
                    "!font-bold !text-rose-500": isExpiryDateInvalid,
                  })}
                >
                  Expiry Date
                </label>
              </div>

              <div className="relative w-full">
                <CardCvcElement
                  id="cvc"
                  onBlur={() => {
                    setIsFocused(false);
                    setIsCvcFocused(false);
                  }}
                  onFocus={() => {
                    setIsFocused(true);
                    setIsCvcFocused(true);
                  }}
                  onChange={(event) => {
                    setIsCvcInvalid(!!event.error);
                  }}
                  options={{ style: stripeElementStyle, placeholder: "123" }}
                  className={cn("card-input rounded-br-lg border-b border-r", {
                    "outline-customized": isCvcFocused && !isCvcInvalid,
                    "card-input-invalid":
                      !isCvcFocused && isCvcInvalid && !isFocused,
                    "outline-customized-invalid": isCvcFocused && isCvcInvalid,
                  })}
                />

                <label
                  htmlFor="cvc"
                  className={cn("card-label", {
                    "!font-bold !text-rose-500": isCvcInvalid,
                  })}
                >
                  CVC
                </label>
              </div>
            </div>
          </div>
          <FormInput
            label="Zipcode(optional)"
            id="zipcode"
            value={zipcode}
            onChange={handleZipcodeInputChange}
            className="h-14 border-zinc-300"
          />

          <Select onValueChange={handleCountryInputChange}>
            <SelectTrigger className="h-14 w-full rounded-lg border border-zinc-300 pl-4 text-base">
              <SelectValue
                placeholder={<p className="text-zinc-500">Country / region</p>}
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
      <GroundRules />
      <SubmitButton
        isPending={isProcessing}
        label="Confirm and Pay"
        className="mb-5 h-14"
      ></SubmitButton>
      {message && (
        <div
          id="payment-message"
          className="w-full text-center text-sm text-zinc-500"
        >
          {message}
        </div>
      )}
    </form>
  );
};
