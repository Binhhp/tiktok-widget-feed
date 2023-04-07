import { Guid, UriProvider } from "common/functions/FuncUtils";
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import OnBoardingPresentation from "../Presentational";
import importVideos from "../Icons/import-video.png";
import tagProduct from "../Icons/tag-product.png";
import customDesign from "../Icons/custom-design.png";
import enableApplication from "../Icons/enable-app.png";
import testApp from "../Icons/test-app.png";
import completed from "../Icons/completed.png";
import { TabItemOnBoarding } from "../OnBoardingStyled";
import { actionCallback, TagProductType, WidgetType } from "../OnBoardingModel";
import { ProductResponse } from "repositories/dtos/responses/ProductResponse";
import TikTokWidgetAPI from "repositories/implements/TikTokWidgetAPI";
import { CreateWidgetRequest } from "repositories/dtos/requests/CreateTiktokWidgetRequest";
import { RootReducer } from "stores/Admin/reducers";
import toast from "react-hot-toast";
import InstagramWidgetAPI from "repositories/implements/InstagramWidgetAPI";
import { SetInstagramWidgetRequest } from "repositories/dtos/requests/SetInstagramWidgetRequest";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { WidgetActionTS } from "stores/Admin/TiktokWidget/action";
import { AppSettingOnBoarding } from "../AppSettingOnboarding";
import { SourceTypeEnum } from "repositories/dtos/requests/GetVideoByJobRequest";

