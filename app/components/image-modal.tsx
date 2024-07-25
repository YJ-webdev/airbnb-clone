import { useEffect, useState } from "react";
import Image from "next/image";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FileWithPreview } from "../(become-a-host)/become-a-host/[id]/photos/image-upload";
import { dummyImages } from "../data/dummy-images";

interface ImageModalProps {
  files?: FileWithPreview[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ImageModal = ({
  files,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImageModalProps) => {
  const images = files?.length ? files : dummyImages;
  const imageSrc = files?.length
    ? files[currentIndex].preview
    : dummyImages[currentIndex];

  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        onPrev();
      } else if (event.key === "ArrowRight") {
        onNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, onPrev, onNext]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX === 0) return;
    const touchX = e.touches[0].clientX;
    const diff = touchX - startX;

    if (diff > 50) {
      onPrev();
      setStartX(0); // Reset startX to prevent multiple triggers
    } else if (diff < -50) {
      onNext();
      setStartX(0); // Reset startX to prevent multiple triggers
    }
  };

  const handleTouchEnd = () => {
    setStartX(0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative h-full w-full bg-white lg:h-[650px] lg:w-[80vw] lg:rounded-xl"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex h-full w-full items-center justify-center px-7">
          <Image
            src={imageSrc}
            width={1000}
            height={1000}
            alt="Full size"
            className="z-0 mx-auto max-h-[80%] max-w-full rounded-xl object-contain lg:rounded-none"
          />
          <p className="absolute bottom-7 right-[5%] line-clamp-1 rounded-full bg-white px-2 py-1 text-sm font-semibold md:text-base">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
        <button
          className="absolute right-4 top-4 z-10 transition-all hover:scale-105"
          onClick={onClose}
        >
          <X
            size={38}
            strokeWidth={1.5}
            className="rounded-full bg-white p-2"
          />
        </button>

        {currentIndex > 0 && (
          <button
            type="button"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full transition-colors hover:bg-white md:left-6"
            onClick={onPrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft strokeWidth={1} className="h-10 w-10" />
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full transition-colors hover:bg-white md:right-6"
            onClick={onNext}
            disabled={currentIndex === images.length - 1}
          >
            <ChevronRight strokeWidth={1} className="h-10 w-10" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
