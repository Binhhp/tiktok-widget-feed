import React, { useEffect, useState } from "react";
import {
  BaseShopConfiguration,
  ButtonPositionEnum,
} from "repositories/dtos/responses/BaseShopConfiguration";
import { ShopReponsitory } from "repositories/implements/ShopReponsitory";
import { ButtonOptionWrapper } from "./ButtonStyle";

function ButtonOption() {
  const [button, setButton] = useState<BaseShopConfiguration>();
  const fetchShopConfiguration = () => {
    const shopReponsitory = new ShopReponsitory();
    shopReponsitory.GetConfiguration(window.location.hostname).then((res) => {
      if (res) {
        setButton(res);
      }
    });
  };

  useEffect(() => {
    if (window.location.hostname) {
      fetchShopConfiguration();
    }
  }, []);

  const classFromPosition = () => {
    if (button?.buttonPosition === ButtonPositionEnum.TopLeft)
      return "top-left";
    if (button?.buttonPosition === ButtonPositionEnum.TopRight)
      return "top-right";
    if (button?.buttonPosition === ButtonPositionEnum.BottomLeft)
      return "bottom-left";
    return "bottom-right";
  };

  return button?.id ? (
    <ButtonOptionWrapper
      className={classFromPosition()}
      url={button.image}
    ></ButtonOptionWrapper>
  ) : (
    <></>
  );
}

export default ButtonOption;
