import { ICloneStore } from "common/interfaces/ICloneStore";
import { ProductResponse } from "repositories/dtos/responses/ProductResponse";
import { InstagramWidgetResponse } from "repositories/dtos/responses/InstagramWidgetResponse";
import { SourceTypeEnum } from "repositories/dtos/requests/GetVideoByJobRequest";

export enum TemplateInstagramType {
  Slider = 1,
  List = 2,
}

export interface IInstagramWidget {
  id?: string;
  title?: string;
  source?: SourceTypeEnum.InstagramHashTag | SourceTypeEnum.InstagramUserName;
  valueSource?: string;
  layout?: TemplateInstagramType.Slider | TemplateInstagramType.List;
  header?: "enable" | "disable";
  titleHeader?: string;
  labelReadMore?: string;
  labelLoadMore?: string;
  showNetworkIcon?: "enable" | "disable";
  loadMoreBackground?: string;
  itemBackground?: string;
  itemColor?: string;
  numberItemPerRow?: number;
  limitItems?: number;
  products?: ProductResponse[];
  disableShowItems?: string[];
  itemSorts?: string[];
}

export class InstagramWidget implements IInstagramWidget {
  id?: string;
  title?: string;
  source?: number;
  valueSource?: string;
  layout?: TemplateInstagramType.Slider | TemplateInstagramType.List;
  header?: "enable" | "disable";
  titleHeader?: string;
  labelReadMore?: string;
  labelLoadMore?: string;
  showNetworkIcon?: "enable" | "disable";
  loadMoreBackground?: string;
  itemBackground?: string;
  itemColor?: string;
  numberItemPerRow?: number;
  limitItems?: number;
  products?: ProductResponse[];
  disableShowItems?: string[];
  itemSorts?: string[];
  constructor(dto?: InstagramWidgetResponse) {
    this.id = dto?.id;
    this.title = dto?.widgetTitle || "";
    this.source =
      dto?.sourceType === "InstagramHashTag"
        ? SourceTypeEnum.InstagramHashTag
        : SourceTypeEnum.InstagramUserName;
    this.valueSource = dto?.valueSource || "";
    this.layout = dto?.setting.layoutType || 0;
    this.header = dto?.header.enable ? "enable" : "disable";
    this.titleHeader = dto?.header.title || "";
    this.labelReadMore = dto?.setting.labelReadMore || "";
    this.labelLoadMore = dto?.setting.labelLoadMore || "";
    this.showNetworkIcon = dto?.setting.showNetworkIcon ? "enable" : "disable";
    this.itemBackground = dto?.setting.itemBackGround || "";
    this.itemColor = dto?.setting.itemColor || "";
    this.numberItemPerRow = dto?.setting.numberPerRow || 4;
    this.limitItems = dto?.setting.limitItems || 16;
    this.products = dto?.products || [];
    this.disableShowItems = dto?.disableShowItems || [];
    this.itemSorts = dto?.itemSorts || [];
  }
  ToDto = (): IInstagramWidget => {
    return this as IInstagramWidget;
  };
}

export type InstagramWidgetStatus = "FirstCreated" | "Undefined";
export class InstagramWidgetStoreModelDto {
  step: number;
  mobile: boolean;
  settings: IInstagramWidget;
  products: ProductResponse[] | undefined;
  count: number | undefined;
  status: InstagramWidgetStatus;
  sequenceNumber: number;
  workingSearch: boolean;
  constructor() {
    this.step = 1;
    this.mobile = false;
    this.products = [];
    this.count = undefined;
    this.status = "Undefined";
    this.sequenceNumber = 0;
    this.workingSearch = false;
    this.settings = {
      id: "",
      title: "",
      source: SourceTypeEnum.InstagramHashTag,
      valueSource: "",
      layout: TemplateInstagramType.Slider,
      header: "enable",
      titleHeader: "Follow us on Instagram",
      labelReadMore: "readmore",
      labelLoadMore: "Load more",
      showNetworkIcon: "enable",
      loadMoreBackground:
        "linear-gradient(90.43deg, #1877F2 -127.39%, #CE00F2 -41.29%, #FF5656 86.62%, #FF6C00 210.4%)",
      itemBackground: "#000000",
      itemColor: "#fafafa",
      numberItemPerRow: 4,
      limitItems: 16,
      products: [],
      itemSorts: [],
      disableShowItems: [],
    };
  }
}

export class InstagramWidgetStoreModel
  implements ICloneStore<InstagramWidgetStoreModel>
{
  protected _step: number;
  protected _mobile: boolean;
  protected _products: ProductResponse[];
  protected _settings: IInstagramWidget;
  protected _count: number | undefined;
  protected _status: InstagramWidgetStatus;
  protected _sequenceNumber: number;
  protected _workingSearch: boolean;
  constructor(_dto?: InstagramWidgetStoreModelDto) {
    this._step = _dto?.step || 1;
    this._mobile = _dto?.mobile || false;
    this._products = _dto?.products || [];
    this._count = _dto?.count ?? 0;
    this._status = _dto?.status ?? "Undefined";
    this._workingSearch = _dto?.workingSearch ?? false;
    this._sequenceNumber = _dto?.sequenceNumber ?? 0;
    this._settings = _dto?.settings || {
      id: "",
      title: "",
      source: SourceTypeEnum.InstagramHashTag,
      valueSource: "",
      layout: TemplateInstagramType.Slider,
      header: "enable",
      titleHeader: "Follow us on Instagram",
      labelReadMore: "readmore",
      labelLoadMore: "Load more",
      showNetworkIcon: "enable",
      loadMoreBackground:
        "linear-gradient(90.43deg, #1877F2 -127.39%, #CE00F2 -41.29%, #FF5656 86.62%, #FF6C00 210.4%)",
      itemBackground: "#000000",
      itemColor: "#fafafa",
      numberItemPerRow: 4,
      limitItems: 16,
      products: [],
      itemSorts: [],
      disableShowItems: [],
    };
  }
  public get workingSearch(): boolean {
    return this._workingSearch;
  }

  public set workingSearch(v: boolean) {
    this._workingSearch = v;
  }

  public get sequenceNumber(): number {
    return this._sequenceNumber;
  }

  public set sequenceNumber(v: number) {
    this._sequenceNumber = v;
  }

  public get status(): InstagramWidgetStatus {
    return this._status;
  }

  public set status(v: InstagramWidgetStatus) {
    this._status = v;
  }

  public get count(): number | undefined {
    return this._count;
  }

  public set count(v: number | undefined) {
    this._count = v;
  }

  public get products(): ProductResponse[] {
    return this._products;
  }

  public set products(v: ProductResponse[]) {
    this._products = v;
  }

  public get mobile(): boolean {
    return this._mobile;
  }

  public set mobile(v: boolean) {
    this._mobile = v;
  }

  public get settings(): IInstagramWidget {
    return this._settings;
  }

  public set settings(v: IInstagramWidget) {
    this._settings = v;
  }

  public get step(): number {
    return this._step;
  }

  public set step(v: number) {
    this._step = v;
  }
  Clone(): InstagramWidgetStoreModel {
    let dto = this.ToDto();
    return new InstagramWidgetStoreModel(dto);
  }

  ToDto(): InstagramWidgetStoreModelDto {
    return {
      step: this._step,
      settings: this._settings,
      mobile: this._mobile,
      products: this._products,
      count: this._count,
      status: this._status,
      sequenceNumber: this._sequenceNumber,
      workingSearch: this._workingSearch,
    };
  }
}
