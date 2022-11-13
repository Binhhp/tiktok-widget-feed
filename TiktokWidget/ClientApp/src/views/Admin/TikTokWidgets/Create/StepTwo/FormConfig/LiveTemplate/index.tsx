import Template from "Dependencies/TikTokLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { TemplateType } from "Dependencies/TikTokLayout/LayoutTemplateType";
import {
  CaptionConfig,
  FormConfigurationWrapper,
  IconMobile,
  MobileDeviceView,
  MobileHeader,
  MobileInformation,
  TitleConfig,
} from "../FormConfigStyle";
import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@shopify/polaris";
import { AnalyticsMajor, WifiMajor } from "@shopify/polaris-icons";
import { DateTimeFormatter } from "common/functions/DateTimeFormat";
import Image from "ui-components/Image";
import Profile from "Dependencies/Profile";
import { ImageStorage } from "assets/images/ImageStorage";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import LoadingInfinite from "ui-components/Loading/ButtonLoading";
import { LayoutTemplateContext } from "Dependencies/TikTokLayout/LayoutTemplateContext";
import { GetVideoByJobRequest } from "repositories/dtos/requests/GetVideoByJobRequest";
import { IVideoTemplateModel } from "Dependencies/TikTokLayout/LayoutTemplateModel";
import { ValidatorProvider } from "common/constants/Validator";
import { WidgetActionTS } from "stores/Admin/Widget/action";

function LiveTemplate() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );

  const [layouts, setLayouts] = useState<IVideoTemplateModel>({
    count: 0,
    data: [],
  });
  const queryData = () => {
    return Promise.resolve(layouts);
  };

  const templateContext = useContext(LayoutTemplateContext);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const getVideoFunc = async () => {
    if (window._timeout) {
      if (!loading) setLoading(true);
      if (window._timeout < new Date().getTime()) {
        window._timeout = 0;
        return;
      }
      try {
        const res = await new WidgetReponsitory().GetVideosByJob(
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
          dispatch(WidgetActionTS.SetWorkingSearch(false));
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
  }, [widgetReducer.sequenceNumber]);

  useEffect(() => {
    return () => {
      window._timeout = 0;
    };
  }, []);

  const RenderLiveTemplates = (
    <Template
      disableContext
      showLoadInfinite
      circleLoading
      options={{
        readMore: widgetReducer.settings.labelReadMore ?? "Read more",
        bg: widgetReducer.settings.itemBackground,
        color: widgetReducer.settings.itemColor,
        showNetworkIcon: widgetReducer.settings.showNetworkIcon,
        accentColor: widgetReducer.settings.accentColor,
        viewMore: widgetReducer.settings.labelView,
      }}
      showAll={
        widgetReducer.mobile &&
        widgetReducer.settings.layout === TemplateType.Slider
      }
      contentOverflow={
        widgetReducer.settings.layout === TemplateType.List ??
        (widgetReducer.mobile &&
          widgetReducer.settings.layout === TemplateType.Slider)
      }
      showItems={
        widgetReducer.mobile
          ? 1
          : widgetReducer?.settings?.numberItemPerRow
          ? widgetReducer.settings.numberItemPerRow * 2
          : 6
      }
      row={
        widgetReducer.mobile ? 1 : widgetReducer.settings.numberItemPerRow ?? 3
      }
      type={widgetReducer.settings.layout || TemplateType.Slider}
      _queryData={queryData}
      nonAppend
      imgHeight={400}
      flexDirection={
        (widgetReducer.mobile &&
          widgetReducer.settings.layout !== TemplateType.Slider &&
          "column") ||
        "row"
      }
      style={{
        pl: widgetReducer.mobile ? 0 : undefined,
        pr: widgetReducer.mobile ? 0 : undefined,
        zIndex: 1,
      }}
    ></Template>
  );
  return (
    <FormConfigurationWrapper>
      {!widgetReducer.mobile && widgetReducer.settings.header === "enable" && (
        <TitleConfig>{widgetReducer.settings.titleHeader}</TitleConfig>
      )}
      {!widgetReducer.mobile && (
        <CaptionConfig>{widgetReducer.settings.caption}</CaptionConfig>
      )}
      <MobileDeviceView
        width={
          !widgetReducer.mobile
            ? 100
            : widgetReducer.settings.layout === TemplateType.Slider
            ? 60
            : 50
        }
        pt={widgetReducer.mobile ? 10 : 0}
        pr={widgetReducer.mobile ? 20 : 0}
        pb={widgetReducer.mobile ? 10 : 0}
        pl={widgetReducer.mobile ? 20 : 0}
        boxShadow={
          widgetReducer.mobile ? "0px 0px 24px rgba(180, 188, 203, 0.24)" : ""
        }
      >
        {widgetReducer.mobile && (
          <MobileHeader>
            <MobileInformation>
              {DateTimeFormatter.TimeZone(new Date())}
            </MobileInformation>
            <MobileInformation>
              <Icon source={AnalyticsMajor}></Icon>
              <Icon source={WifiMajor}></Icon>
              <IconMobile>
                <Image src={ImageStorage.Battery}></Image>
              </IconMobile>
            </MobileInformation>
          </MobileHeader>
        )}
        {widgetReducer.mobile && widgetReducer.settings.source === 1 && (
          <Profile
            profileInfo={{
              name: templateContext.state?.user?.author,
              followers: templateContext.state?.user?.followerCount,
              following: templateContext.state?.user?.followingCount,
              avt: templateContext.state?.user?.avatarThumb,
              like: templateContext.state?.user?.diggCount,
            }}
            style={{
              mb: 20,
              imgWidth: 80,
              fontSize: 14,
              maxWidth: "100%",
            }}
          ></Profile>
        )}
        {loading ? <LoadingInfinite></LoadingInfinite> : RenderLiveTemplates}
      </MobileDeviceView>
    </FormConfigurationWrapper>
  );
}

export default React.memo(LiveTemplate);
