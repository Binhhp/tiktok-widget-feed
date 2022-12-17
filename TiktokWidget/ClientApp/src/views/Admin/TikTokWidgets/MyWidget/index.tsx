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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BaseProduct } from "repositories/dtos/responses/BaseProduct";
import { BaseTikTokWidget } from "repositories/dtos/responses/BaseTikTokWidget";
import TikTokWidgetAPI from "repositories/implements/TikTokWidgetAPI";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import {
  MyWidgetHeader,
  MyWidgetWrapper,
  TagProductSelected,
  TagProductSelectedIcon,
  TimeZoneColumn,
} from "./MyWidgetStyle";
import ProductModal from "./ProductsModal";

function MyWidget() {
  const [modal, setModal] = useState({
    active: false,
    widget: {},
    productId: "",
  });

  const [reload, setReload] = useState<number>(0);
  const handleChange =
    (products: BaseProduct[], widget: BaseTikTokWidget) => () => {
      setModal({
        ...modal,
        active: !modal.active,
        widget: widget,
        productId: products[0]?.productId ?? "",
      });
    };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () =>
    setModal({
      active: !modal.active,
      widget: {},
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

  useEffect(() => {
    Promise.all([
      dispatch(ApplicationActionTS.OnHandleMenuItem("my-widget", true)),
      dispatch(WidgetActionTS.OnStep(0)),
      dispatch(WidgetActionTS.OnSetSetting(true)),
    ]);
  }, []);

  const onReloadData = () => {
    handleClose();
    setReload(Math.floor(Math.random() * 1000));
  };

  const RenderTagProduct = (
    products: BaseProduct[],
    widget: BaseTikTokWidget
  ) => (
    <TagProductSelected onClick={handleChange(products, widget)}>
      <span>{products.length} selected</span>
      <TagProductSelectedIcon>
        <Icon source={ProductsMinor}></Icon>
      </TagProductSelectedIcon>
    </TagProductSelected>
  );

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
  ];

  const onClickToCreateWidget = () => {
    dispatch(ApplicationActionTS.OnHandleMenuItem("create-widget", true));
  };

  const onSetCount = (count: number) =>
    dispatch(WidgetActionTS.OnSetWidgetCount(count));
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
        widget={modal.widget as BaseTikTokWidget}
        handleClose={handleClose}
        onReloadData={onReloadData}
      ></ProductModal>
    </MyWidgetWrapper>
  );
}

export default MyWidget;
