import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export const PriceCheck = () => {
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
                  <p>Base price</p> <p>$120,000</p>
                </div>
                <div className="mx-auto flex w-64 justify-between text-base font-normal">
                  <p>Guest service fee</p> <p>$16,941</p>
                </div>
              </AccordionContent>
              <AccordionTrigger>
                {" "}
                <div className="mx-auto mb-2 flex w-64 justify-between text-base font-semibold">
                  <p>Guest price</p> <p>$136,941</p>
                </div>
              </AccordionTrigger>
            </AccordionItem>
            <hr className="border-zinc-300" />
            <AccordionItem value="item-2">
              <AccordionContent className="mb-0 mt-5 border-none pb-0">
                <div className="mx-auto flex w-64 justify-between text-base font-normal">
                  <p>Base price</p> <p>$120,000</p>
                </div>
                <div className="mx-auto flex w-64 justify-between text-base font-normal">
                  <p>House service fee</p> <p>$3,960</p>
                </div>
              </AccordionContent>
              <AccordionTrigger className="border-none">
                <div className="mx-auto flex w-64 justify-between border-none text-base font-semibold">
                  <p>You earn</p> <p>$116,040</p>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
