import { TiktokWidgetResponse } from "repositories/dtos/responses/TiktokWidgetResponse";

export interface IProductModalProps {
  productId: string;
  active: boolean;
  widget?: TiktokWidgetResponse;
  handleClose: () => void;
  onReloadData: () => void;
}

export interface IProductWrapper {
  shadow?: boolean;
  bg?: string;
  active?: boolean;
}

export interface MyWidgetState {
  active: boolean;
  widget?: TiktokWidgetResponse;
  productId: string;
  activeVideos: boolean;
}
