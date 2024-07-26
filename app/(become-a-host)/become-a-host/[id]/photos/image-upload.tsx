import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import {
  Edit,
  Ellipsis,
  Image as ImageIcon,
  Plus,
  Scan,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ImageModal from "@/app/components/image-modal";

export interface FileWithPreview extends File {
  preview: string;
  width?: number;
  height?: number;
}

interface ImageUploadProps {
  setDataLogged: (data: boolean) => void;
  setImageSrc: (data: string[]) => void;
}

const ImageUpload = ({ setDataLogged, setImageSrc }: ImageUploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const maxFiles = 20;

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },

    onDrop: (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        preview: URL.createObjectURL(file),
        ...file,
      }));

      setFiles((prevFiles) => {
        const allFiles = [...prevFiles, ...newFiles];

        if (allFiles.length > maxFiles) {
          return allFiles.slice(0, maxFiles);
        }
        return allFiles;
      });
    },
  });

  const removeFile = (
    fileToRemove: FileWithPreview,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter(
        (file) => file.preview !== fileToRemove.preview,
      );
      return updatedFiles;
    });
    URL.revokeObjectURL(fileToRemove.preview);
  };

  const makeCoverPhoto = (
    fileToCover: FileWithPreview,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter(
        (file) => file.preview !== fileToCover.preview,
      );
      updatedFiles.unshift(fileToCover);
      return updatedFiles;
    });
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
    if (modalIndex !== null && modalIndex < files.length - 1) {
      setModalIndex(modalIndex + 1);
    }
  };

  const thumbs = files.map((file, index) => (
    <div
      key={file.preview}
      className={`relative ${index === 0 ? "col-span-2 h-[400px]" : "col-span-1 h-[200px]"}`}
      onClick={(event) => {
        event.stopPropagation();
        console.log(file);
        openModal(index);
      }}
    >
      <div className="thumb-inner overflow-hidden rounded-xl">
        <Image
          src={file.preview}
          className="h-full w-full object-cover"
          width={800}
          height={800}
          alt="Preview"
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="absolute right-4 top-4">
            <Ellipsis className="h-[31px] w-[31px] rounded-full bg-white/80 p-[7px] text-zinc-700/90 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)] transition-all hover:scale-105 hover:cursor-pointer hover:border-white hover:bg-white hover:text-black" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            {index !== 0 && (
              <DropdownMenuItem
                className="cursor-pointer py-3 font-semibold"
                onClick={(event) => makeCoverPhoto(file, event)}
              >
                <Scan size={13} className="mr-2" />
                Make cover photo
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="cursor-pointer py-3 font-semibold"
              onClick={(event) => event.stopPropagation()}
            >
              <Edit size={13} className="mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer py-3 font-semibold"
              onClick={(event) => removeFile(file, event)}
            >
              <Trash size={13} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ));

  const totalThumbs = thumbs.length;

  useEffect(() => {
    if (files.length > 0) {
      setImageSrc(files.map((file) => file.preview));
    } else {
      setImageSrc([]);
    }
  }, [files, setImageSrc]);

  useEffect(() => {
    if (totalThumbs >= 5) {
      setDataLogged(true);
    } else {
      setDataLogged(false);
    }
  }, [totalThumbs, setDataLogged]);

  useEffect(() => {
    // Clean up blob URLs when component unmounts
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container max-w-3xl">
      <div
        {...getRootProps({
          className: "container max-w-3xl flex items-center justify-center",
        })}
      >
        <input {...getInputProps()} />

        {files.length === 0 && (
          <div className="mb-28 flex h-[400px] w-full cursor-pointer flex-col items-center justify-center space-y-2 rounded-xl bg-zinc-50 outline-dashed outline-1 outline-zinc-500">
            <ImageIcon size={30} strokeWidth={1.5} color="#5e606c" />
            <p className="font-semibold text-[#5e606c]">
              Upload max. 20 photos!
            </p>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <aside className="mb-28 grid h-full w-full grid-cols-2 gap-4">
          {thumbs}

          {totalThumbs !== maxFiles ? (
            <div
              {...getRootProps({
                className: "col-span-1 h-[200px]",
              })}
            >
              <div className="thumb-inner flex h-[250px] w-full cursor-pointer flex-col items-center justify-center space-y-2 rounded-xl outline-dashed outline-1 outline-zinc-500 hover:outline hover:outline-2">
                <div className="flex flex-col items-center justify-center">
                  <Plus size={38} strokeWidth={1} color="#5e606c" />
                  <p className="text-sm font-semibold text-[#5e606c] md:text-base">
                    Add more
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="thumb-inner flex h-[250px] w-full flex-col items-center justify-center rounded-xl bg-zinc-100">
              <p className="text-sm font-semibold text-[#5e606c] md:text-base">
                You reached Max.
              </p>
            </div>
          )}
        </aside>
      )}

      {modalIndex !== null && (
        <ImageModal
          files={files}
          currentIndex={modalIndex}
          onClose={closeModal}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </section>
  );
};

export default ImageUpload;
