export class GetVideoByJobRequest {
  public data: string;
  public type: number;
  constructor(data?: string, type?: number) {
    this.data = data ?? "";
    this.type = type ?? 0;
  }
}
