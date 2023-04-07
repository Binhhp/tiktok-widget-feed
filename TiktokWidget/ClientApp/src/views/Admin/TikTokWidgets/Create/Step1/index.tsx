import {
  FormContentStepOne,
  FormControlStepOne,
  TittleStepOne,
} from "./StepOneStyle";
import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { CaptionStep } from "../CreateWidgetStyle";
import { WidgetActionTS } from "stores/Admin/TiktokWidget/action";
import { FormControlWidget } from "./StepOneStyle";
import { useNavigate } from "react-router-dom";
import CreateWidgetProvider from "../CreateWidgetProvider";
import FormControlSource from "./FormControl";
import { Container } from "common/style/UtilStyles";
import { UriProvider } from "common/functions/FuncUtils";

function StepOne() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(WidgetActionTS.OnStep(1));
  }, []);

  const onSubmit = async () => {
    dispatch(WidgetActionTS.OnStep(2));
    navigate(UriProvider.KeepParameters(`/create-widget-step-2`));
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
              <FormControlSource onSubmit={onSubmit}></FormControlSource>
            </FormContentStepOne>
          </FormControlStepOne>
        </FormControlWidget>
      </Container>
    </CreateWidgetProvider>
  );
}

export default StepOne;
