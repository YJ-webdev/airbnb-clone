import { Edit } from "lucide-react";
import Link from "next/link";

interface EditButtonProps {
  id: string; // Ensure you receive the `id` as a prop
}

export const EditButton = ({ id }: EditButtonProps) => {
  return (
    <Link
      href={`/edit/${id}`}
      className="my-1 flex h-14 w-full items-center justify-center rounded-full bg-black px-5 py-3 text-center font-semibold text-white hover:bg-zinc-500"
    >
      Edit listing
    </Link>
  );
};

export const EditButton2 = ({ id }: EditButtonProps) => {
  return (
    <Link
      href={`/edit/${id}`}
      className="absolute right-5 top-5 flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-full border-none bg-black px-5 py-3 transition-all hover:bg-zinc-500 active:scale-90"
      aria-label="Edit listing"
    >
      <Edit size={20} className="text-white" strokeWidth={1.5} />
      <p className="group text-sm font-semibold text-white">Edit</p>
    </Link>
  );
};

export const EditButton3 = ({ id }: EditButtonProps) => {
  return (
    <Link
      href={`/edit/${id}`}
      className="rounded-full bg-black px-8 py-3 font-semibold text-white"
    >
      Edit
    </Link>
  );
};
