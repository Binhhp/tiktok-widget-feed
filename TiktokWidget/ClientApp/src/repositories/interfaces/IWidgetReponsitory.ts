import { IQueryDataTable } from "Dependencies/DataTables/DataTablesType";
import { AddTagProductRequest } from "repositories/dtos/requests/AddTagProductRequest";
import { CreateWidgetRequest } from "repositories/dtos/requests/CreateWidgetRequest";
import { BaseResponse } from "repositories/dtos/responses/BaseResponse";
import { IVideoTemplateModel } from "Dependencies/LayoutTemplate/LayoutTemplateModel";

export interface IWidgetReponsitory {
  Create: (request: CreateWidgetRequest) => Promise<BaseResponse>;
  Get: (pageIndex: number) => Promise<NonNullable<IQueryDataTable<any>>>;
  GetByIds: (widgetIds: Array<string>) => Promise<BaseResponse>;
  Delete: (key: string) => Promise<BaseResponse>;
  GetById: (key: string) => Promise<BaseResponse>;
  Update: (key: string, req: CreateWidgetRequest) => Promise<BaseResponse>;
  AddTagProducts: (
    key: string,
    req: AddTagProductRequest
  ) => Promise<BaseResponse>;
  GetVideos: (key: string, pageIndex: number) => Promise<IVideoTemplateModel>;
}
