import { Counter } from "@/app/components/counter";
import { PersonStanding } from "lucide-react";

export default function FloorPlanRoute() {
  return (
    <>
      <div className="mx-auto max-w-2xl">
        <h2 className="mx-auto pl-6 pr-6 pt-6 text-2xl font-semibold transition-colors md:pl-0 md:pr-0 md:pt-5 md:text-3xl">
          Let&apos;s start with the basics!
          <span className="text-[20px] font-medium text-muted-foreground">
            {" "}
            —You&apos;ll add more details later,
          </span>
        </h2>
        <div className="pl-6 pr-6 pt-5 md:pl-0 md:pr-0 md:text-3xl">
          <div className="mt-8 flex flex-col gap-y-5 border-b pb-5">
            <div className="flex items-center justify-between">
              <div className="flex-flex-col">
                <h3 className="flex gap-2 text-lg font-semibold">
                  Guests
                  <div className="flex">
                    <PersonStanding />
                    <PersonStanding />
                  </div>
                </h3>
                <p className="text-[16px] text-muted-foreground">
                  How many guests fit comfortably in your place?
                </p>
              </div>
              <Counter />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-5 border-b pb-8">
            <div className="flex items-center justify-between">
              <div className="flex-flex-col">
                <h3 className="text-lg font-semibold">Bedrooms</h3>
              </div>
              <Counter />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-5 border-b pb-8">
            <div className="flex items-center justify-between">
              <div className="flex-flex-col">
                <h3 className="text-lg font-semibold">Beds</h3>
              </div>
              <Counter />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-5 border-b pb-8">
            <div className="flex items-center justify-between">
              <div className="flex-flex-col">
                <h3 className="text-lg font-semibold">Bathrooms</h3>
              </div>
              <Counter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
