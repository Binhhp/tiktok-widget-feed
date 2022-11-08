import { ISettingProviderWidget } from "stores/Admin/Widget/state";

export class CreateWidgetRequest {
  public widgetTitle: string;
  public sourceType: number;
  public valueSource: string;
  public layoutType?: number;
  public enable?: boolean;
  public title?: string;
  public caption?: string;
  public labelReadMore?: string;
  public labelViewMore?: string;
  public showProfile?: boolean;
  public showNetworkIcon?: boolean;
  public accentColor?: string;
  public backGround?: string;
  public color?: string;
  public numberPerRow?: number;
  public customCss?: string;
  constructor(dto?: ISettingProviderWidget) {
    this.widgetTitle = dto?.title || "";
    this.sourceType = dto?.source || 0;
    this.valueSource = dto?.valueSource || "";
    this.layoutType = dto?.layout || 0;
    this.enable = dto?.header === "enable";
    this.title = dto?.titleHeader || "";
    this.caption = dto?.caption || "";
    this.labelReadMore = dto?.labelReadMore || "";
    this.labelViewMore = dto?.labelView || "";
    this.showProfile = dto?.showProfile === "enable";
    this.showNetworkIcon = dto?.showNetworkIcon === "enable";
    this.accentColor = dto?.accentColor || "";
    this.backGround = dto?.itemBackground || "";
    this.color = dto?.itemColor || "";
    this.numberPerRow = dto?.numberItemPerRow || 3;
    this.customCss = dto?.customCss || "";
  }
}
