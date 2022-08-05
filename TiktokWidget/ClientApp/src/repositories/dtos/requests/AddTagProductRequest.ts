import { BaseProduct } from "../responses/BaseProduct";
export class AddTagProductRequest {
  Products: BaseProduct[];
  constructor(products?: BaseProduct[]) {
    this.Products = products ? products : [];
  }
}
