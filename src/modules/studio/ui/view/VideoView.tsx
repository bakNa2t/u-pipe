import { FormSection } from "../sections/FormSection";

interface VideoViewProps {
  videoId: string;
}

export const VideoView = ({ videoId }: VideoViewProps) => {
  return (
    <div className="max-w-screen-lg px-4 pt-2.5">
      <FormSection videoId={videoId} />
    </div>
  );
};
