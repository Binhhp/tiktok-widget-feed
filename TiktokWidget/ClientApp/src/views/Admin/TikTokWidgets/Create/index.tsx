import { LinkRouter } from "common/style/UtilStyles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import Loader from "ui-components/Loading/ComponentLoader";
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
    (state: RootReducer) => state.TiktokWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(WidgetActionTS.OnSetSetting(true));
  }, []);

  useEffect(() => {
    if (widgetReducer.count && widgetReducer.count > 0) {
      navigate(`/create-widget-step-1?shop=${shopReducer.shop.domain}&admin=1`);
      dispatch(WidgetActionTS.OnStep(1));
    } else dispatch(WidgetActionTS.OnStep(0));
  }, []);

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
              to={`/create-widget-step-1?shop=${shopReducer.shop.domain}&admin=1`}
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
