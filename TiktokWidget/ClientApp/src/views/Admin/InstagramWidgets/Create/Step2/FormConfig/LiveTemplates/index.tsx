import { EmptySearchResult } from "@shopify/polaris";
import { ValidatorProvider } from "common/constants/Validator";
import InstagramLayout from "Dependencies/InstagramLayout";
import { InstagramLayoutContext } from "Dependencies/InstagramLayout/InstagramLayoutContext";
import {
  IInstagramTemplateModel,
  InstagramOption,
} from "Dependencies/InstagramLayout/InstagramLayoutModel";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetVideoByJobRequest } from "repositories/dtos/requests/GetVideoByJobRequest";
import InstagramWidgetAPI from "repositories/implements/InstagramWidgetAPI";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { RootReducer } from "stores/Admin/reducers";
import CircleLoading from "ui-components/CircleLoading";
import { EmptyWrapper, LiveTemplateWrapper } from "./LiveTemplateStyle";

function LiveTemplates() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );

  const [layouts, setLayouts] = useState<IInstagramTemplateModel>({
    count: 0,
    data: [],
  });
  const queryData = () => {
    return Promise.resolve(layouts);
  };

  const templateContext = useContext(InstagramLayoutContext);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const getVideoFunc = async () => {
    console.clear();
    if (window._timeout) {
      if (!loading) setLoading(true);
      if (window._timeout < new Date().getTime()) {
        window._timeout = 0;
        setLoading(false);
        return;
      }
      try {
        const res = await InstagramWidgetAPI.GetVideosByJob(
          new GetVideoByJobRequest(
            widgetReducer.settings.valueSource,
            widgetReducer.settings.source
          ),
          widgetReducer.settings.limitItems
        );

        if (res?.count !== undefined) {
          setLoading(false);
          setLayouts({
            count: res.count,
            data: res.data,
          });
          dispatch(InstagramWidgetActionTS.SetWorkingSearch(false));
          window._timeout = 0;
          templateContext.OnCloseLoading();
        } else {
          setTimeout(() => getVideoFunc(), 1400);
        }
      } catch {
        setTimeout(() => getVideoFunc(), 1400);
      }
      console.clear();
    }
  };

  useEffect(() => {
    if (widgetReducer.settings.valueSource) {
      if (
        widgetReducer.settings.source === 1 &&
        !ValidatorProvider.UserName(widgetReducer.settings.valueSource)
      ) {
        return;
      }
      window._timeout = new Date().getTime() + 4 * 60000;
      getVideoFunc();
    }
  }, [widgetReducer.settings.valueSource, widgetReducer.settings.limitItems]);

  //Refresh Get Video when rise sequence number
  useEffect(() => {
    if (
      widgetReducer.settings.valueSource &&
      widgetReducer.sequenceNumber > 0
    ) {
      if (
        widgetReducer.settings.source === 1 &&
        !ValidatorProvider.UserName(widgetReducer.settings.valueSource)
      ) {
        return;
      }
      window._timeout = new Date().getTime() + 4 * 60000;
      getVideoFunc();
    }
  }, [widgetReducer.sequenceNumber]);

  useEffect(() => {
    return () => {
      window._timeout = 0;
    };
  }, []);

  return (
    <LiveTemplateWrapper>
      {!loading ? (
        <InstagramLayout
          disableContext
          style={{
            height: "calc(100% - 44px)",
          }}
          option={new InstagramOption().ToDo(widgetReducer.settings)}
          _queryData={queryData}
          customLoader={<CircleLoading />}
          notLoadmore
          nonAppend
          showLoadInfinite
          showPageFirst
          customEmpty={
            <EmptyWrapper>
              <EmptySearchResult
                title="No videos not found"
                description="Add or update widget with new username and hashtag"
                withIllustration
              />
            </EmptyWrapper>
          }
        ></InstagramLayout>
      ) : (
        <CircleLoading />
      )}
    </LiveTemplateWrapper>
  );
}

export default LiveTemplates;
