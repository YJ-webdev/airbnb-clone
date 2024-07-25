import prisma from "../lib/db";
import { User } from "@prisma/client";

interface isHostProps {
  userId: string;
  listingId: string;
}

const isHost = async ({ userId, listingId }: isHostProps) => {
  const userWithListings = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      listings: {
        where: {
          id: listingId,
        },
        select: {
          id: true,
        },
      },
    },
  });
  // Check if userWithListings and userWithListings.listings are defined
  return userWithListings;
};

export default isHost;
