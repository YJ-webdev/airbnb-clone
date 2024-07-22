import { Listing } from "@prisma/client";
import { Montserrat } from "next/font/google";

interface ReservePanelProps {
  data: Listing;
  isHost: boolean;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ReservePanel = ({ data, isHost }: ReservePanelProps) => {
  return (
    <>
      <div className="relative mr-6 hidden h-[500px] w-[350px] rounded-lg border p-6 md:flex md:flex-col">
        <h3 className={`${montserrat.className} text-[22px] font-semibold`}>
          ${data.price} <span className="text-base font-medium">/ night</span>
        </h3>
        <div className="flex-grow"></div>
        {isHost ? (
          <button className="w-full rounded-full bg-black px-5 py-3 font-semibold text-white hover:bg-zinc-500">
            Edit listing
          </button>
        ) : (
          <button className="w-full rounded-full bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white">
            Reserve
          </button>
        )}
      </div>

      <div className="fixed bottom-0 left-0 flex h-[80px] w-full items-center justify-between border-t bg-white p-6 md:hidden">
        <h3>
          <span className={`${montserrat.className} text-[22px] font-semibold`}>
            ${data.price}
          </span>{" "}
          / night
        </h3>
        <button className="rounded-full bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white">
          Reserve
        </button>
      </div>
    </>
  );
};
