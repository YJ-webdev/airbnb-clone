import { PreviewImages } from "@/app/components/preview-images";
import prisma from "@/app/lib/db";
import getSession from "@/app/lib/get-session";
import { Scroll } from "lucide-react";
import Image from "next/image";

export default async function ReservationsPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return <div>Please login...</div>;
  }

  const data = await prisma.reservation.findMany({
    where: {
      userId: user.id,
    },
    include: {
      listing: {
        select: { city: true, state: true, country: true, user: true },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="container mt-10 min-h-[80vh] max-w-[1280px]">
      <header className="mb-8 flex flex-col items-baseline justify-center">
        <h1 className="text-2xl font-semibold">
          {data.length === 0
            ? "You have no reservations"
            : `You have ${data.length} ${data.length === 1 ? "reservation" : "reservations"}`}
        </h1>
        <p>The list shows payment status and the date you reserved.</p>
      </header>

      {data.length === 0 ? (
        <div className="flex h-[70vh] w-full items-center justify-center rounded-lg bg-zinc-50 text-center">
          <div className="flex flex-col items-center gap-2">
            <Scroll strokeWidth={1.5} size={24} />
            <p className="text-lg font-semibold">You have no reservations</p>
          </div>
        </div>
      ) : (
        <div className="mb-10 flex flex-col gap-7">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 md:h-[30vh] md:flex-row md:gap-5"
            >
              <div className="h-[250px] w-full md:h-full md:flex-1">
                <PreviewImages />
              </div>
              <div className="flex h-full flex-1 flex-col items-stretch gap-1">
                <p className="text-end font-semibold">Paid</p>
                <div className="flex items-center justify-between gap-2">
                  <p>Date Reserved</p>{" "}
                  <p>
                    {item.startDate.toLocaleDateString()} -{" "}
                    {item.endDate.toLocaleDateString()}
                  </p>
                </div>
                <div className="items-baselinegap-2 flex justify-between">
                  <p>Destination</p>
                  <p>
                    {item.listing.state && `${item.listing.state}, `}
                    {item.listing.country}
                  </p>
                </div>
                <div className="flex flex-grow items-start justify-between gap-2">
                  <p>People</p>
                  <div className="flex flex-col gap-1 text-right">
                    <p>
                      {item.adults === 1 ? "1 Adult" : `${item.adults} Adults`}
                    </p>

                    {item.children === 0 ? (
                      ""
                    ) : (
                      <p>
                        {item.children === 1
                          ? "1 Child"
                          : `${item.children} Children`}
                      </p>
                    )}

                    {item.pets === 0 ? (
                      ""
                    ) : (
                      <p>{item.pets === 1 ? "1 Pet" : `${item.pets} Pets`}</p>
                    )}
                  </div>
                </div>

                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <p>Hosted by</p>
                  <div className="flex items-baseline gap-2">
                    <p>{item.listing.user.name}</p>

                    <Image
                      src={item.listing.user.image as string}
                      alt="Host Picture"
                      width={50}
                      height={50}
                      className="h-10 w-10 translate-y-2 rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
}
