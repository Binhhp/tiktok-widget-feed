import { ShopResponseConfiguration } from "../responses/ShopConfigurationResponse";

export type UpdateShopConfigurationRequest = Pick<
  ShopResponseConfiguration,
  "image" | "theme" | "tikTokUserName"
> & {
  buttonPosition: ButtonPositionEnumRequest;
  isEnabled: boolean;
};

export enum ButtonPositionEnumRequest {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
}
