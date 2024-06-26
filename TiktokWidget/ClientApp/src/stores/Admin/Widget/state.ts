import { ICloneStore } from "common/interfaces/ICloneStore";
import { BaseProduct } from "repositories/dtos/responses/BaseProduct";
import { BaseTikTokWidget } from "repositories/dtos/responses/BaseTikTokWidget";
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
  limitItem?: number;
  products?: BaseProduct[];
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
  limitItem?: number;
  products?: BaseProduct[];
  constructor(dto?: BaseTikTokWidget) {
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
    this.products = dto?.products || [];
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
  products: BaseProduct[] | undefined;
  count: number | undefined;
  status: WidgetStatus;
  constructor() {
    this.step = 0;
    this.mobile = false;
    this.products = [];
    this.count = undefined;
    this.status = "FirstCreated";
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
      limitItem: 10,
      products: [],
    };
  }
}

export class WidgetStoreModel implements ICloneStore<WidgetStoreModel> {
  protected _step: number;
  protected _mobile: boolean;
  protected _products: BaseProduct[];
  protected _settings: ISettingProviderWidget;
  protected _count: number | undefined;
  protected _status: WidgetStatus;
  constructor(_dto?: WidgetStoreModelDto) {
    this._step = _dto?.step || -1;
    this._mobile = _dto?.mobile || false;
    this._products = _dto?.products || [];
    this._count = _dto?.count ?? -1;
    this._status = _dto?.status ?? "FirstCreated";
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
      limitItem: 10,
      products: [],
    };
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
    };
  }
}
