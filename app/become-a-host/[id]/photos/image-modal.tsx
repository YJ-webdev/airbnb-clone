import React, { useEffect } from "react";
import Image from "next/image";
import { FileWithPreview } from "./image-upload"; // Assuming FileWithPreview type is exported
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageModalProps {
  files: FileWithPreview[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  files,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const file = files[currentIndex];

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative max-h-[680px] w-[90vw] rounded-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-baseline justify-center">
          <button
            className="absolute right-4 top-4 hover:scale-105"
            onClick={onClose}
          >
            <X
              size={38}
              strokeWidth={1.5}
              className="rounded-full bg-white p-2"
            />
          </button>
          <Image
            src={file.preview}
            width={500}
            height={500}
            alt="Full size"
            className="mx-auto max-h-[90vh] w-auto px-0 py-7"
          />{" "}
          <p className="absolute bottom-7 right-[5%] line-clamp-1 rounded-full bg-white px-2 py-1 text-sm font-semibold md:text-base">
            {currentIndex + 1} / {files.length}
          </p>
        </div>

        {currentIndex > 0 && (
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 transform md:left-6"
            onClick={onPrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft strokeWidth={1} className="h-10 w-10" />
          </button>
        )}
        {currentIndex < files.length - 1 && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 transform md:right-6"
            onClick={onNext}
            disabled={currentIndex === files.length - 1}
          >
            <ChevronRight strokeWidth={1} className="h-10 w-10" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
