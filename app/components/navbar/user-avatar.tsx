import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface UserAvatarProps {
  user?: User;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Avatar className="m-1 flex h-8 w-8 items-center justify-center bg-gray-200">
      {user ? (
        user.image ? (
          <AvatarImage src={user.image} className="h-auto w-auto" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center bg-black">
            <span className="text-center text-lg font-medium text-white">
              {user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        )
      ) : (
        <>
          <AvatarImage src="images/user.png" className="h-auto w-auto" />
          <AvatarFallback>
            <Skeleton />
          </AvatarFallback>
        </>
      )}
    </Avatar>
  );
};
