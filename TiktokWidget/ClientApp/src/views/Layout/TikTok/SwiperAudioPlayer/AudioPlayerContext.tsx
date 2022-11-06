import React, { useEffect } from "react";
import { IAudioPlayerContext, StatusType } from "./AudioPlayerType";

export const AudioPlayerContext = React.createContext<IAudioPlayerContext>({
  videoId: undefined,
  status: "Playing",
  handleVideoClick: () => {},
  handleSetStatus: () => {},
});

export const AudioPlayerProvider = ({ customCss, children }: any) => {
  //open detail video by id
  const [videoId, setVideoId] = React.useState<string | undefined>(undefined);
  //set status video
  const [status, setStatus] = React.useState<StatusType>("Playing");
  const handleVideoClick = (videoId?: string) => setVideoId(videoId);
  const handleSetStatus = (sts: StatusType) => setStatus(sts);

  //Add custom css style from config widget
  useEffect(() => {
    if (customCss) {
      var styleTag = document.createElement("style");
      styleTag.textContent = customCss;
      styleTag.setAttribute("type", "text/css");
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{ videoId, status, handleVideoClick, handleSetStatus }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
