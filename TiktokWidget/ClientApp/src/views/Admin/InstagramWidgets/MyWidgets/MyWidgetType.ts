import { BaseTikTokWidget } from "repositories/dtos/responses/BaseTikTokWidget";

export interface IProductModalProps {
  productId: string;
  active: boolean;
  widget: BaseTikTokWidget;
  handleClose: () => void;
  onReloadData: () => void;
}

export interface IProductWrapper {
  shadow?: boolean;
  bg?: string;
  active?: boolean;
}
