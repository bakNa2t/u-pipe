import { UserSection } from "../sections/UserSection";
import { VideosSection } from "../sections/VideosSection";

interface UserViewProps {
  userId: string;
}

export const UserView = ({ userId }: UserViewProps) => {
  return (
    <div className="flex flex-col max-w-[1300px] px-4 pt-2.5 mx-auto mb-10 gap-y-6">
      <UserSection userId={userId} />
      <VideosSection userId={userId} />
    </div>
  );
};
