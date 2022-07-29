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
    fetchShopConfiguration();
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
      href={`${window.location.origin}/admin/themes/current/editor`}
      target="_blank"
      className={classFromPosition()}
    >
      <img src={button.image} alt="Tiktok Feed Orichi" />
    </ButtonOptionWrapper>
  ) : (
    <></>
  );
}

export default ButtonOption;
