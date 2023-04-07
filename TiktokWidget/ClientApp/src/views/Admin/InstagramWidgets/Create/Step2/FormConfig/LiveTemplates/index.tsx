import { EmptySearchResult } from "@shopify/polaris";
import { ValidatorProvider } from "common/constants/Validator";
import InstagramLayout from "Dependencies/InstagramLayout";
import { InstagramLayoutContext } from "Dependencies/InstagramLayout/InstagramLayoutContext";
import {
  IInstagramTemplateModel,
  InstagramOption,
} from "Dependencies/InstagramLayout/InstagramLayoutModel";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddJobRequest } from "repositories/dtos/requests/AddJobRequest";
import {
  GetVideoByJobInstagramRequest,
  SourceTypeEnum,
} from "repositories/dtos/requests/GetVideoByJobRequest";
import InstagramWidgetAPI from "repositories/implements/InstagramWidgetAPI";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { RootReducer } from "stores/Admin/reducers";
import CircleLoading from "ui-components/CircleLoading";
import { EmptyWrapper, LiveTemplateWrapper } from "./LiveTemplateStyle";

const NUMBER_REFRESH_GET_VIDEOS = 1400;
const NUMBER_GET_VIDDEOS = 10000;
function LiveTemplates() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
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
        window._syncJob = false;
        setLoading(false);
        return;
      }
      const sourceType = widgetReducer.settings.source;
      try {
        const res = await InstagramWidgetAPI.GetVideosByJob(
          new GetVideoByJobInstagramRequest(
            widgetReducer.settings.valueSource,
            sourceType
          ),
          NUMBER_GET_VIDDEOS
        );

        if (res?.count !== undefined) {
          setLoading(false);
          setLayouts({
            count: widgetReducer.settings.limitItems ?? res.count,
            data: res.data.slice(0, widgetReducer.settings.limitItems),
          });
          dispatch(InstagramWidgetActionTS.SetWorkingSearch(false));
          //Upgrate item sort and disable items to data array
          if (res.data && res.data.length > 0) {
            const itemSorts = res.data.map((x) => x?.id as string);
            dispatch(
              InstagramWidgetActionTS.OnSetSetting({
                disableShowItems: [],
                itemSorts: itemSorts,
              })
            );
          }
          window._timeout = 0;
          window._syncJob = false;
          templateContext.OnCloseLoading();
        } else {
          const addJobResp = await AddJobWhenFailture(
            widgetReducer.settings.valueSource,
            sourceType
          );
          if (addJobResp || window._syncJob) {
            setTimeout(() => getVideoFunc(), NUMBER_REFRESH_GET_VIDEOS);
          }
        }
      } catch {
        const addJobResp = await AddJobWhenFailture(
          widgetReducer.settings.valueSource,
          sourceType
        );
        if (addJobResp || window._syncJob) {
          setTimeout(() => getVideoFunc(), NUMBER_REFRESH_GET_VIDEOS);
        }
      }
      console.clear();
    }
  };

  useEffect(() => {
    window._timeout = 0;
    window._syncJob = false;
  }, []);

  useEffect(() => {
    if (widgetReducer.settings.valueSource) {
      if (
        widgetReducer.settings.source === SourceTypeEnum.InstagramUserName &&
        !ValidatorProvider.UserName(widgetReducer.settings.valueSource)
      ) {
        return;
      }
      window._timeout = new Date().getTime() + 4 * 60000;
      getVideoFunc();
    }
  }, [widgetReducer.settings.valueSource, widgetReducer.settings.limitItems]);

  useEffect(() => {
    return () => {
      window._timeout = 0;
      window._syncJob = false;
    };
  }, []);

  //Func add job if get data failture, add job only 1 time (condition: window._syncJob = false)
  const AddJobWhenFailture = useCallback(
    async (
      valS: string | undefined,
      sourceT: SourceTypeEnum | undefined
    ): Promise<any> => {
      if (!window._syncJob && valS && sourceT !== undefined) {
        const resp = await InstagramWidgetAPI.AddJob(
          shopReducer.shop.domain,
          new AddJobRequest(valS, sourceT)
        );
        window._syncJob = resp.Status;
        return resp.Status;
      }
      return false;
    },
    [window._syncJob]
  );

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
