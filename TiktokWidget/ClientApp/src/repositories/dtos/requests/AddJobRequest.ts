export class AddJobRequest {
  public data: string;
  public type: number;
  constructor(data: string, type: number) {
    this.data = data;
    this.type = type;
  }
}
