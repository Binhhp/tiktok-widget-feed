import { BaseShopConfiguration } from "../responses/BaseShopConfiguration";

export type UpdateShopConfigurationRequest = Pick<
  BaseShopConfiguration,
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
