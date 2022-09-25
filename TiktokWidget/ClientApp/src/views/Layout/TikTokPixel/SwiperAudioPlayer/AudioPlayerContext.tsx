import React from "react";
import { IAudioPlayerContext, StatusType } from "./AudioPlayerType";

export const AudioPlayerContext = React.createContext<IAudioPlayerContext>({
  videoId: undefined,
  status: "Playing",
  handleVideoClick: () => {},
  handleSetStatus: () => {},
});

export const AudioPlayerProvider = ({ children }: any) => {
  const [videoId, setVideoId] = React.useState<string | undefined>(undefined);
  const [status, setStatus] = React.useState<StatusType>("Playing");
  const handleVideoClick = (videoId?: string) => setVideoId(videoId);
  const handleSetStatus = (sts: StatusType) => setStatus(sts);
  return (
    <AudioPlayerContext.Provider
      value={{ videoId, status, handleVideoClick, handleSetStatus }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
