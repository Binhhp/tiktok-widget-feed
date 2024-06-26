import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/Widget/action";
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
    (state: RootReducer) => state.TiktokWidgetReducer
  );

  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
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

  const navigate = useNavigate();
  useEffect(() => {
    if (!widgetReducer.settings.valueSource) {
      return navigate(`/my-widget?shop=${shopReducer.shop.domain}`);
    }
  }, []);

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
