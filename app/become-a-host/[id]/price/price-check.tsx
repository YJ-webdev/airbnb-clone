import { formatNumber } from "@/app/lib/format-money";
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

export const PriceCheck = ({ typedValue }: PriceCheckProps) => {
  const formattedValue = formatNumber(typedValue);
  const guestServiceFee = formatNumber(typedValue * GUEST_SERVICE_FEE);
  const guestPrice = formatNumber(typedValue * GUEST_SERVICE_FEE + typedValue);
  const hostServiceFee =
    typedValue > 0 && typedValue < 50
      ? "1"
      : typedValue > 50 && typedValue < 83
        ? "2"
        : formatNumber(typedValue * HOST_SERVICE_FEE);
  const hostEarn = formatNumber(typedValue - Number(hostServiceFee));

  return (
    <div>
      <div className="mx-auto">
        <div>
          <Accordion
            type="single"
            collapsible
            className="rounded-xl bg-white px-5 py-2 shadow-[0_2px_10px_3px_rgba(0,0,0,0.05)]"
          >
            <AccordionItem value="item-1">
              <AccordionContent className="mb-0 mt-5 pb-0">
                <div className="mx-auto flex w-64 justify-between text-base font-normal">
                  <p>Base price</p> <p>${formattedValue}</p>
                </div>
                <div className="mx-auto flex w-64 justify-between text-base font-normal">
                  <p>Guest service fee</p> <p>${guestServiceFee}</p>
                </div>
              </AccordionContent>
              <AccordionTrigger>
                {" "}
                <div className="mx-auto mb-2 flex w-64 justify-between text-base font-semibold">
                  <p>Guest price</p> <p>${guestPrice}</p>
                </div>
              </AccordionTrigger>
            </AccordionItem>
            <hr className="border-zinc-300" />
            <AccordionItem value="item-2">
              <AccordionContent className="mb-0 mt-5 border-none pb-0">
                <div className="mx-auto flex w-64 justify-between text-base font-normal">
                  <p>Base price</p> <p>${formattedValue}</p>
                </div>
                <div className="mx-auto flex w-64 justify-between text-base font-normal">
                  <p>Host service fee</p> <p>-${hostServiceFee}</p>
                </div>
              </AccordionContent>
              <AccordionTrigger className="border-none">
                <div className="mx-auto flex w-64 justify-between border-none text-base font-semibold">
                  <p>You earn</p> <p>${hostEarn}</p>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
