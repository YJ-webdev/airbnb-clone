import { Edit } from "lucide-react";
import Link from "next/link";

interface EditButtonProps {
  id: string; // Ensure you receive the `id` as a prop
}

export const EditButton = ({ id }: EditButtonProps) => {
  return (
    <Link
      href={`/become-a-host/${id}/category`}
      className="absolute right-5 top-5 flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-full border-none bg-black px-5 py-3 transition-all hover:bg-zinc-500 active:scale-90"
      aria-label="Edit listing"
    >
      <Edit size={20} className="text-white" strokeWidth={1.5} />
      <p className="group text-sm font-semibold text-white">Edit</p>
    </Link>
  );
};
