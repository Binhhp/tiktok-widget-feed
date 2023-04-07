import { ProductResponse } from "../responses/ProductResponse";
export class AddTagProductRequest {
  Products: ProductResponse[];
  constructor(products?: ProductResponse[]) {
    this.Products = products ? products : [];
  }
}
