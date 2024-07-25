"use client";

import { Check, Copy } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { BiLogoMessenger } from "react-icons/bi";
import { FaLine, FaWhatsapp } from "react-icons/fa";

import {
  TwitterShareButton,
  WhatsappShareButton,
  FacebookMessengerIcon,
  LineShareButton,
  LineIcon,
} from "react-share";

import { Listing } from "@prisma/client";
import { useState } from "react";

interface SocialShareProps {
  data: Listing;
}

export const SocialShare = ({ data }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/listing/${data.id}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="justfity-center flex items-center gap-6">
      <TwitterShareButton
        url={`http://localhost:3000/listing/${data.id!}`}
        title={data.title! ?? ""}
      >
        <FaXTwitter className="h-5 w-5 cursor-pointer text-zinc-600 transition-all hover:text-zinc-800" />
      </TwitterShareButton>

      <WhatsappShareButton url={`http://localhost:3000/listing/${data.id!}`}>
        <FaWhatsapp className="h-6 w-6 cursor-pointer text-zinc-600 transition-all hover:text-zinc-800" />
      </WhatsappShareButton>

      <LineShareButton url={"/listing/${data.id}"}>
        <FaLine className="h-6 w-6 cursor-pointer text-zinc-600 transition-all hover:text-zinc-800" />
      </LineShareButton>

      <button onClick={onCopy} className="cursor-pointer transition-all">
        {copied ? (
          <Check className="h-5 w-5 text-zinc-600 transition-all hover:text-zinc-800" />
        ) : (
          <span title="Copy URL">
            <Copy className="h-5 w-5 text-zinc-600 transition-all hover:text-zinc-800" />
          </span>
        )}
      </button>
    </div>
  );
};
