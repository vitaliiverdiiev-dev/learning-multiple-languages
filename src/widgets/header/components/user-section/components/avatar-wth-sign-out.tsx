import supabase from "@/shared/config/supabase-client.config";
import { getInitials } from "@/shared/utils/get-initials";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { LogOut } from "lucide-react";

type Props = {
  imageUrl?: string;
  fullName?: string;
};

export const AvatarWithSignOut: React.FC<Props> = ({
  fullName = "",
  imageUrl = "",
}) => {
  return (
    <div className="relative group w-10 h-10">
      <Avatar className="w-10 h-10">
        <AvatarImage src={imageUrl} alt={`${fullName} avatar`} />
        <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
      </Avatar>

      <div
        className="absolute cursor-pointer inset-0 z-10 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
        onClick={() => supabase.auth.signOut()}
      >
        <LogOut className="text-white w-5 h-5" />
      </div>
    </div>
  );
};
