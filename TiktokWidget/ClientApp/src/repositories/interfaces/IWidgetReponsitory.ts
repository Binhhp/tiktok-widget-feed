import { GetVideoByJobRequest } from "./../dtos/requests/GetVideoByJobRequest";
import { UpdateWidgetRequest } from "./../dtos/requests/UpdateWidgetRequest";
import { IQueryDataTable } from "Dependencies/DataTables/DataTablesType";
import { AddTagProductRequest } from "repositories/dtos/requests/AddTagProductRequest";
import { CreateWidgetRequest } from "repositories/dtos/requests/CreateWidgetRequest";
import { BaseResponse } from "repositories/dtos/responses/BaseResponse";
import { IVideoTemplateModel } from "Dependencies/TikTokLayout/LayoutTemplateModel";
import { AddJobRequest } from "repositories/dtos/requests/AddJobRequest";

export interface IWidgetReponsitory {
  AddJob: (domain?: string, req?: AddJobRequest) => Promise<BaseResponse>;
  Create: (request: CreateWidgetRequest) => Promise<BaseResponse>;
  Get: (
    pageIndex?: number,
    domain?: string
  ) => Promise<NonNullable<IQueryDataTable<any>>>;
  GetByIds: (widgetIds: Array<string>) => Promise<BaseResponse>;
  Delete: (key: string) => Promise<BaseResponse>;
  GetById: (key: string) => Promise<BaseResponse>;
  Update: (key: string, req: UpdateWidgetRequest) => Promise<BaseResponse>;
  AddTagProducts: (
    key: string,
    req: AddTagProductRequest
  ) => Promise<BaseResponse>;
  GetVideos: (
    key: string,
    pageIndex: number,
    showItems?: number
  ) => Promise<IVideoTemplateModel>;
  GetVideosByJob: (
    req: GetVideoByJobRequest,
    showItems?: number
  ) => Promise<IVideoTemplateModel>;
}
