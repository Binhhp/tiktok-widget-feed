export interface IVideoWrapperStyle {
  width?: number;
  height?: number;
}

export interface IErrorPlayer {
  active?: boolean;
  message?: string;
}

export interface IVideoProps {
  playSrc: string;
  image: string;
  hidden?: boolean;
  muted?: boolean;
}

export type StatusType = "Playing" | "Paused";
