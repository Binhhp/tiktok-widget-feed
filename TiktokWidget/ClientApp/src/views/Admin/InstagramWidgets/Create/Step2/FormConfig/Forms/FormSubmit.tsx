import { Button } from "@shopify/polaris";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { FormSubmitWrapper } from "../../Patterns/PatternStyle";
import toast from "react-hot-toast";
import { InstagramReponsitory } from "repositories/implements/InstagramReponsitory";
import { SetInstagramWidgetRequest } from "repositories/dtos/requests/SetInstagramWidgetRequest";
import { ShopReponsitory } from "repositories/implements/ShopReponsitory";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
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
    return navigate(
      `/instagram-step-1?shop=${shopReducer.shop.domain}&admin=1`
    );
  };

  const onSubmit = async () => {
    setLoading(true);
    const widgetReponsitory = new InstagramReponsitory();
    if (widgetReducer.settings.id) {
      const response = await widgetReponsitory.Update(
        widgetReducer.settings.id,
        new SetInstagramWidgetRequest(widgetReducer.settings)
      );
      if (response.Status) {
        dispatch(InstagramWidgetActionTS.OnStep(1));
        dispatch(InstagramWidgetActionTS.OnSetSetting(true));
        setLoading(false);
        return navigate(
          `/my-instagram-widget?shop=${shopReducer.shop.domain}&admin=1`
        );
      } else {
        setLoading(false);
        toast.error(response.Error);
      }
    } else {
      const response = await widgetReponsitory.Create(
        new SetInstagramWidgetRequest(widgetReducer.settings),
        shopReducer.shop.domain
      );
      if (response.Status) {
        dispatch(InstagramWidgetActionTS.OnStep(3));
        dispatch(InstagramWidgetActionTS.OnSetSetting(true));
        const shopReponsitory = new ShopReponsitory();
        const result = await shopReponsitory.GetInstagramCount(
          shopReducer.shop.domain ?? ""
        );
        if (result === 1) {
          dispatch(InstagramWidgetActionTS.OnChangStatus("FirstCreated"));
        }
        dispatch(InstagramWidgetActionTS.OnSetWidgetCount(result));
        setLoading(false);

        return navigate(
          `/instagram-step-3?shop=${shopReducer.shop.domain}&admin=1`
        );
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
