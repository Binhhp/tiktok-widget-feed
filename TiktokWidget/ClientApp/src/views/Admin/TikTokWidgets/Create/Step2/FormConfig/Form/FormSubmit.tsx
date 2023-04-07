import { Button } from "@shopify/polaris";
import { UriProvider } from "common/functions/FuncUtils";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateWidgetRequest } from "repositories/dtos/requests/CreateTiktokWidgetRequest";
import { UpdateWidgetRequest } from "repositories/dtos/requests/UpdateTiktokWidgetRequest";
import ShopAPI from "repositories/implements/ShopAPI";
import TikTokWidgetAPI from "repositories/implements/TikTokWidgetAPI";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/TiktokWidget/action";
import { ButtonCancel, FormSubmitWrapper } from "./FormConfigStyle";

function FormSubmit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const onCancel = () => {
    dispatch(WidgetActionTS.OnStep(0));
    if (widgetReducer.settings.id)
      navigate(UriProvider.KeepParameters(`/my-widget`));
    else navigate(UriProvider.KeepParameters(`/create-widget-step-1`));
  };
  const [loading, setLoading] = useState(false);
  const widgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );

  const onSubmit = async () => {
    if (!widgetReducer.settings.title || !widgetReducer.settings.valueSource)
      return;
    setLoading(true);
    if (widgetReducer.settings.id) {
      const response = await TikTokWidgetAPI.Update(
        widgetReducer.settings.id,
        new UpdateWidgetRequest(widgetReducer.settings)
      );
      if (response.Status) {
        dispatch(WidgetActionTS.OnStep(1));
        dispatch(WidgetActionTS.OnSetSetting(true));
        setLoading(false);
        return navigate(UriProvider.KeepParameters(`/my-widget`));
      } else {
        setLoading(false);
        toast.error(response.Error);
      }
    } else {
      const response = await TikTokWidgetAPI.Create(
        new CreateWidgetRequest(widgetReducer.settings),
        shopReducer.shop.domain
      );
      if (response.Status) {
        dispatch(WidgetActionTS.OnStep(3));
        ShopAPI.GetWidgetsCount(shopReducer.shop.domain ?? "").then((val) => {
          if (val === 1) {
            dispatch(WidgetActionTS.OnChangStatus("FirstCreated"));
          }

          dispatch(WidgetActionTS.OnSetWidgetCount(val));
        });
        setLoading(false);
        return navigate(
          UriProvider.KeepParameters(
            `/create-widget-step-3/${response.Data?.widgetId}`
          )
        );
      } else {
        setLoading(false);
        toast.error(response.Error);
      }
    }
  };

  return (
    <FormSubmitWrapper>
      <ButtonCancel onClick={onCancel}>Back</ButtonCancel>
      <Button
        disabled={
          !widgetReducer.settings.title || !widgetReducer.settings.valueSource
        }
        loading={loading}
        onClick={onSubmit}
      >
        Save
      </Button>
    </FormSubmitWrapper>
  );
}

export default FormSubmit;
