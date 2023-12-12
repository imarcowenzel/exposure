import { cn } from "@/lib/utils";
import Image from "next/image";

type UserProps = {
  src?: string;
  username?: string;
  className?: string;
};

const User: React.FC<UserProps> = ({
  src = "/assets/profile-picture.svg",
  username = "username",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex h-2/4 w-full flex-col items-center justify-center gap-y-5",
        className,
      )}
    >
      <div className="relative h-32 w-32 rounded-full">
        <Image
          src={src}
          alt="Avatar"
          fill
          priority
          sizes="100svh"
          className="rounded-full object-cover"
        />
      </div>
      <h2 className="text-lg font-bold">{username}</h2>
    </div>
  );
};

export default User;
