import { ButtonPositionEnumRequest } from "repositories/dtos/requests/UpdateShopConfigurationRequest";
import { ButtonPositionEnum } from "repositories/dtos/responses/ShopConfigurationResponse";
import { IButtonPositionInit } from "stores/Admin/ButtonWidget/state";

export interface IButtonWidgetControl {
  borderColor?: string;
  borderColorHover?: string;
  bg?: string;
}

export class ButtonPositionProvider {
  static Clone = (position: ButtonPositionEnum): IButtonPositionInit => {
    switch (position) {
      case ButtonPositionEnum.TopRight:
        return {
          top: true,
          right: true,
          bottom: false,
          left: false,
        };
      case ButtonPositionEnum.TopLeft:
        return {
          top: true,
          left: true,
          right: false,
          bottom: false,
        };
      case ButtonPositionEnum.BottomLeft:
        return {
          bottom: true,
          left: true,
          top: false,
          right: false,
        };
      default:
        return {
          bottom: true,
          right: true,
          left: false,
          top: false,
        };
    }
  };

  static ToDto = (position: IButtonPositionInit): ButtonPositionEnum => {
    if (position.top && position.left) return ButtonPositionEnum.TopLeft;
    if (position.top && position.right) return ButtonPositionEnum.TopRight;
    if (position.bottom && position.left) return ButtonPositionEnum.BottomLeft;
    return ButtonPositionEnum.BottomRight;
  };

  static ToDtoV2 = (
    position: IButtonPositionInit
  ): ButtonPositionEnumRequest => {
    if (position.top && position.left) return ButtonPositionEnumRequest.TopLeft;
    if (position.top && position.right)
      return ButtonPositionEnumRequest.TopRight;
    if (position.bottom && position.left)
      return ButtonPositionEnumRequest.BottomLeft;
    return ButtonPositionEnumRequest.BottomRight;
  };
}
