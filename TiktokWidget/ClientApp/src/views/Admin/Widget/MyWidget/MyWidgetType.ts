import { IWidgetResponse } from "repositories/dtos/responses/WidgetResponse";

export interface IProductModalProps {
  productId: string;
  active: boolean;
  widget: IWidgetResponse;
  handleClose: () => void;
  onReloadData: () => void;
}

export interface IProductWrapper {
  shadow?: boolean;
  bg?: string;
  active?: boolean;
}
