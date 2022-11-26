export interface IQueryModel {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  nonTimezone?: boolean;
}
