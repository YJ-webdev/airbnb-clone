// "use client";

// import { createListing } from "@/app/action/create-listing";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { User } from "next-auth";
// import { LoginDialog } from "../login-dialog/login-dialog";

// interface AirbnbYourHomeButtonProps {
//   user?: User;
// }

// export const AirbnbYourHomeButton = ({ user }: AirbnbYourHomeButtonProps) => {
//   const createListingWithId = createListing.bind(null, {
//     userId: user?.id as string,
//   });

//   return (
//     <form action={createListingWithId}>
//       {user ? (
//         <button
//           type="submit"
//           className="line-clamp-1 hidden cursor-pointer text-nowrap rounded-full py-3 text-center text-[15px] font-semibold transition hover:bg-neutral-100 md:block md:px-4 lg:mr-4"
//         >
//           Airbnb your home
//         </button>
//       ) : (
//         <Dialog>
//           <DialogTrigger className="line-clamp-1 hidden cursor-pointer text-nowrap rounded-full py-3 text-center text-[15px] font-semibold transition hover:bg-neutral-100 md:block md:px-4 lg:mr-4">
//             Airbnb your home
//           </DialogTrigger>
//           <DialogContent className="flex max-h-[75%] flex-col overflow-hidden p-0">
//             <LoginDialog />
//           </DialogContent>
//         </Dialog>
//       )}
//     </form>
//   );
// };
