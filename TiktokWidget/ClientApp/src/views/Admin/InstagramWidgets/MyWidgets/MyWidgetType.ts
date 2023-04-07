import { InstagramWidgetResponse } from "repositories/dtos/responses/InstagramWidgetResponse";

export interface IProductModalProps {
  productId: string;
  active: boolean;
  widget?: InstagramWidgetResponse;
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
  widget?: InstagramWidgetResponse;
  productId: string;
  activeVideos: boolean;
}
