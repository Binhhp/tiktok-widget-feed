import { ISettingProviderWidget } from "stores/Admin/Widget/state";
import { ITikTokVideoDto } from "Dependencies/LayoutTemplate/LayoutTemplateModel";

export interface IVideoWrapperStyle {
  width?: number;
  height?: number;
}

export interface IErrorPlayer {
  active?: boolean;
  message?: string;
}

export interface IVideoProps {
  item: ITikTokVideoDto;
  options: ISettingProviderWidget;
  hidden: boolean;
  playing: boolean;
  loading: boolean;
  error?: IErrorPlayer;
  videoId?: string;
  onError?: (error: any) => void;
  onPlaying: (id?: string) => () => void;
  onPause: () => void;
  onSetHidden: () => void;
}
