import { ICloneStore } from "common/interfaces/ICloneStore";
import { BaseProduct } from "repositories/dtos/responses/BaseProduct";
import { BaseInstagramWidget } from "repositories/dtos/responses/BaseInstagramWidget";

export enum TemplateInstagramType {
  Slider = 1,
  List = 2,
}
export interface IInstagramWidget {
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
  products?: BaseProduct[];
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
  limitItem?: number;
  products?: BaseProduct[];
  constructor(dto?: BaseInstagramWidget) {
    this.id = dto?.id;
    this.title = dto?.widgetTitle || "";
    this.source = dto?.sourceType.toLowerCase() === "hashtag" ? 0 : 1;
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
    this.limitItem = dto?.setting.limitItems || 16;
    this.products = dto?.products || [];
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
  products: BaseProduct[] | undefined;
  count: number | undefined;
  status: InstagramWidgetStatus;
  constructor() {
    this.step = 1;
    this.mobile = false;
    this.products = [];
    this.count = undefined;
    this.status = "Undefined";
    this.settings = {
      id: "",
      title: "",
      source: 0,
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
    };
  }
}

export class InstagramWidgetStoreModel
  implements ICloneStore<InstagramWidgetStoreModel>
{
  protected _step: number;
  protected _mobile: boolean;
  protected _products: BaseProduct[];
  protected _settings: IInstagramWidget;
  protected _count: number | undefined;
  protected _status: InstagramWidgetStatus;
  constructor(_dto?: InstagramWidgetStoreModelDto) {
    this._step = _dto?.step || 1;
    this._mobile = _dto?.mobile || false;
    this._products = _dto?.products || [];
    this._count = _dto?.count ?? 0;
    this._status = _dto?.status ?? "Undefined";
    this._settings = _dto?.settings || {
      id: "",
      title: "",
      source: 0,
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
    };
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

  public get products(): BaseProduct[] {
    return this._products;
  }

  public set products(v: BaseProduct[]) {
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
    };
  }
}
