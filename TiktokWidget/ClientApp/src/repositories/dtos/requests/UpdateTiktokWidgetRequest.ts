import { ISettingProviderWidget } from "stores/Admin/TiktokWidget/state";
export class UpdateWidgetRequest {
  public WidgetTitle: string;
  public SourceType: number;
  public ValueSource: string;
  public LayoutType?: number;
  public Enable?: boolean;
  public Title?: string;
  public Caption?: string;
  public LabelReadMore?: string;
  public LabelViewMore?: string;
  public ShowProfile?: boolean;
  public ShowNetworkIcon?: boolean;
  public AccentColor?: string;
  public BackGround?: string;
  public Color?: string;
  public NumberPerRow?: number;
  public CustomCss?: string;
  public NumberItems?: number;
  public DisableShowItems?: string[];
  public ItemSorts?: string[];

  constructor(dto?: ISettingProviderWidget) {
    this.WidgetTitle = dto?.title || "";
    this.SourceType = dto?.source || 0;
    this.ValueSource = dto?.valueSource || "";
    this.LayoutType = dto?.layout || 0;
    this.Enable = dto?.header === "enable";
    this.Title = dto?.titleHeader || "";
    this.Caption = dto?.caption || "";
    this.LabelReadMore = dto?.labelReadMore || "";
    this.LabelViewMore = dto?.labelView || "";
    this.ShowProfile = dto?.showProfile === "enable";
    this.ShowNetworkIcon = dto?.showNetworkIcon === "enable";
    this.AccentColor = dto?.accentColor || "";
    this.BackGround = dto?.itemBackground || "";
    this.Color = dto?.itemColor || "";
    this.NumberPerRow = dto?.numberItemPerRow || 3;
    this.CustomCss = dto?.customCss || "";
    this.NumberItems = dto?.numberItems;

    if (dto?.disableShowItems) {
      this.DisableShowItems = dto.disableShowItems;
    }
    if (dto?.itemSorts) {
      this.ItemSorts = dto?.itemSorts;
    }
  }
}
