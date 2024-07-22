import { Listing } from "@prisma/client";
import { Montserrat } from "next/font/google";

interface ReservePanelProps {
  data: Listing;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const ReservePanel = ({ data }: ReservePanelProps) => {
  return (
    <>
      <div className="relative mr-6 hidden h-[500px] w-[350px] rounded-lg border p-6 md:flex md:flex-col">
        <h3 className={`${montserrat.className} text-[22px] font-semibold`}>
          ${data.price} <span className="text-base font-medium">/ night</span>
        </h3>
        <div className="flex-grow"></div>
        <button className="w-full rounded-full bg-rose-500 px-5 py-3 font-semibold text-white">
          Reserve
        </button>
      </div>

      <div className="fixed bottom-0 left-0 flex h-[80px] w-full items-center justify-between border-t bg-white p-6 md:hidden">
        <h3>
          <span className={`${montserrat.className} text-[22px] font-semibold`}>
            ${data.price}
          </span>{" "}
          / night
        </h3>
        <button className="rounded-full bg-rose-500 px-5 py-3 font-semibold text-white">
          Reserve
        </button>
      </div>
    </>
  );
};
