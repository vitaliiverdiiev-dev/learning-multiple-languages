import { AvatarWithSignOut } from "./components/avatar-wth-sign-out";
import { useSession } from "@/shared/hooks/use-session";

export const UserSection = () => {
  const { session, loading } = useSession();

  if (loading || !session) return null;

  const { full_name, email, picture } = session.user.user_metadata as {
    full_name: string;
    email: string;
    picture: string;
  };
  console.log({ session });

  return (
    <div className="flex items-center gap-2 mr-4">
      <div className="flex flex-col items-end">
        <span>{full_name}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {email}
        </span>
      </div>
      <AvatarWithSignOut fullName={full_name} imageUrl={picture} />
    </div>
  );
};
