import { ICloneStore } from "common/interfaces/ICloneStore";
import { ProductResponse } from "repositories/dtos/responses/ProductResponse";
import { TiktokWidgetResponse } from "repositories/dtos/responses/TiktokWidgetResponse";
import { TemplateType } from "Dependencies/TikTokLayout/LayoutTemplateType";

export interface ISettingProviderWidget {
  id?: string;
  title?: string;
  source?: number;
  valueSource?: string;
  layout?: TemplateType;
  header?: "enable" | "disable";
  titleHeader?: string;
  caption?: string;
  labelReadMore?: string;
  labelView?: string;
  showProfile?: "enable" | "disable";
  showNetworkIcon?: "enable" | "disable";
  accentColor?: string;
  itemBackground?: string;
  itemColor?: string;
  numberItemPerRow?: number;
  customCss?: string;
  products?: ProductResponse[];
  disableShowItems?: string[];
  itemSorts?: string[];
  numberItems?: number;
}

export class SettingProviderWidget implements ISettingProviderWidget {
  id?: string;
  title?: string;
  source?: number;
  valueSource?: string;
  layout?: TemplateType;
  header?: "enable" | "disable";
  titleHeader?: string;
  caption?: string;
  labelReadMore?: string;
  labelView?: string;
  showProfile?: "enable" | "disable";
  showNetworkIcon?: "enable" | "disable";
  accentColor?: string;
  itemBackground?: string;
  itemColor?: string;
  numberItemPerRow?: number;
  customCss?: string;
  numberItems?: number;
  products?: ProductResponse[];
  disableShowItems?: string[];
  itemSorts?: string[];
  constructor(dto?: TiktokWidgetResponse) {
    this.id = dto?.id;
    this.title = dto?.widgetTitle || "";
    this.source = dto?.sourceType.toLowerCase() === "hashtag" ? 0 : 1;
    this.valueSource = dto?.valueSource || "";
    this.layout = dto?.setting.layoutType || 0;
    this.header = dto?.header.enable ? "enable" : "disable";
    this.titleHeader = dto?.header.title || "";
    this.caption = dto?.header.caption || "";
    this.labelReadMore = dto?.setting.labelReadMore || "";
    this.labelView = dto?.setting.labelViewMore || "";
    this.showProfile = dto?.setting.showProfile ? "enable" : "disable";
    this.showNetworkIcon = dto?.setting.showNetworkIcon ? "enable" : "disable";
    this.accentColor = dto?.setting.accentColor || "";
    this.itemBackground = dto?.setting.backGround || "";
    this.itemColor = dto?.setting.color || "";
    this.numberItemPerRow = dto?.setting.numberPerRow || 3;
    this.customCss = dto?.setting.customCss || "";
    this.numberItems = dto?.setting.numberItems || 8;
    this.products = dto?.products || [];
    this.disableShowItems = dto?.disableShowItems || [];
    this.itemSorts = dto?.itemSorts || [];
  }
  ToDto = (): ISettingProviderWidget => {
    return this as ISettingProviderWidget;
  };
}

export type WidgetStatus = "FirstCreated" | "Undefined";
export class WidgetStoreModelDto {
  step: number;
  mobile: boolean;
  settings: ISettingProviderWidget;
  products: ProductResponse[] | undefined;
  count: number | undefined;
  status: WidgetStatus;
  sequenceNumber: number;
  workingSearch: boolean;
  constructor() {
    this.step = 0;
    this.mobile = false;
    this.products = [];
    this.count = undefined;
    this.status = "Undefined";
    this.sequenceNumber = 0;
    this.workingSearch = false;
    this.settings = {
      id: "",
      title: "",
      source: 0,
      valueSource: "",
      layout: TemplateType.Slider,
      header: "enable",
      titleHeader: "My TikTok Feed",
      caption: "caption",
      labelReadMore: "Read more",
      labelView: "View more",
      showProfile: "enable",
      showNetworkIcon: "enable",
      accentColor: "#000000",
      itemBackground: "#fafafa",
      itemColor: "#000000",
      numberItemPerRow: 3,
      numberItems: 8,
      customCss: "",
      products: [],
      itemSorts: [],
      disableShowItems: [],
    };
  }
}

export class WidgetStoreModel implements ICloneStore<WidgetStoreModel> {
  protected _step: number;
  protected _mobile: boolean;
  protected _products: ProductResponse[];
  protected _settings: ISettingProviderWidget;
  protected _count: number | undefined;
  protected _status: WidgetStatus;
  protected _sequenceNumber: number;
  protected _workingSearch: boolean;
  constructor(_dto?: WidgetStoreModelDto) {
    this._step = _dto?.step || -1;
    this._mobile = _dto?.mobile || false;
    this._products = _dto?.products || [];
    this._count = _dto?.count ?? -1;
    this._status = _dto?.status ?? "Undefined";
    this._sequenceNumber = _dto?.sequenceNumber ?? 0;
    this._workingSearch = _dto?.workingSearch ?? false;
    this._settings = _dto?.settings || {
      id: "",
      title: "",
      source: 0,
      valueSource: "",
      layout: TemplateType.Slider,
      header: "enable",
      titleHeader: "My TikTok Feed",
      caption: "caption",
      labelReadMore: "Read more",
      labelView: "View more",
      showProfile: "enable",
      showNetworkIcon: "enable",
      accentColor: "#000000",
      itemColor: "#000000",
      itemBackground: "#fafafa",
      numberItemPerRow: 3,
      customCss: "",
      numberItems: 8,
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

  public get status(): WidgetStatus {
    return this._status;
  }

  public set status(v: WidgetStatus) {
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

  public get settings(): ISettingProviderWidget {
    return this._settings;
  }

  public set settings(v: ISettingProviderWidget) {
    this._settings = v;
  }

  public get step(): number {
    return this._step;
  }

  public set step(v: number) {
    this._step = v;
  }
  Clone(): WidgetStoreModel {
    let dto = this.ToDto();
    return new WidgetStoreModel(dto);
  }

  ToDto(): WidgetStoreModelDto {
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
