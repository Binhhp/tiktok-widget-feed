import LayoutTemplateContextProvider from "Dependencies/TikTokLayout/LayoutTemplateContext";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BaseTikTokWidget } from "repositories/dtos/responses/BaseTikTokWidget";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import { SettingProviderWidget } from "stores/Admin/Widget/state";
import StepTwoUpdate from "./UpdateWidget";
function StepTwoUpdateMain() {
  const { widgetId } = useParams();
  const dispatch = useDispatch();
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (widgetId) {
      const widgetResponsitory = new WidgetReponsitory();
      widgetResponsitory.GetById(widgetId).then((res) => {
        if (res?.Status) {
          const result = res.Data as BaseTikTokWidget;
          const dto = new SettingProviderWidget(result).ToDto();
          dispatch(WidgetActionTS.OnStep(2));
          dispatch(WidgetActionTS.OnSetSetting(dto));
        }
        return res.Status;
      });
    } else
      return navigate(
        `/create-widget-step-1?shop=${shopReducer.shop.domain}&admin=1`
      );
  }, [dispatch]);

  return (
    <LayoutTemplateContextProvider>
      <StepTwoUpdate></StepTwoUpdate>
    </LayoutTemplateContextProvider>
  );
}
export default StepTwoUpdateMain;
