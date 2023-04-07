import { ITikTokVideoDto } from "Dependencies/TikTokLayout/LayoutTemplateModel";
import { ISettingProviderWidget } from "stores/Admin/TiktokWidget/state";

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
