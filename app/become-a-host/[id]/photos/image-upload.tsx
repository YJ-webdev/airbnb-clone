import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import ImageModal from "./image-modal";
import { Edit, Ellipsis, ImageIcon, Plus, Scan, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FileWithPreview extends File {
  preview: string;
  width?: number;
  height?: number;
}

const ImageUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [modalFile, setModalFile] = useState<FileWithPreview | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        preview: URL.createObjectURL(file),
        ...file,
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
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
      URL.revokeObjectURL(fileToRemove.preview);
      return updatedFiles;
    });
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

  const openModal = (file: FileWithPreview) => {
    setModalFile(file);
  };

  const closeModal = () => {
    setModalFile(null);
  };

  useEffect(() => {
    // Clean up blob URLs when component unmounts
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const thumbs = files.map((file, index) => (
    <div
      key={file.preview}
      className={`relative ${index === 0 ? "col-span-2 h-[400px]" : "col-span-1 h-[200px]"}`}
      onClick={(event) => {
        event.stopPropagation();
        openModal(file);
      }}
    >
      <div className="thumb-inner overflow-hidden rounded-xl">
        <Image
          src={file.preview}
          className="h-full w-full object-cover"
          width={500}
          height={500}
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

  return (
    <section className="mx-auto max-w-2xl pl-5 pr-5 pt-5 md:pl-0 md:pr-0">
      <div
        {...getRootProps({
          className: "mx-auto max-w-2xl flex items-center justify-center",
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
        <aside className="grid h-full w-full grid-cols-2 gap-4">
          {thumbs}
          <div
            {...getRootProps({
              className: "col-span-1 h-[200px] mb-28",
            })}
          >
            <div className="thumb-inner flex h-[250px] w-full cursor-pointer flex-col items-center justify-center rounded-xl outline-dashed outline-1 outline-zinc-500 hover:outline hover:outline-2">
              <Plus size={38} strokeWidth={1} color="#5e606c" />
              <p className="text-sm font-semibold text-[#5e606c] md:text-base">
                Add more
              </p>
            </div>
          </div>
        </aside>
      )}

      {modalFile && <ImageModal file={modalFile} onClose={closeModal} />}
    </section>
  );
};

export default ImageUpload;
