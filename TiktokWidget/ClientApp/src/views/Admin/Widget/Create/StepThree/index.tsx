import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/reducers";
import { WidgetActionTS } from "stores/Widget/action";
import { IGuidesState } from "./Guides/GuidesModel";
import {
  GuidesHeader,
  GuidesHeaderIcon,
  GuidesHeaderLogo,
  GuidesHeaderText,
  GuidesWrapper,
} from "./Guides/GuidesStyle";
import GuidesStep1 from "./Guides/Step1";
import GuidesStep2 from "./Guides/Step2";

function StepThree() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.widgetReducer
  );

  const [state, setState] = useState<IGuidesState>({
    step: 1,
  });

  const onSetStep = (step: number) => () =>
    setState({
      step: step,
    });
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      // dispatch(WidgetActionTS.OnSetSetting(true));
      dispatch(WidgetActionTS.OnChangStatus());
      setState({
        step: 1,
      });
    };
  }, [dispatch]);

  return (
    <GuidesWrapper>
      <GuidesHeader>
        <GuidesHeaderIcon>
          <GuidesHeaderLogo />
        </GuidesHeaderIcon>
        <GuidesHeaderText>
          <h2>How to add the widget to your website</h2>
          <span>{`${widgetReducer.settings.source === 0 ? "#" : "@"}${
            widgetReducer.settings.valueSource
          }`}</span>
        </GuidesHeaderText>
      </GuidesHeader>
      {state.step === 1 ? (
        <GuidesStep1 setStep={onSetStep}></GuidesStep1>
      ) : (
        <GuidesStep2 setStep={onSetStep}></GuidesStep2>
      )}
    </GuidesWrapper>
  );
}

export default StepThree;
