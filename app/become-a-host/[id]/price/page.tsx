import { PriceCheck } from "./price-check";
import { PriceInput } from "./price-input";

export default function PriceRoute() {
  return (
    <div className="mx-auto">
      <h2 className="mx-auto max-w-2xl pb-2 pl-6 pr-6 pt-5 text-2xl font-semibold transition-colors md:pl-0 md:pr-0 md:text-3xl">
        Now, set your price!{" "}
        <span className="text-[20px] font-medium text-muted-foreground transition-colors md:pl-0 md:pr-0">
          —You can change it anytime.
        </span>
      </h2>
      <div className="flex flex-col items-center justify-center gap-10">
        <PriceInput />
        <PriceCheck />
      </div>
    </div>
  );
}
