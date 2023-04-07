import { UriProvider } from "common/functions/FuncUtils";
import { LinkRouter } from "common/style/UtilStyles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/TiktokWidget/action";
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
  const tiktokReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(WidgetActionTS.OnSetSetting(true));
    if (tiktokReducer.count) {
      navigate(UriProvider.KeepParameters(`/create-widget-step-1`));
      dispatch(WidgetActionTS.OnStep(1));
    }
    return;
  }, []);

  return (
    <CreateWidgetProvider>
      {tiktokReducer.count !== undefined && tiktokReducer.count === 0 ? (
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
              to={UriProvider.KeepParameters(`/create-widget-step-1`)}
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
