"use client";

import { cn } from "@/lib/utils";
import { Width } from "./navbar/Navbar";

interface FooterSectionProps {
  title: string;
  items: string[];
}

interface FooterSectionData {
  title: string;
  items: string[];
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, items }) => (
  <div className="m-5 flex flex-col gap-y-4 text-left text-sm">
    <p className="font-bold">{title}</p>
    {items.map((item, index) => (
      <p key={index} className="hover:underline">
        {item}
      </p>
    ))}
  </div>
);

const footerSections: FooterSectionData[] = [
  {
    title: "Support",
    items: [
      "Help Center",
      "Get help with a safety issue",
      "AirCover",
      "Anti-discrimination",
      "Disability support",
      "Cancellation options",
      "Report neighborhood concern",
    ],
  },
  {
    title: "Support",
    items: [
      "Help Center",
      "Get help with a safety issue",
      "AirCover",
      "Anti-discrimination",
      "Disability support",
      "Cancellation options",
    ],
  },
  {
    title: "Support",
    items: [
      "Help Center",
      "Get help with a safety issue",
      "AirCover",
      "Anti-discrimination",
      "Disability support",
    ],
  },
];

export default function Footer({ width }: Width) {
  return (
    <footer className="flex h-full border-t bg-zinc-200">
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1400px] flex-col gap-y-4 text-left text-sm",
          width === "1280px" && "max-w-[1280px]",
          width === "1100px" && "max-w-[1100px]",
        )}
      >
        <div className="mb-12 mt-8 flex w-full justify-start md:gap-20 lg:gap-44">
          {footerSections.map((section, index) => (
            <FooterSection
              key={index}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>
        <p className="text-center">© 2034 Airbnb, Inc.</p>
      </div>
    </footer>
  );
}
