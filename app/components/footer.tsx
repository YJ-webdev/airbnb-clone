"use client";

import styled from "styled-components";
import { useContentWidth } from "../context/ContentWidthContext";

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

export default function Footer() {
  const ResponsiveContainer = styled.div<{ contentWidth: string }>`
    width: ${({ contentWidth }) => contentWidth};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    transition: all 0.3s ease-in-out;
  `;

  const { contentWidth } = useContentWidth();

  return (
    <footer className="flex h-full w-full border-t bg-zinc-200">
      <ResponsiveContainer
        contentWidth={contentWidth}
        className="container px-1"
      >
        <div className="flex w-full flex-col gap-y-4 text-left text-sm">
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
      </ResponsiveContainer>
    </footer>
  );
}
