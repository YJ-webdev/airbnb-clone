// "use client";

// import { Button } from "@/components/ui/button";
// import React, { useState } from "react";

// interface SubmitButtonProps {
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   isLoading: boolean;
// }

// export const SubmitButton = ({
//   setIsLoading,
//   isLoading,
// }: SubmitButtonProps) => {
//   const handleProfileUpdate = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   };

//   return (
//     <Button
//       type="submit"
//       disabled={isLoading}
//       className="h-[50px] rounded-lg bg-rose-500 text-base font-semibold hover:bg-rose-400"
//       onClick={handleProfileUpdate}
//     >
//       {isLoading ? "Updating..." : "Confirm"}
//     </Button>
//   );
// };
