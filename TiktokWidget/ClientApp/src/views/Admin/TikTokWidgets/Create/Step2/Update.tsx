import { UriProvider } from "common/functions/FuncUtils";
import LayoutTemplateContextProvider from "Dependencies/TikTokLayout/LayoutTemplateContext";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TiktokWidgetResponse } from "repositories/dtos/responses/TiktokWidgetResponse";
import TikTokWidgetAPI from "repositories/implements/TikTokWidgetAPI";
import { WidgetActionTS } from "stores/Admin/TiktokWidget/action";
import { SettingProviderWidget } from "stores/Admin/TiktokWidget/state";
import StepTwoUpdate from "./UpdateWidget";
function StepTwoUpdateMain() {
  const { widgetId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (widgetId) {
      TikTokWidgetAPI.GetById(widgetId).then((res) => {
        if (res?.Status) {
          const result = res.Data as TiktokWidgetResponse;
          const dto = new SettingProviderWidget(result).ToDto();
          dispatch(WidgetActionTS.OnStep(2));
          dispatch(WidgetActionTS.OnSetSetting(dto));
        }
        return res.Status;
      });
    } else return navigate(UriProvider.KeepParameters(`/create-widget-step-1`));
  }, []);

  return (
    <LayoutTemplateContextProvider>
      <StepTwoUpdate></StepTwoUpdate>
    </LayoutTemplateContextProvider>
  );
}
export default StepTwoUpdateMain;
