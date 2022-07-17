import {
  FormContentStepOne,
  FormControlStepOne,
  TittleStepOne,
} from "./StepOneStyle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CaptionStep } from "../CreateWidgetStyle";
import { WidgetActionTS } from "stores/Widget/action";
import { FormControlWidget } from "./StepOneStyle";
import { useNavigate } from "react-router-dom";
import CreateWidgetProvider from "../CreateWidgetProvider";
import FormControlSource from "./FormControl";
import { Container } from "common/style/Utils.style";
import { RootReducer } from "stores/reducers";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import toast from "react-hot-toast";
import { TemplateStoreActionTS } from "stores/Templates/action";
function StepOne() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(WidgetActionTS.OnStep(1));
    dispatch(WidgetActionTS.OnSetSetting(true));
  }, []);

  const widgetReducer = useSelector(
    (state: RootReducer) => state.widgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);

  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: any, resetForm: any) => {
    setLoading(true);
    dispatch(TemplateStoreActionTS.OnClearState());
    dispatch(WidgetActionTS.OnStep(2));
    const widgetReponsitory = new WidgetReponsitory();
    const sourceType = widgetReducer.settings.source ?? 0;
    const res = await widgetReponsitory.Create(
      {
        widgetTitle: values.title,
        valueSource: values.value,
        sourceType: sourceType,
      },
      shopReducer.shop.domain
    );
    if (res.Status) {
      dispatch(
        WidgetActionTS.OnSetSetting({
          title: values.title,
          valueSource: values.value,
          id: res.Data.widgetId,
        })
      );
      resetForm();
      navigate(`/create-widget-step-2?shop=${shopReducer.shop.domain}`);
    } else {
      toast.error(`${res.Error}`);
    }
    setLoading(false);
  };

  return (
    <CreateWidgetProvider animation={true}>
      <Container flexDirection="column">
        <FormControlWidget width={50}>
          <TittleStepOne>Let's start with creating a new widget!</TittleStepOne>
          <CaptionStep>
            <span>Step 1: Select source</span>
          </CaptionStep>
          <FormControlStepOne>
            <FormContentStepOne>
              <FormControlSource
                loading={loading}
                onSubmit={onSubmit}
              ></FormControlSource>
            </FormContentStepOne>
          </FormControlStepOne>
        </FormControlWidget>
      </Container>
    </CreateWidgetProvider>
  );
}

export default StepOne;
