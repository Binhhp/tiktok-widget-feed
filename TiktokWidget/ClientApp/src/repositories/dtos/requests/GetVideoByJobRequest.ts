export enum SourceTypeEnum {
  HashTag,
  UserName,
  Product,
  InstagramHashTag,
  InstagramUserName,
}
export class GetVideoByJobRequest {
  public data: string;
  public type: string;
  constructor(data?: string, type?: number) {
    this.data = data ?? "";
    this.type =
      type === 0
        ? String(SourceTypeEnum.InstagramHashTag)
        : String(SourceTypeEnum.InstagramUserName);
  }
}
