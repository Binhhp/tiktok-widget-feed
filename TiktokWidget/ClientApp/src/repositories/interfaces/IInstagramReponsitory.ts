import { IQueryDataTable } from "Dependencies/DataTables/DataTablesType";
import { IInstagramTemplateModel } from "Dependencies/InstagramLayout/InstagramLayoutModel";
import { IVideoTemplateModel } from "Dependencies/TikTokLayout/LayoutTemplateModel";
import { AddTagProductRequest } from "repositories/dtos/requests/AddTagProductRequest";
import { GetVideoByJobRequest } from "repositories/dtos/requests/GetVideoByJobRequest";
import { SetInstagramWidgetRequest } from "repositories/dtos/requests/SetInstagramWidgetRequest";
import { BaseResponse } from "repositories/dtos/responses/BaseResponse";

export interface IInstagramReponsitory {
  GetByIds: (widgetIds: Array<string>) => Promise<BaseResponse>;
  Delete: (key: string) => Promise<BaseResponse>;
  GetById: (key: string) => Promise<BaseResponse>;
  Create: (request: SetInstagramWidgetRequest) => Promise<BaseResponse>;
  Get: (
    pageIndex?: number,
    domain?: string
  ) => Promise<NonNullable<IQueryDataTable<any>>>;
  Update: (
    key: string,
    req: SetInstagramWidgetRequest
  ) => Promise<BaseResponse>;
  AddTagProducts: (
    key: string,
    req: AddTagProductRequest
  ) => Promise<BaseResponse>;
  GetVideosByJob: (
    req: GetVideoByJobRequest,
    showItems?: number
  ) => Promise<IInstagramTemplateModel>;
  GetVideos: (
    key: string,
    pageIndex: number,
    showItems?: number
  ) => Promise<IInstagramTemplateModel>;
}
