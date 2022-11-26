import { UriProvider } from "common/functions/FuncUtils";
import LayoutTemplateContextProvider from "Dependencies/TikTokLayout/LayoutTemplateContext";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BaseTikTokWidget } from "repositories/dtos/responses/BaseTikTokWidget";
import TikTokWidgetAPI from "repositories/implements/TikTokWidgetAPI";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import { SettingProviderWidget } from "stores/Admin/Widget/state";
import StepTwoUpdate from "./UpdateWidget";
function StepTwoUpdateMain() {
  const { widgetId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (widgetId) {
      TikTokWidgetAPI.GetById(widgetId).then((res) => {
        if (res?.Status) {
          const result = res.Data as BaseTikTokWidget;
          const dto = new SettingProviderWidget(result).ToDto();
          dispatch(WidgetActionTS.OnStep(2));
          dispatch(WidgetActionTS.OnSetSetting(dto));
        }
        return res.Status;
      });
    } else return navigate(UriProvider.KeepParameters(`/create-widget-step-1`));
  }, [dispatch]);

  return (
    <LayoutTemplateContextProvider>
      <StepTwoUpdate></StepTwoUpdate>
    </LayoutTemplateContextProvider>
  );
}
export default StepTwoUpdateMain;
