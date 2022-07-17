export class AddTagProductRequest {
  ProductIds: string[];
  constructor(productIds?: string[]) {
    this.ProductIds = productIds ? productIds : [];
  }
}
