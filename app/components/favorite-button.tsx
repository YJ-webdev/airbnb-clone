// import { cn } from "@/lib/utils";
// import { Listing, UserRole } from "@prisma/client";
// import { Heart } from "lucide-react";
// import { DefaultSession } from "next-auth";

// interface FavoriteButtonProps {
//   data: Listing;
//   position?: string;
//   user?: {
//     role: UserRole;
//     favoriteIds: string[];
//   } & DefaultSession["user"];
// }

// export const FavoriteButton = ({
//   position,
//   user,
//   data,
// }: FavoriteButtonProps) => {
//   const isFavorite = user?.favoriteIds.includes(data.id);

//   return (
//     <div
//       className={cn(
//         "z-10 h-7 w-7 cursor-pointer border-none bg-transparent p-0 transition-all active:scale-90",
//         position ?? "absolute right-5 top-5",
//       )}
//       aria-label="Add to favorites" // Optional but recommended for accessibility
//     >
//       <Heart
//         className={`h-full w-full text-white transition-all hover:fill-rose-500 ${isFavorite ? "fill-rose-500" : "fill-white/50"}`}
//         strokeWidth={1.5}
//       />
//     </div>
//   );
// };
