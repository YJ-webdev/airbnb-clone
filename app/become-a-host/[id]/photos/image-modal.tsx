import React from "react";
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative max-h-full min-h-[500px] min-w-[500px] max-w-full overflow-hidden rounded-xl bg-white px-28 py-11"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="image-container">
          <div className="image-overlay"></div>
          <Image
            src={file.preview}
            width={500}
            height={500}
            alt="Full size"
            className="h-[80vh] w-auto rounded-xl"
          />{" "}
        </div>
        <button
          className="absolute right-4 top-4 hover:scale-105"
          onClick={onClose}
        >
          <X size={38} className="rounded-full p-2 hover:bg-zinc-100" />
        </button>
        {currentIndex > 0 && (
          <button
            type="button"
            className="absolute left-6 top-1/2 -translate-y-1/2 transform"
            onClick={onPrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft strokeWidth={1.5} size={40} />
          </button>
        )}
        {currentIndex < files.length - 1 && (
          <button
            type="button"
            className="absolute right-6 top-1/2 -translate-y-1/2 transform"
            onClick={onNext}
            disabled={currentIndex === files.length - 1}
          >
            <ChevronRight strokeWidth={1.5} size={40} />
          </button>
        )}
        <p className="absolute bottom-14 left-1/2 -translate-x-1/2 transform rounded-xl px-3 py-2 font-semibold backdrop-blur-md">
          {currentIndex + 1} / {files.length}
        </p>
      </div>
    </div>
  );
};

export default ImageModal;
