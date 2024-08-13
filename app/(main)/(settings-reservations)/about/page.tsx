import { GithubIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mt-10 min-h-[80vh] max-w-[1280px]">
      <header className="mb-8 flex flex-col items-baseline justify-center">
        <h1 className="text-2xl font-semibold">About this site</h1>
        <p>
          This site is a demo of Airbnb clone built with Next.js and TypeScript.
        </p>
      </header>

      <div className="mb-5 flex w-full flex-col justify-center gap-10 rounded-lg bg-zinc-50 p-5 pb-5 md:h-[60vh] md:flex-row md:gap-0">
        <div className="flex flex-col items-end justify-center gap-2 p-5 md:flex-1">
          <h3 className="max-w-[500px] text-base">
            <span className="text-4xl">Hi, </span>
            {""}This page is a demo of Airbnb.com just on my dev practice
            purpose. I am not taking any profit from this site. If you would
            like to test for the reservation page, add{" "}
            <u>4242 4242 4242 4242</u> on the card input. You can visit my
            github if you would like to see the code. Chaos.
          </h3>
          <p>-Youjung Lee</p>
          <Link
            href={"https://github.com/YJ-webdev/airbnb-clone"}
            target="_blank"
            className="flex gap-2 text-blue-500 hover:underline"
          >
            <GithubIcon />{" "}
            <p className="line-clamp-1">
              https://github.com/YJ-webdev/airbnb-clone
            </p>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-5 md:flex-1">
          <Image
            src="/images/bundo-kim-korea.jpg"
            alt="bumdo kim"
            width={500}
            height={500}
            className="h-full w-auto object-cover"
          />

          <p className="text-sm">
            photo&apos;s credit to{" "}
            <Link href="https://unsplash.com/ko/@bundo" target="_blank">
              Kim Bundo
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
