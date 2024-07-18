import { Montserrat } from "next/font/google";
import { formatCeil, formatFloor } from "@/app/lib/format-money";
import { GUEST_SERVICE_FEE, HOST_SERVICE_FEE } from "@/app/lib/library";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PriceCheckProps {
  typedValue: number;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const PriceCheck = ({ typedValue }: PriceCheckProps) => {
  const formattedValue = formatFloor(typedValue);
  const guestServiceFee = formatFloor(typedValue * GUEST_SERVICE_FEE);
  const guestPrice = formatFloor(typedValue * GUEST_SERVICE_FEE + typedValue);
  const hostServiceFeeWild = HOST_SERVICE_FEE(typedValue);
  const hostServiceFee = formatCeil(hostServiceFeeWild);
  const hostEarn = formatFloor(typedValue - hostServiceFeeWild);

  return (
    <div>
      <div className="z-10 mx-auto">
        <div>
          <Accordion
            type="single"
            collapsible
            className="border bg-white px-5 py-2 shadow-sm"
          >
            <AccordionItem value="item-1">
              <AccordionContent className="mb-0 mt-5 pb-0">
                <div className="mx-auto flex w-64 justify-between text-base font-normal">
                  <p className={`${montserrat.className}`}>Base price</p>{" "}
                  <p className={`${montserrat.className}`}>${formattedValue}</p>
                </div>
                <div className="mx-auto flex w-64 justify-between text-base font-normal">
                  <p className={`${montserrat.className} font-[400]`}>
                    Guest service fee
                  </p>{" "}
                  <p className={`${montserrat.className}`}>
                    ${guestServiceFee}
                  </p>
                </div>
              </AccordionContent>
              <AccordionTrigger className="z-10">
                {" "}
                <div className="mx-auto mb-2 flex w-64 justify-between text-base font-semibold">
                  <p className={`${montserrat.className} font-[500]`}>
                    Guest price
                  </p>{" "}
                  <p className={`${montserrat.className} font-[500]`}>
                    ${guestPrice}
                  </p>
                </div>
              </AccordionTrigger>
            </AccordionItem>
            <hr className="border-zinc-300" />
            <AccordionItem value="item-2">
              <AccordionContent className="mb-0 mt-5 border-none pb-0">
                <div className="mx-auto flex w-64 justify-between text-base font-normal">
                  <p className={`${montserrat.className} font-[400]`}>
                    Base price
                  </p>{" "}
                  <p className={`${montserrat.className}`}>${formattedValue}</p>
                </div>
                <div className="mx-auto flex w-64 justify-between text-base font-normal">
                  <p className={`${montserrat.className} font-[400]`}>
                    Host service fee
                  </p>{" "}
                  <p className={`${montserrat.className}`}>
                    -${hostServiceFee}
                  </p>
                </div>
              </AccordionContent>
              <AccordionTrigger className="z-10 border-none">
                <div className="mx-auto flex w-64 justify-between border-none text-base font-semibold">
                  <p className={`${montserrat.className} font-[500]`}>
                    You earn
                  </p>{" "}
                  <p className={`${montserrat.className} font-[500]`}>
                    ${hostEarn}
                  </p>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
