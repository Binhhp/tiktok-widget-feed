import { Button } from "@shopify/polaris";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { FormSubmitWrapper } from "../../Patterns/PatternStyle";
import toast from "react-hot-toast";
import InstagramWidgetAPI from "repositories/implements/InstagramWidgetAPI";
import { SetInstagramWidgetRequest } from "repositories/dtos/requests/SetInstagramWidgetRequest";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { UriProvider } from "common/functions/FuncUtils";
import ShopAPI from "repositories/implements/ShopAPI";
export default function FormSubmit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const [loading, setLoading] = useState(false);

  const onBackStep = () => {
    dispatch(InstagramWidgetActionTS.OnStep(1));
    return navigate(UriProvider.KeepParameters(`/instagram-step-1`));
  };

  const onSubmit = async () => {
    setLoading(true);
    if (widgetReducer.settings.id) {
      const response = await InstagramWidgetAPI.Update(
        widgetReducer.settings.id,
        new SetInstagramWidgetRequest(widgetReducer.settings)
      );
      if (response.Status) {
        dispatch(InstagramWidgetActionTS.OnStep(1));
        dispatch(InstagramWidgetActionTS.OnSetSetting(true));
        setLoading(false);
        return navigate(UriProvider.KeepParameters(`/my-instagram-widget`));
      } else {
        setLoading(false);
        toast.error(response.Error);
      }
    } else {
      const response = await InstagramWidgetAPI.Create(
        new SetInstagramWidgetRequest(widgetReducer.settings),
        shopReducer.shop.domain
      );
      if (response.Status) {
        dispatch(InstagramWidgetActionTS.OnStep(3));
        dispatch(InstagramWidgetActionTS.OnSetSetting(true));
        const result = await ShopAPI.GetInstagramCount(
          shopReducer.shop.domain ?? ""
        );
        if (result === 1) {
          dispatch(InstagramWidgetActionTS.OnChangStatus("FirstCreated"));
        }
        dispatch(InstagramWidgetActionTS.OnSetWidgetCount(result));
        setLoading(false);

        return navigate(UriProvider.KeepParameters(`/instagram-step-3`));
      } else {
        setLoading(false);
        toast.error(response.Error);
      }
    }
  };

  return (
    <FormSubmitWrapper>
      <Button onClick={onBackStep} outline>
        &lt; Back
      </Button>
      <Button loading={loading} primary onClick={onSubmit}>
        Next &gt;
      </Button>
    </FormSubmitWrapper>
  );
}
