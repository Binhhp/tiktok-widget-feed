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
import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetWidgetItemsManagerRequest } from "repositories/dtos/requests/SetWidgetItemsManagerRequest";
import { InstagramWidgetResponse } from "repositories/dtos/responses/InstagramWidgetResponse";
import { ProductResponse } from "repositories/dtos/responses/ProductResponse";
import InstagramWidgetAPI from "repositories/implements/InstagramWidgetAPI";
import ShopAPI from "repositories/implements/ShopAPI";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { InstagramWidget } from "stores/Admin/InstagramWidget/state";
import { RootReducer } from "stores/Admin/reducers";
import {
  MyWidgetHeader,
  MyWidgetWrapper,
  TagProductSelected,
  TagProductSelectedIcon,
  TimeZoneColumn,
} from "./MyWidgetStyle";
import { MyWidgetState } from "./MyWidgetType";
import ProductModal from "./ProductsModal";
import InstagramVideoPreview from "Dependencies/InstagramLayout/VideoManager";

function MyWidget() {
  //Config information modal
  const [modal, setModal] = useState<MyWidgetState>({
    active: false,
    productId: "",
    activeVideos: false,
  });

  //Reload datatables
  const [reload, setReload] = useState<number>(0);

  const onSaveChangeProductInfo =
    (products: ProductResponse[], widget: InstagramWidgetResponse) => () => {
      setModal({
        ...modal,
        active: !modal.active,
        widget: widget,
        productId: products[0]?.productId ?? "",
      });
    };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const instagramWidgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  useLayoutEffect(() => {
    if (!instagramWidgetReducer.count) {
      return navigate(UriProvider.KeepParameters(`/instagram-step-1`));
    }
  }, [instagramWidgetReducer.count]);

  const handleClose = () =>
    setModal({
      ...modal,
      active: !modal.active,
      productId: "",
    });
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const onUpdate = (item: any) => {
    getDetailWidget(item?.id);
    dispatch(InstagramWidgetActionTS.OnStep(1));
    onClickToCreateWidget();
    navigate(
      `/instagram-step-1?shop=${shopReducer.shop.domain}&key=${item.id}`
    );
  };

  const getDetailWidget = (key: string) => {
    return InstagramWidgetAPI.GetById(key).then((res) => {
      if (res?.Status) {
        const result = res.Data as InstagramWidgetResponse;
        const dto = new InstagramWidget(result).ToDto();
        dispatch(InstagramWidgetActionTS.OnSetSetting(dto));
      }
    });
  };

  const onDelete = async (item: any) => {
    await toastNotify.promise(InstagramWidgetAPI.Delete(item?.id), {
      loading: `Deleting ${item?.widgetTitle} widget`,
      success: (data: any) => `Deleted ${item?.widgetTitle} widget`,
    });
  };

  const [timeZone, setTimeZone] = useState<string | undefined>("UTC");
  const fetchData = async (pageIndex: number) => {
    const config = await ShopAPI.GetConfiguration(shopReducer.shop?.domain);
    if (config) setTimeZone(config?.timezone);
    return InstagramWidgetAPI.Get(pageIndex, shopReducer.shop.domain);
  };

  const onReloadData = () => {
    handleClose();
    setReload(Math.floor(Math.random() * 1000));
  };

  const RenderTagProduct = (
    products: ProductResponse[],
    widget: InstagramWidgetResponse
  ) => (
    <TagProductSelected onClick={onSaveChangeProductInfo(products, widget)}>
      <span>{products.length} selected</span>
      <TagProductSelectedIcon>
        <Icon source={ProductsMinor}></Icon>
      </TagProductSelectedIcon>
    </TagProductSelected>
  );

  const onSaveChangesVideoManager = (item: InstagramWidgetResponse) => () => {
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
            {DateTimeFormatter.onFormatDateTimeUTC(
              new Date(item?.createDate),
              timeZone
            )}
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
      title: "Posts",
      fieldName: "numberItems",
      onRender: (item: any) => {
        const widget = item as InstagramWidgetResponse;
        let videos = widget.videos;
        if (widget?.setting.limitItems && widget.setting.limitItems < videos) {
          videos = widget.setting.limitItems;
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
            onClick={onSaveChangesVideoManager(item)}
            className="number-items"
          >
            {videos} posts
          </div>
        );
      },
    },
  ];

  const onClickToCreateWidget = () => {
    dispatch(ApplicationActionTS.OnHandleMenuItem("create-widget", true));
  };

  useEffect(() => {
    return () => {
      dispatch(InstagramWidgetActionTS.OnChangStatus());
    };
  }, []);

  const onSetCount = (count: number) =>
    dispatch(InstagramWidgetActionTS.OnSetWidgetCount(count));

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
        const resp = await InstagramWidgetAPI.SetWidgetItemsManager(
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
      <Container bg="transparent" flexDirection="column">
        <ContainerSection bg="transparent" width={100} mb={30}>
          <MyWidgetHeader>
            <h2>My Widget</h2>
            <LinkRouter
              onClick={onClickToCreateWidget}
              size="small"
              to={UriProvider.KeepParameters("/instagram-step-1")}
            >
              Create new widget
            </LinkRouter>
          </MyWidgetHeader>
        </ContainerSection>
        <ContainerSection bg="transparent" height={100} width={100}>
          {shopReducer.shop.domain && (
            <DataTables
              columns={WidgetColumns}
              queryData={fetchData}
              onDelete={onDelete}
              onUpdate={onUpdate}
              reload={reload}
              onSetCount={onSetCount}
              addToStore={{
                divName: "orichi-instagram",
                isShow: true,
                script: config.SCRIPTS.INSTAGRAM,
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
        <InstagramVideoPreview
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
            limitItems: modal.widget?.setting?.limitItems,
          }}
        />
      )}
    </MyWidgetWrapper>
  );
}

export default MyWidget;
