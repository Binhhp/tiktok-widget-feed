export enum HttpCodes {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHENTICATED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  SERVER_ERROR = 500,
}
export type Meta = {
  code?: string;
  message?: string;
  page?: number;
  total?: number;
  size?: number;
};

export type DataResponseType<T> = {
  code: HttpCodes;
  data?: T;
  meta?: Meta;
};

export type Response<T> = Promise<T>;
