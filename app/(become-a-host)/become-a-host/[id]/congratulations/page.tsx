import { Listing } from "@prisma/client";
import Link from "next/link";

export default function Congratulations({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container max-w-[1370px] pt-32">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          Congratulations!
        </h2>
        <p className="text-base">
          Your listing is uploaded. You can view it{" "}
          <Link href={`/listing/${params.id}`}>
            <span className="underline">here</span>
          </Link>
          , or you can always visit to{" "}
          <Link href={`/host`}>
            <span className="underline">become a host</span>
          </Link>{" "}
          page to review or edit.
        </p>
      </div>
    </div>
  );
}
