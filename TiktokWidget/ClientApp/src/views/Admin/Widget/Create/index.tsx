import { LinkRouter } from "common/style/Utils.style";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import { ApplicationActionTS } from "stores/Application/action";
import { RootReducer } from "stores/reducers";
import { WidgetActionTS } from "stores/Widget/action";
import Loader from "ui-components/Loader";
import CreateWidgetProvider from "./CreateWidgetProvider";
import {
  Content,
  Title,
  CreateWidgetWrapper,
  ColorRed,
  ColorBlue,
  Caption,
} from "./CreateWidgetStyle";
function CreateWidget() {
  const dispatch = useDispatch();
  const widgetReducer = useSelector(
    (state: RootReducer) => state.widgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(WidgetActionTS.OnSetSetting(true));
  }, []);

  useEffect(() => {
    if (shopReducer.shop.domain) {
      const widgetReponsitory = new WidgetReponsitory();
      widgetReponsitory.Get(1, shopReducer.shop.domain).then((res) => {
        dispatch(WidgetActionTS.OnSetWidgetCount(res.count));
        if (res.count > 0) {
          navigate(`/create-widget-step-1?shop=${shopReducer.shop.domain}`);
          dispatch(WidgetActionTS.OnStep(1));
        } else dispatch(WidgetActionTS.OnStep(0));
      });
    }
  }, [JSON.stringify(shopReducer.shop.domain)]);

  return (
    <CreateWidgetProvider>
      {widgetReducer.count !== undefined && widgetReducer.count === 0 ? (
        <CreateWidgetWrapper>
          <Content>
            <Title>
              Welcome to the&nbsp;<ColorRed>tiktok</ColorRed>&nbsp;
              <ColorBlue>all in one</ColorBlue>
            </Title>
            <Caption>
              Higher visitor engagement. Higher conversion rates.
            </Caption>
            <LinkRouter
              size="medium"
              to={`/create-widget-step-1?shop=${shopReducer.shop.domain}`}
            >
              Create new widget
            </LinkRouter>
          </Content>
        </CreateWidgetWrapper>
      ) : (
        <Loader></Loader>
      )}
    </CreateWidgetProvider>
  );
}

export default CreateWidget;
