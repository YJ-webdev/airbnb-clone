import Link from "next/link";
import React from "react";

export const CongratulationsMessage = ({
  params,
}: {
  params: { id: string };
}) => {
  return (
    <div className="absolute right-[50%] top-1/2 flex max-w-[450px] -translate-y-1/2 translate-x-1/2 flex-col gap-5 rounded-lg bg-white p-10">
      <h2 className="text-xl font-semibold">Congratulations!</h2>
      <p className="mb-3">
        Your listing is uploaded. You can always visit to{" "}
        <Link href={`/host`}>
          <span className="underline">Airbnb your home</span>
        </Link>{" "}
        to review or edit.
      </p>
      <Link
        href={`/`}
        className="rounded-full bg-gradient-to-r from-rose-500 to-[#e3326d] px-8 py-4 text-center text-white hover:bg-zinc-700"
      >
        Go to home page
      </Link>
    </div>
  );
};
