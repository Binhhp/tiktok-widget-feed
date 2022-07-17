export interface BaseShopConfiguration {
  id: string;
  shopId: number;
  timezone: string;
  isEnabled: boolean;
  buttonPosition: ButtonPositionEnum;
  image: string;
  tikTokUserName: string;
  theme: string;
}

export enum ButtonPositionEnum {
  TopLeft = "TopLeft",
  TopRight = "TopRight",
  BottomLeft = "BottomLeft",
  BottomRight = "BottomRight",
}
