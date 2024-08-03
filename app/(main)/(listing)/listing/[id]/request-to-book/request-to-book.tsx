"use client";

import { createReserevation } from "@/app/actions/reservations";
import { useDatePick } from "@/app/context/date-pick-context";
import { useGuestCount } from "@/app/context/guest-count-context";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { Listing } from "@prisma/client";
import { redirect } from "next/navigation";

export default function RequestToBook({
  data,
  user,
}: {
  data: Listing;
  user: UserWithRoleAndFavoriteIds;
}) {
  if (!user) console.log("login");

  const { startDate, endDate, stayingNights } = useDatePick();
  const { adultCount, childCount, petCount } = useGuestCount();
  const totalPrice = stayingNights * data?.guestPrice!;

  return (
    <form>
      <input type="hidden" name="userId" value={user?.id} />
      <input type="hidden" name="listingId" value={data?.id} />
      <input type="hidden" name="startDate" value={startDate?.toISOString()} />
      <input type="hidden" name="endDate" value={endDate?.toISOString()} />
      <input type="hidden" name="totalPrice" value={totalPrice} />
      <input type="hidden" name="adultCount" value={adultCount} />
      <input type="hidden" name="childCount" value={childCount} />
      <input type="hidden" name="petCount" value={petCount} />
      <input type="hidden" name="stayingNights" value={stayingNights} />
      Request to book
    </form>
  );
}
