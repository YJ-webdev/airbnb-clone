import { Button } from "@/components/ui/button";

export const FormButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <Button
      type="submit"
      className="h-[50px] w-fit rounded-lg bg-rose-500 text-base font-semibold hover:bg-rose-400"
    >
      {disabled ? "Updating..." : "Confirm"}
    </Button>
  );
};
