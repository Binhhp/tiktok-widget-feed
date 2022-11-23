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
  constructor(data?: string, type?: number, isTikTok?: boolean) {
    this.data = data ?? "";
    this.type =
      type === 0
        ? isTikTok
          ? String(SourceTypeEnum.HashTag)
          : String(SourceTypeEnum.InstagramHashTag)
        : isTikTok
        ? String(SourceTypeEnum.UserName)
        : String(SourceTypeEnum.InstagramUserName);
  }
}
