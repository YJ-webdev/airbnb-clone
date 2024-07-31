import { Listing } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { CongratulationsMessage } from "./congratulations-message";

export default function Congratulations({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="relative flex h-screen">
      <Image
        className="absolute -z-10 w-full object-cover"
        src="https://media.cntraveler.com/photos/6439708de281b56fd186eca2/16:9/w_1920,c_limit/slow%20travel%20-%20sunset%20-%20GettyImages-1295941145.jpg"
        // height={700}
        // width={1000}
        alt="congratulations"
        fill={true}
      />

      <CongratulationsMessage params={params} />
    </div>
  );
}