function OnBoardingContainer() {
  // Select tab items follow step
  const [selectTabItem, setSelectTabItem] = useState<number>(0);
  // Step by step current index
  const [step, setStep] = useState<number>(0);
  // Get reducer
  const tiktokReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );
  const instagramReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelectTabItem(selectedTabIndex),
    []
  );

  // Config video uncheck follow list string video id
  const [videoUnchecked, setVideoUnChecked] = useState<string[]>([]);
  const setVideoUnShow = (items: string[]) => setVideoUnChecked(items);

  // Config video sorted follow list string video id
  const [videoSorted, setVideoSorted] = useState<string[]>([]);
  const onSetVideoSortd = (items: string[]) => setVideoSorted(items);

  //Widget Manager with Tiktok or Instagram
  const { widget } = useParams();
  const [widgetType, setWidgetType] = useState<WidgetType>(
    widget === "tiktok" ? WidgetType.Tiktok : WidgetType.Instagram
  );

  const onSetType = useCallback(
    (typeSelected: WidgetType) => () => {
      setWidgetType(typeSelected);
      setVideoUnChecked([]);
    },
    []
  );

  const onSetstep = useCallback((step: number) => setStep(step), []);

  // step view tab header
  const stepViewTab = (
    title: string,
    img: string,
    alt: string,
    stepCurent: number
  ) => {
    return (
      <TabItemOnBoarding>
        {step > stepCurent ? (
          <img src={completed} alt={alt} />
        ) : (
          <img src={img} alt={alt} />
        )}
        <span>{title}</span>
      </TabItemOnBoarding>
    );
  };

  // Config tab items
  const tabs = useCallback(
    () => [
      {
        id: "import-video",
        content: (step: number) =>
          stepViewTab(
            "Import video",
            importVideos,
            "Step 1: Import video",
            step
          ),
      },
      {
        id: "tag-product",
        content: (step: number) =>
          stepViewTab("Tag Product", tagProduct, "Step 2: Tag Product", step),
      },
      {
        id: "customize-design",
        content: (step: number) =>
          stepViewTab(
            "Customize design",
            customDesign,
            "Step 3: Customize design",
            step
          ),
      },
      {
        id: "enable-app",
        content: (step: number) =>
          stepViewTab(
            "Enable app in theme",
            testApp,
            "Step 4: Enable app in theme",
            step
          ),
      },
      {
        id: "test-app",
        content: (step: number) =>
          stepViewTab(
            "Test your widget",
            enableApplication,
            "Step 5: Test your widget",
            step
          ),
      },
    ],
    [step]
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Handle event skip boarding
  const onSkipBoarding = () => {
    dispatch(ApplicationActionTS.OnHandleMenuItem("dashboard", true));
    return navigate(UriProvider.KeepParameters("/"));
  };

  // On handle submit action follow tab
  const [actionFunc, setActionFunc] = React.useState<actionCallback | null>(
    () => () => false
  );
  const onsetActionFunc = (onSubmit: actionCallback) => {
    setActionFunc(() => onSubmit);
  };

  // Add default product for widget
  const [product, setProduct] = useState<TagProductType>({
    active: false,
  });

  // Handle next step with action callback func in tab
  const [isPending, setPending] = useState<boolean>(false);
  const onNextStep = useCallback(async () => {
    setPending(true);
    if (actionFunc) {
      const validate = actionFunc(widgetType);
      if (validate) {
        setStep(selectTabItem + 1);
        setSelectTabItem(selectTabItem + 1);
      }
      //Save changes all options from steps (Step 5)
      if (step >= 4) {
        let resp: any;
        const widgetIdGenerate = Guid.NewGuid();
        const requestCommon = {
          title: "my widget",
          id: widgetIdGenerate,
          disableShowItems: videoUnchecked,
          itemSorts: videoSorted,
          products: product.data
            ? [
                {
                  ...product.data,
                  productId: `${product.data.id}${widgetIdGenerate}`,
                },
              ]
            : [],
        };
        if (widgetType === WidgetType.Tiktok) {
          resp = await TikTokWidgetAPI.Create(
            new CreateWidgetRequest({
              ...tiktokReducer.settings,
              ...requestCommon,
              source: SourceTypeEnum.UserName,
              numberItems: AppSettingOnBoarding.LimitVideos,
            }),
            shopReducer.shop.domain
          );
          dispatch(WidgetActionTS.OnSetWidgetCount(1));
        } else {
          resp = await InstagramWidgetAPI.Create(
            new SetInstagramWidgetRequest({
              ...instagramReducer.settings,
              ...requestCommon,
              source: SourceTypeEnum.InstagramUserName,
              limitItems: AppSettingOnBoarding.LimitVideos,
            }),
            shopReducer.shop.domain
          );
          dispatch(InstagramWidgetActionTS.OnSetWidgetCount(1));
        }
        if (!resp.Status) {
          return toast.error(resp.Error);
        }
        return navigate(
          UriProvider.KeepParameters(
            widgetType === WidgetType.Instagram
              ? "/my-instagram-widget"
              : "/my-widget"
          )
        );
      }
    }
    setPending(false);
  }, [actionFunc, widgetType]);

  // tag product for widget
  const onSetProduct = (
    active?: boolean,
    productDto?: ProductResponse | null
  ) => {
    var productState = {
      ...product,
    };

    if (active !== undefined) {
      productState.active = active;
    }

    if (productDto !== undefined && productDto !== null) {
      productState.data = productDto;
    } else if (productDto === null) {
      productState.data = undefined;
    }
    setProduct(productState);
  };

  //Handle step enable application step 3
  const [enableApp, setEnableApp] = useState(false);
  const onSetEnableApp = useCallback(
    () => setEnableApp(true),
    [enableApp, setEnableApp]
  );

  //Undidmount clear setting on reducer store redux
  useEffect(() => {
    return () => {
      dispatch(WidgetActionTS.OnSetSetting(true));
      dispatch(InstagramWidgetActionTS.OnSetSetting(true));
    };
  }, []);

  return (
    <OnBoardingPresentation
      tabs={tabs()}
      selected={selectTabItem}
      handleTabChange={handleTabChange}
      onSkipBoarding={onSkipBoarding}
      step={step}
      onSetstep={onSetstep}
      onNext={onNextStep}
      setActionFunc={onsetActionFunc}
      widgetType={widgetType}
      setWidgetType={onSetType}
      product={product}
      setProduct={onSetProduct}
      enableApp={enableApp}
      setEnableApp={onSetEnableApp}
      setVideoUnChecked={setVideoUnShow}
      videoUnchecked={videoUnchecked}
      videoSorted={videoSorted}
      setVideoSorted={onSetVideoSortd}
      loadingNext={isPending}
    ></OnBoardingPresentation>
  );
}

export default OnBoardingContainer;
