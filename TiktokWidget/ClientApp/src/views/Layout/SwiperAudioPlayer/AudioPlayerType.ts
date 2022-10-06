import { ISettingProviderWidget } from "stores/Widget/state";

export interface IAudioPlayerWrapper {
  active: boolean;
}

export interface IImageCoverStyle {
  url?: string;
}

export type StatusType = "Playing" | "Paused";

export interface IAudioPlayerContext {
  videoId?: string;
  status?: StatusType;
  handleVideoClick: (videoId?: string) => void;
  handleSetStatus: (sts: StatusType) => void;
}

export interface IAudioPlayerSliderProps {
  widget: ISettingProviderWidget;
}
