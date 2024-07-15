import Image from "next/image";
import { FileWithPreview } from "./image-upload"; // Assuming FileWithPreview type is exported
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageModalProps {
  file: FileWithPreview;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ file, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative max-h-full min-h-[500px] min-w-[500px] max-w-full overflow-hidden rounded-xl bg-white px-28 py-11"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={file.preview}
          width={500}
          height={500}
          alt="Full size"
          className="h-[80vh] w-auto rounded-xl"
        />
        <button className="absolute right-4 top-4" onClick={onClose}>
          <X size={40} className="rounded-full p-2 hover:bg-zinc-100" />
        </button>
        <button
          type="button"
          className="absolute left-6 top-1/2 -translate-y-1/2 transform"
          onClick={() => {}}
        >
          <ChevronLeft size={40} />
        </button>
        <button
          type="button"
          className="absolute right-6 top-1/2 -translate-y-1/2 transform"
          onClick={() => {}}
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
