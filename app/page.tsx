import { Categories } from "./become-a-host/[id]/structure/categories";
import { ListingCard } from "./components/listing-card";
import prisma from "./lib/db";

export default async function Home() {
  const user = false;
  const data = await prisma.listing.findMany({
    where: {
      addedCategory: true,
      addedFloorPlan: true,
      addedLocation: true,
      addedPhotos: true,
      addedDescription: true,
      addedPrice: true,
      approved: true,
    },
    select: {
      imageSrc: true,
      id: true,
      price: true,
      description: true,
      title: true,
      country: true,
      city: true,
      locationValue: true,
      guestCount: true,
      roomCount: true,
      bedCount: true,
      bathroomCount: true,
    },
  });

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <Categories />
      <div>
        {data.map((item) => (
          <ListingCard
            key={item.id!}
            imageSrc={item.imageSrc!}
            location={item.locationValue!}
            price={item.price!}
            country={item.country!}
            city={item.city!}
          />
        ))}
      </div>
    </div>
  );
}
