import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export const SecureLeaflet = () => {
  return (
    <div className="hidden rounded-lg border border-zinc-200 p-6 md:ml-5 md:block md:w-2/5">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4">
          <Image
            src="/images/trust.png"
            alt="Secure"
            height="100"
            width="100"
            className="h-14 w-14"
          />
          <h2 className="text-[20px] font-bold">
            Why isn’t my info shown here?
          </h2>
          <p className="text-muted-foreground">
            We’re hiding some account details to protect your identity.
          </p>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <Image
            src="/images/secure.png"
            alt="Secure"
            height="100"
            width="100"
            className="h-14 w-14"
          />
          <h2 className="text-[20px] font-bold">
            Which details can be edited?
          </h2>
          <p className="text-muted-foreground">
            Contact info and personal details can be edited. If this info was
            used to verify your identity, you’ll need to get verified again the
            next time you book—or to continue hosting.
          </p>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <Image
            src="/images/protected.png"
            alt="Secure"
            height="100"
            width="100"
            className="h-14 w-14"
          />
          <h2 className="text-[20px] font-bold">
            What info is shared with others?
          </h2>
          <p className="text-muted-foreground">
            Airbnb only releases contact information for Hosts and guests after
            a reservation is confirmed.
          </p>
        </div>
      </div>
    </div>
  );
};
