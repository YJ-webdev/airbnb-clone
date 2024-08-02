import prisma from "@/app/lib/db";
import getSession from "@/app/lib/get-session";

export default async function ReservationsPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return <div>Redirecting...</div>;
  }

  const data = await prisma.reservation.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      startDate: "asc",
    },
  });

  return (
    <div className="container min-h-[80vh]">
      <div>
        You have{data.length}{" "}
        {data.length === 1 ? "reservation" : "reservations"}
      </div>
      <div>
        {data.map((item) => (
          <div key={item.id}>{item.id}</div>
        ))}
      </div>
    </div>
  );
}
