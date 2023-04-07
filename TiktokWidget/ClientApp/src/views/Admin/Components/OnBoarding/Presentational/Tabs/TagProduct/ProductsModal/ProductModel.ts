import { ProductResponse } from "repositories/dtos/responses/ProductResponse";

export interface IProductModalProps {
  productId: string;
  active: boolean;
  handleClose: () => void;
  setProduct?: (active?: boolean, product?: ProductResponse) => void;
}

export interface IProductWrapper {
  shadow?: boolean;
  bg?: string;
  active?: boolean;
}
