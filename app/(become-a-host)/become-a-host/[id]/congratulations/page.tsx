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
        src="https://media.cntraveler.com/photos/5f6abb5a4297925b041ef2b9/16:9/w_1920%2Cc_limit/le-barthelemy.jpg"
        // height={700}
        // width={1000}
        alt="congratulations"
        fill={true}
      />

      <CongratulationsMessage params={params} />
    </div>
  );
}
