import Template from "Dependencies/TikTokLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { TemplateType } from "Dependencies/TikTokLayout/LayoutTemplateType";
import {
  FormConfigurationWrapper,
  IconMobile,
  MobileDeviceView,
  MobileHeader,
  MobileInformation,
  TikTokHeaderLive,
  TikTokTitleLive,
} from "../FormConfigStyle";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Icon } from "@shopify/polaris";
import { AnalyticsMajor, WifiMajor } from "@shopify/polaris-icons";
import { DateTimeFormatter } from "common/functions/DateTimeFormat";
import Image from "ui-components/Image";
import Profile from "Dependencies/Profile";
import { ImageStorage } from "assets/images/ImageStorage";
import LoadingInfinite from "ui-components/Loading/ButtonLoading";
import { LayoutTemplateContext } from "Dependencies/TikTokLayout/LayoutTemplateContext";
import {
  GetVideoByJobRequest,
  SourceTypeEnum,
} from "repositories/dtos/requests/GetVideoByJobRequest";
import { IVideoTemplateModel } from "Dependencies/TikTokLayout/LayoutTemplateModel";
import { ValidatorProvider } from "common/constants/Validator";
import { WidgetActionTS } from "stores/Admin/TiktokWidget/action";
import TikTokWidgetAPI from "repositories/implements/TikTokWidgetAPI";
import { TikTokCaption } from "views/Layout/TikTok/Application/TiktokStyle";
import { AddJobRequest } from "repositories/dtos/requests/AddJobRequest";

const NUMBER_REFRESH_GET_VIDEOS = 1400;
const NUMBER_GET_VIDDEOS = 10000;
function LiveTemplate() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
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
        window._syncJob = false;
        return;
      }
      try {
        const res = await TikTokWidgetAPI.GetVideosByJob(
          new GetVideoByJobRequest(
            widgetReducer.settings.valueSource,
            widgetReducer.settings.source
          ),
          NUMBER_GET_VIDDEOS
        );
        if (res?.count !== undefined) {
          setLoading(false);
          setLayouts({
            count: widgetReducer.settings.numberItems ?? res.count,
            data: res.data.slice(0, widgetReducer.settings.numberItems),
          });
          dispatch(WidgetActionTS.SetWorkingSearch(false));
          if (res.data && res.data.length > 0) {
            //Upgrate item sort and disable items to data array
            const itemSorts = res.data.map((x) => x?.id as string);
            dispatch(
              WidgetActionTS.OnSetSetting({
                disableShowItems: [],
                itemSorts: itemSorts,
              })
            );
          }
          window._timeout = 0;
          window._syncJob = false;
          templateContext.OnCloseLoading();
        } else {
          //Add job if get data failture
          const addJobResp = await AddJobWhenFailture(
            widgetReducer.settings.valueSource,
            widgetReducer.settings.source
          );
          if (addJobResp || window._syncJob) {
            setTimeout(() => getVideoFunc(), NUMBER_REFRESH_GET_VIDEOS);
          }
        }
      } catch {
        //Add job if get data failture
        const addJobResp = await AddJobWhenFailture(
          widgetReducer.settings.valueSource,
          widgetReducer.settings.source
        );
        if (addJobResp || window._syncJob) {
          setTimeout(() => getVideoFunc(), NUMBER_REFRESH_GET_VIDEOS);
        }
      }
    }
  };
  //Func add job if get data failture, add job only 1 time (condition: window._syncJob = false)
  const AddJobWhenFailture = useCallback(
    async (
      valS: string | undefined,
      sourceT: SourceTypeEnum | undefined
    ): Promise<any> => {
      if (!window._syncJob && valS && sourceT !== undefined) {
        const resp = await TikTokWidgetAPI.AddJob(
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

  useEffect(() => {
    window._timeout = 0;
    window._syncJob = false;
  }, []);

  useEffect(() => {
    if (widgetReducer.settings.valueSource && layouts.data.length === 0) {
      if (
        widgetReducer.settings.source === 1 &&
        !ValidatorProvider.UserName(widgetReducer.settings.valueSource)
      ) {
        return;
      }
      window._timeout = new Date().getTime() + 4 * 60000;
      window._syncJob = false;
      getVideoFunc();
    }
  }, [widgetReducer.settings.valueSource]);

  //Refresh Get Video when rise sequence number
  useEffect(() => {
    if (widgetReducer.settings.valueSource && window._timeout === 0) {
      if (
        widgetReducer.settings.source === 1 &&
        !ValidatorProvider.UserName(widgetReducer.settings.valueSource)
      ) {
        return;
      }
      window._timeout = new Date().getTime() + 4 * 60000;
      window._syncJob = false;
      getVideoFunc();
    }
  }, [widgetReducer.sequenceNumber]);

  useEffect(() => {
    return () => {
      window._timeout = 0;
      window._syncJob = false;
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
        <TikTokHeaderLive>
          {widgetReducer.settings.titleHeader && (
            <TikTokTitleLive>
              {widgetReducer.settings.titleHeader}
            </TikTokTitleLive>
          )}
          {widgetReducer.settings.caption && (
            <TikTokCaption>{widgetReducer.settings.caption}</TikTokCaption>
          )}
        </TikTokHeaderLive>
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
        {widgetReducer.mobile && widgetReducer.settings.header === "enable" && (
          <TikTokHeaderLive>
            {widgetReducer.settings.titleHeader && (
              <TikTokTitleLive>
                {widgetReducer.settings.titleHeader}
              </TikTokTitleLive>
            )}
            {widgetReducer.settings.caption && (
              <TikTokCaption>{widgetReducer.settings.caption}</TikTokCaption>
            )}
          </TikTokHeaderLive>
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
