import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const FormButton = ({
  disabled,
  label,
  className,
}: {
  disabled: boolean;
  label?: string;
  className?: string;
}) => {
  return (
    <Button
      type="submit"
      className={cn(
        "h-[50px] w-fit rounded-lg bg-gradient-to-r from-rose-500 to-[#e3326d] text-base font-semibold outline-none hover:bg-rose-400",
        className,
      )}
    >
      {disabled === true ? "Updating..." : label ? label : "Update changes"}
    </Button>
  );
};
