import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface UserAvatarProps {
  user?: User;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Avatar className="w-8 h-8 m-1 flex items-center justify-center bg-gray-200">
      {user ? (
        user.image ? (
          <AvatarImage src={user.image} className="w-auto h-auto" />
        ) : (
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-cyan-500 to-teal-400">
            <span className="text-lg text-center font-medium text-white">
              {user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        )
      ) : (
        <>
          <AvatarImage src="images/user.png" className="w-auto h-auto" />
          <AvatarFallback>
            <Skeleton />
          </AvatarFallback>
        </>
      )}
    </Avatar>
  );
};
