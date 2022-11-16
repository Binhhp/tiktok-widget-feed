import { SourceTypeEnum } from "./GetVideoByJobRequest";

export class AddJobRequest {
  public data: string;
  public type: SourceTypeEnum;
  constructor(data: string, type: SourceTypeEnum) {
    this.data = data;
    this.type = type;
  }
}
