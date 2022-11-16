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
import { InstagramReponsitory } from "repositories/implements/InstagramReponsitory";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { RootReducer } from "stores/Admin/reducers";
import CircleLoading from "ui-components/CircleLoading";
import { LiveTemplateWrapper } from "./LiveTemplateStyle";

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
    if (window._timeout) {
      if (!loading) setLoading(true);
      if (window._timeout < new Date().getTime()) {
        window._timeout = 0;
        setLoading(false);
        return;
      }
      try {
        const res = await new InstagramReponsitory().GetVideosByJob(
          new GetVideoByJobRequest(
            widgetReducer.settings.valueSource,
            widgetReducer.settings.source
          ),
          100
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
    }
  };

  useEffect(() => {
    if (widgetReducer.settings.valueSource && layouts.data.length === 0) {
      if (
        widgetReducer.settings.source === 1 &&
        !ValidatorProvider.UserName(widgetReducer.settings.valueSource)
      ) {
        return;
      }
      window._timeout = new Date().getTime() + 4 * 60000;
      getVideoFunc();
    }
  }, [widgetReducer.settings.valueSource]);

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
          showLoadInfinite
          showPageFirst
          nonAppend
        ></InstagramLayout>
      ) : (
        <CircleLoading />
      )}
    </LiveTemplateWrapper>
  );
}

export default LiveTemplates;
