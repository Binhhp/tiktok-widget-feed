import Template from "Dependencies/LayoutTemplate";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/reducers";
import { TemplateType } from "Dependencies/LayoutTemplate/LayoutTemplateType";
import {
  CaptionConfig,
  FormConfigurationWrapper,
  IconMobile,
  MobileDeviceView,
  MobileHeader,
  MobileInformation,
  TitleConfig,
} from "../FormConfigStyle";
import React, { useEffect, useState } from "react";
import { Icon } from "@shopify/polaris";
import { AnalyticsMajor, WifiMajor } from "@shopify/polaris-icons";
import { DateTimeFormatter } from "common/functions/DateTimeFormat";
import Image from "ui-components/Image";
import Profile from "Dependencies/Profile";
import { ImageStorage } from "assets/images/ImageStorage";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import { TemplateStoreModel } from "stores/Templates/state";
import LoadingInfinite from "ui-components/LoadingInfinite";

function LiveTemplate() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.widgetReducer
  );

  const templateReducer: TemplateStoreModel = useSelector(
    (state: RootReducer) => state.templateStoreReducer[0]
  );

  const [intervalId, setIntervalId] = useState(0);

  const queryData = (pageIndex: number) => {
    clearInterval(intervalId);
    setIntervalId(0);
    return new WidgetReponsitory().GetVideos(
      widgetReducer.settings.id ?? "",
      pageIndex
    );
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newIntervalId = setInterval(async () => {
      const res = await new WidgetReponsitory().GetVideos(
        widgetReducer.settings.id ?? "",
        1
      );
      if (res?.count && res?.count > 0) {
        setLoading(false);
      }
    }, 2000);
    setIntervalId(newIntervalId);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
      setIntervalId(0);
    };
  }, []);

  const RenderLiveTemplates = (
    <Template
      id="template"
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
              name: templateReducer?.user?.author,
              followers: templateReducer?.user?.followerCount,
              following: templateReducer?.user?.followingCount,
              avt: templateReducer?.user?.avatarThumb,
              like: templateReducer?.user?.diggCount,
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
