export class GetVideoByJobRequest {
  public data: string;
  public type: SourceTypeEnum;
  constructor(data?: string, type?: number) {
    this.data = data ?? "";
    this.type = type ?? 0;
  }
}

export enum SourceTypeEnum {
  HashTag,
  UserName,
  Product,
}
