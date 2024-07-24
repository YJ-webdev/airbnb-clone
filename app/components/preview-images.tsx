"use client";

import { dummyImages } from "@/app/data/dummy-images";
import { Listing } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./image-modal";

export const PreviewImages = ({ data }: { data?: Listing }) => {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [index, setIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((index) => (index === 0 ? dummyImages.length - 1 : index - 1));
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((index) => (index === dummyImages.length - 1 ? 0 : index + 1));
  };

  const openModal = (index: number) => {
    setModalIndex(index);
  };
  const closeModal = () => {
    setModalIndex(null);
  };

  const showPrev = () => {
    if (modalIndex !== null && modalIndex > 0) {
      setModalIndex(modalIndex - 1);
    }
  };
  const showNext = () => {
    if (modalIndex !== null && modalIndex < dummyImages.length - 1) {
      setModalIndex(modalIndex + 1);
    }
  };

  return (
    <div className="group relative h-[60vh] w-full overflow-hidden rounded-lg transition-all">
      <div
        onClick={(event) => {
          event.stopPropagation();
          openModal(index);
        }}
        className="flex h-full w-full cursor-pointer transition-all duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {dummyImages.map((url, i) => (
          <div
            key={i}
            className="relative h-full w-full flex-shrink-0 bg-zinc-200"
          >
            <Image
              src={url}
              alt="Image of home"
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 rounded-full bg-white transition-opacity duration-1000 ease-in-out hover:scale-105 group-hover:block"
      >
        <ChevronLeft
          size={20}
          className="ml-1 transition-all hover:-translate-x-[1px] hover:scale-105"
          strokeWidth={1.5}
        />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 rounded-full bg-white transition-opacity duration-1000 ease-in-out hover:scale-105 group-hover:block"
      >
        <ChevronRight
          size={20}
          className="ml-2 transition-all hover:translate-x-[1px] hover:scale-105"
          strokeWidth={1.5}
        />
      </button>

      {modalIndex !== null && (
        <ImageModal
          currentIndex={modalIndex}
          onClose={closeModal}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </div>
  );
};
