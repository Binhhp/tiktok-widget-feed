export class BaseResponse {
  Status: boolean;
  Data: any;
  Error: string;
  constructor(status: boolean = false, data: any = null, error: string = "") {
    this.Status = status;
    this.Data = data;
    this.Error = error;
  }
}
