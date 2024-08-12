import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiCreditCardLight } from "react-icons/pi";
import { FormInput } from "@/app/components/form/form-input";
import { PAYMENT_METHODS } from "@/app/lib/payment-method";
import { GroundRules } from "./ground-rules";
import { SubmitButton } from "@/app/components/form/submit-button";
import React, { useEffect, useState, useTransition } from "react";
import { Country, ICountry } from "country-state-city";

import { useStripe, useElements } from "@stripe/react-stripe-js";
import {
  CardCvcInput,
  CardExpiryInput,
  CardNumberInput,
} from "./stripe-elements";

export const CheckoutForm = () => {
  let countryData = Country.getAllCountries();

  const stripe = useStripe();
  const elements = useElements();

  const [cardCompany, setCardCompany] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState<ICountry | null>(null);
  const [isPending, startTransition] = useTransition();

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

  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/reservation-success",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
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
            <CardNumberInput id="cardNumber" label="Card Number" />
            <div className="flex">
              <CardExpiryInput
                id="expiryDate"
                label="Expiry Date"
                className="rounded-br-none"
              />
              <CardCvcInput id="cvc" label="CVC" className="rounded-bl-none" />
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
        isPending={isPending}
        label="Confirm and Pay"
        className="h-14"
      ></SubmitButton>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};
