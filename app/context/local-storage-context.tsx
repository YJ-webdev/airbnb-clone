"use client";

import {
  BecomeAHost,
  NewListingInitialValues,
  newListingInitialValuesSchema,
} from "@/schema/become-a-host";
import React, { createContext, useEffect, useState } from "react";

const defaultData: NewListingInitialValues = {
  category: "",
  guest: 1,
  bathroom: 1,
  bedroom: 0,
  bed: 0,
  country: "",
  state: "",
  city: "",
  location: "",
  title: "",
  description: "",
  price: undefined,
};

interface useLocalStorageProps {
  newData: NewListingInitialValues;
  updateNewData: (data: Partial<NewListingInitialValues>) => void;
  dataLoaded: boolean;
}

export const LocalStorageContext = createContext<useLocalStorageProps | null>(
  null,
);

export const LocalStorageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newData, setNewData] = useState<NewListingInitialValues>(defaultData);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const readFromLocalStorage = () => {
      const data = localStorage.getItem("data");
      if (!data) {
        setNewData(defaultData);
      } else {
        const validated = newListingInitialValuesSchema.safeParse(
          JSON.parse(data),
        );
        if (validated.success) {
          setNewData(validated.data);
        } else {
          setNewData(defaultData);
        }
      }
      setDataLoaded(true);
    };

    readFromLocalStorage();
  }, []);

  const updateNewData = (data: Partial<NewListingInitialValues>) => {
    setNewData((prev) => {
      const updatedData = { ...prev, ...data };
      localStorage.setItem("data", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return (
    <LocalStorageContext.Provider
      value={{ newData, updateNewData, dataLoaded }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
