export enum SourceTypeEnum {
  HashTag,
  UserName,
  Product,
  InstagramHashTag,
  InstagramUserName,
}
export class GetVideoByJobRequest {
  public data: string;
  public type: number;
  constructor(data?: string, type?: number) {
    this.data = data ?? "";
    this.type = type ?? SourceTypeEnum.HashTag;
  }
}

export class GetVideoByJobInstagramRequest {
  public data: string;
  public type: number;
  constructor(data?: string, type?: number) {
    this.data = data ?? "";
    this.type = type ?? SourceTypeEnum.InstagramHashTag;
  }
}
