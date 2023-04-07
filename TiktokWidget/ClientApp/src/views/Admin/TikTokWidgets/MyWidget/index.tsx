import { Icon } from "@shopify/polaris";
import { ProductsMinor } from "@shopify/polaris-icons";
import { DateTimeFormatter } from "common/functions/DateTimeFormat";
import { UriProvider } from "common/functions/FuncUtils";
import {
  Container,
  ContainerSection,
  LinkRouter,
} from "common/style/UtilStyles";
import config from "config";
import DataTables from "Dependencies/DataTables";
import { IColumnProvider } from "Dependencies/DataTables/DataTablesType";
import { toastNotify } from "Dependencies/Toast";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProductResponse } from "repositories/dtos/responses/ProductResponse";
import { TiktokWidgetResponse } from "repositories/dtos/responses/TiktokWidgetResponse";
import TikTokWidgetAPI from "repositories/implements/TikTokWidgetAPI";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/TiktokWidget/action";
import {
  MyWidgetHeader,
  MyWidgetWrapper,
  TagProductSelected,
  TagProductSelectedIcon,
  TimeZoneColumn,
} from "./MyWidgetStyle";
import ProductModal from "./ProductsModal";
import TiktokVideoPreview from "Dependencies/TikTokLayout/VideoManager";
import { MyWidgetState } from "./MyWidgetType";
import { SetWidgetItemsManagerRequest } from "repositories/dtos/requests/SetWidgetItemsManagerRequest";

