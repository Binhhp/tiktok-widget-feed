import { Button } from "@shopify/polaris";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import { TemplateType } from "Dependencies/LayoutTemplate/LayoutTemplateType";
import { RootReducer } from "stores/Admin/reducers";
import { FormSubmitWrapper } from "../../Patterns/PatternStyle";

export default function FormSubmit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const [loading, setLoading] = useState(false);

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
      navigate(`/my-instagram-widget?shop=${shopReducer.shop.domain}`);
    else navigate(`/instagram-step-1?shop=${shopReducer.shop.domain}`);
  };

  const onSubmit = () => {
    setLoading(true);
    navigate(`/instagram-step-3?shop=${shopReducer.shop.domain}`);
  };
  return (
    <FormSubmitWrapper>
      <Button onClick={onCancel} outline>
        &lt; Back
      </Button>
      <Button loading={loading} primary onClick={onSubmit}>
        Next &gt;
      </Button>
    </FormSubmitWrapper>
  );
}
