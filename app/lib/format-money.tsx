export const f = new Intl.NumberFormat("en-es", {
  style: "currency",
  currency: "USD",
});

export const formatNumber = (value: string | number): string => {
  // Parse the input value to ensure it's a number
  const numberValue =
    typeof value === "string"
      ? parseInt(value.replace(/[^\d]/g, ""), 10)
      : Math.floor(value);

  // Handle NaN case or empty string
  if (isNaN(numberValue) || numberValue === 0) {
    return "0";
  }

  // Format the number using Intl.NumberFormat
  return new Intl.NumberFormat("en-US").format(numberValue);
};