function MyWidget() {
  const tiktokWidgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );
  const instagramWidgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const [modal, setModal] = useState<MyWidgetState>({
    active: false,
    productId: "",
    activeVideos: false,
  });

  const [reload, setReload] = useState<number>(0);
  const handleChange =
    (products: ProductResponse[], widget: TiktokWidgetResponse) => () => {
      setModal({
        ...modal,
        active: !modal.active,
        widget: widget,
        productId: products[0]?.productId ?? "",
      });
    };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!tiktokWidgetReducer.count && !instagramWidgetReducer.count)
      return navigate(UriProvider.KeepParameters(`/create-widget`));
  }, [tiktokWidgetReducer.count, instagramWidgetReducer.count]);

  const handleClose = () =>
    setModal({
      ...modal,
      active: !modal.active,
      productId: "",
    });
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  const onUpdate = (item: any) => {
    onClickToCreateWidget();
    return navigate(
      UriProvider.KeepParameters(`/create-widget-step-2/${item.id}`)
    );
  };
  const onDelete = async (item: any) => {
    await toastNotify.promise(TikTokWidgetAPI.Delete(item?.id), {
      loading: `Deleting ${item?.widgetTitle} widget`,
      success: (data: any) => `Deleted ${item?.widgetTitle} widget`,
    });
  };

  const fetchData = async (pageIndex: number) => {
    return TikTokWidgetAPI.Get(pageIndex, shopReducer.shop.domain);
  };

  const onReloadData = () => {
    handleClose();
    setReload(Math.floor(Math.random() * 1000));
  };

  const RenderTagProduct = (
    products: ProductResponse[],
    widget: TiktokWidgetResponse
  ) => (
    <TagProductSelected onClick={handleChange(products, widget)}>
      <span>{products.length} selected</span>
      <TagProductSelectedIcon>
        <Icon source={ProductsMinor}></Icon>
      </TagProductSelectedIcon>
    </TagProductSelected>
  );

  const onHandleModalVideoManager = (item: TiktokWidgetResponse) => () => {
    if (modal.activeVideos) {
      setModal({
        ...modal,
        activeVideos: false,
        widget: undefined,
      });
    } else {
      setModal({
        ...modal,
        activeVideos: true,
        widget: item,
      });
    }
  };

  const WidgetColumns: IColumnProvider[] = [
    {
      title: "Widget Title",
      fieldName: "widgetTitle",
      onRender: (item: any) => {
        return <span>{item.widgetTitle}</span>;
      },
    },
    {
      title: "Last modified",
      fieldName: "createDate",
      onRender: (item: any) => {
        return (
          <TimeZoneColumn>
            {DateTimeFormatter.onFormatDateTimeUTC(new Date(item?.createDate))}
          </TimeZoneColumn>
        );
      },
    },
    {
      title: "Tag product",
      fieldName: "products",
      onRender: (item: any) => {
        return RenderTagProduct(item?.products, item);
      },
    },
    {
      title: "Videos",
      fieldName: "numberItems",
      onRender: (item: any) => {
        const widget = item as TiktokWidgetResponse;
        let videos = widget.videos;
        if (
          widget?.setting.numberItems &&
          widget.setting.numberItems < videos
        ) {
          videos = widget.setting.numberItems;
        }

        if (widget.disableShowItems && widget.itemSorts) {
          const extractItems = widget.itemSorts.filter(
            (x) => !widget.disableShowItems?.includes(x)
          ).length;
          if (extractItems < videos) {
            videos = extractItems;
          }
        }
        return (
          <div
            onClick={onHandleModalVideoManager(item)}
            className="number-items"
          >
            {videos} videos
          </div>
        );
      },
    },
  ];

  const onClickToCreateWidget = () => {
    dispatch(ApplicationActionTS.OnHandleMenuItem("create-widget", true));
  };

  const onSetCount = (count: number) =>
    dispatch(WidgetActionTS.OnSetWidgetCount(count));

  const onHandleModal = useCallback(
    async (
      videoUnchecked: string[],
      itemSorted: string[],
      disableTopNewItems?: boolean
    ) => {
      if (modal.widget && itemSorted && itemSorted.length > 0) {
        const req: SetWidgetItemsManagerRequest = {
          DisableShowItems: videoUnchecked,
          ItemSorts: itemSorted,
        };
        if (disableTopNewItems) {
          req.DisableTopNewItems = disableTopNewItems;
        }
        const resp = await TikTokWidgetAPI.SetWidgetItemsManager(
          modal.widget?.id ?? "",
          req
        );
        if (!resp.Status) {
          toastNotify.error({
            message: resp.Error,
          });
        } else {
          onReloadData();
          toastNotify.success({
            message: `Set ${modal.widget.widgetTitle} successfully`,
          });
        }
      }

      onCloseModal();
    },
    [modal.activeVideos]
  );

  const onCloseModal = () => {
    setModal({
      ...modal,
      activeVideos: false,
      widget: undefined,
    });
  };

  return (
    <MyWidgetWrapper>
      <Container flexDirection="column">
        <ContainerSection width={100} mb={30}>
          <MyWidgetHeader>
            <h2>My Widgets</h2>
            <LinkRouter
              onClick={onClickToCreateWidget}
              size="small"
              to={UriProvider.KeepParameters("/create-widget-step-1")}
            >
              Create new widget
            </LinkRouter>
          </MyWidgetHeader>
        </ContainerSection>
        <ContainerSection height={100} width={100}>
          {shopReducer.shop.domain && (
            <DataTables
              columns={WidgetColumns}
              queryData={fetchData}
              onDelete={onDelete}
              onUpdate={onUpdate}
              reload={reload}
              onSetCount={onSetCount}
              addToStore={{
                divName: "orichi",
                isShow: true,
                script: config.SCRIPTS.TIKTOK,
              }}
            ></DataTables>
          )}
        </ContainerSection>
      </Container>
      <ProductModal
        productId={modal.productId}
        active={modal.active}
        widget={modal.widget}
        handleClose={handleClose}
        onReloadData={onReloadData}
      ></ProductModal>

      {modal.widget && (
        <TiktokVideoPreview
          videoUncheckedDefault={
            (modal.widget && modal.widget.disableShowItems) ?? []
          }
          onCloseModal={onCloseModal}
          active={modal.activeVideos}
          onSaveChanges={onHandleModal}
          hiddenButtonBack
          buttonSaveText="Save"
          optionsShowItem={{
            valueSource: modal.widget.valueSource,
            sourceType: modal.widget.sourceType,
            disableTopNewItems:
              modal.widget.setting?.disableTopNewItems ?? false,
            widgetId: modal.widget?.id,
            limitItems: modal.widget?.setting?.numberItems,
          }}
        />
      )}
    </MyWidgetWrapper>
  );
}

export default MyWidget;
