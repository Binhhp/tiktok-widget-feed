import { Button } from "@shopify/polaris";
import { TemplateType } from "Dependencies/LayoutTemplate/LayoutTemplateType";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateWidgetRequest } from "repositories/dtos/requests/CreateWidgetRequest";
import { UpdateWidgetRequest } from "repositories/dtos/requests/UpdateWidgetRequest";
import { ShopReponsitory } from "repositories/implements/ShopReponsitory";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import { RootReducer } from "stores/reducers";
import { WidgetActionTS } from "stores/Widget/action";
import { ButtonCancel, FormSubmitWrapper } from "./FormConfigStyle";

function FormSubmit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);

  const onCancel = () => {
    dispatch(WidgetActionTS.OnStep(0));
    dispatch(
      WidgetActionTS.OnSetSetting({
        layout: TemplateType.Slider,
        header: "enable",
        titleHeader: "My TikTok Feed",
        caption: "caption",
        labelReadMore: "Read more",
        labelView: "View more",
        showProfile: "enable",
        showNetworkIcon: "enable",
        accentColor: "#000000",
        itemBackground: "#fafafa",
        itemColor: "#000000",
        numberItemPerRow: 3,
        products: [],
      })
    );
    if (widgetReducer.settings.id)
      navigate(`/my-widget?shop=${shopReducer.shop.domain}`);
    else navigate(`/create-widget-step-1?shop=${shopReducer.shop.domain}`);
  };
  const [loading, setLoading] = useState(false);
  const widgetReducer = useSelector(
    (state: RootReducer) => state.widgetReducer
  );

  const onSubmit = async () => {
    setLoading(true);
    const widgetReponsitory = new WidgetReponsitory();
    if (widgetReducer.settings.id) {
      const response = await widgetReponsitory.Update(
        widgetReducer.settings.id,
        new UpdateWidgetRequest(widgetReducer.settings)
      );
      setLoading(false);
      if (response.Status) {
        dispatch(WidgetActionTS.OnStep(1));
        dispatch(WidgetActionTS.OnSetSetting(true));
        return navigate(`/my-widget?shop=${shopReducer.shop.domain}`);
      } else {
        toast.error(response.Error);
      }
    } else {
      const response = await widgetReponsitory.Create(
        new CreateWidgetRequest(widgetReducer.settings),
        shopReducer.shop.domain
      );
      if (response.Status) {
        dispatch(WidgetActionTS.OnStep(3));
        dispatch(WidgetActionTS.OnSetSetting(true));
        setLoading(false);
        const shopReponsitory = new ShopReponsitory();
        shopReponsitory
          .GetWidgetsCount(shopReducer.shop.domain ?? "")
          .then((val) => {
            dispatch(WidgetActionTS.OnSetWidgetCount(val));
          });
        return navigate(
          `/create-widget-step-3/${response.Data?.widgetId}?shop=${shopReducer.shop.domain}`
        );
      } else {
        toast.error(response.Error);
      }
    }
  };

  return (
    <FormSubmitWrapper>
      <ButtonCancel onClick={onCancel}>Cancel</ButtonCancel>
      <Button loading={loading} onClick={onSubmit}>
        Save
      </Button>
    </FormSubmitWrapper>
  );
}

export default FormSubmit;
