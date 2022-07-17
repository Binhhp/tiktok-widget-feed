import { Button } from "@shopify/polaris";
import { useQuery } from "hooks";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateWidgetRequest } from "repositories/dtos/requests/CreateWidgetRequest";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import { RootReducer } from "stores/reducers";
import { WidgetActionTS } from "stores/Widget/action";
import { FormSubmitWrapper } from "./FormConfigStyle";

function FormSubmit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);

  const widgetId = useQuery().get("key");

  const onCancel = () => {
    dispatch(WidgetActionTS.OnStep(0));
    dispatch(WidgetActionTS.OnSetSetting(true));
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
    var widgetReponsitory = new WidgetReponsitory();
    if (widgetReducer.settings.id) {
      const response = await widgetReponsitory.Update(
        widgetReducer.settings.id,
        new CreateWidgetRequest(shopReducer.shop.id, widgetReducer.settings)
      );
      setLoading(false);
      if (response.Status) {
        dispatch(WidgetActionTS.OnStep(3));
        dispatch(WidgetActionTS.OnSetSetting(true));
        if (widgetId) {
          return navigate(`/my-widget?shop=${shopReducer.shop.domain}`);
        } else {
          return navigate(
            `/create-widget-step-3/${widgetReducer.settings.id}?shop=${shopReducer.shop.domain}`
          );
        }
      } else {
        toast.error(response.Error);
      }
    } else {
      toast.error("Internal Server Error");
    }
  };

  return (
    <FormSubmitWrapper>
      <Button onClick={onCancel}>Cancel</Button>
      <Button loading={loading} onClick={onSubmit}>
        Save
      </Button>
    </FormSubmitWrapper>
  );
}

export default FormSubmit;
