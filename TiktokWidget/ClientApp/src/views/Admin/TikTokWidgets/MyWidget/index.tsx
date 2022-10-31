import { Icon } from "@shopify/polaris";
import { ProductsMinor } from "@shopify/polaris-icons";
import { DateTimeFormatter } from "common/functions/DateTimeFormat";
import { Container, ContainerSection } from "common/style/UtilStyles";
import DataTables from "Dependencies/DataTables";
import { IColumnProvider } from "Dependencies/DataTables/DataTablesType";
import { toastNotify } from "Dependencies/Toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BaseProduct } from "repositories/dtos/responses/BaseProduct";
import { BaseTikTokWidget } from "repositories/dtos/responses/BaseTikTokWidget";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import { SettingProviderWidget } from "stores/Admin/Widget/state";
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
    return new WidgetReponsitory().GetById(item?.id).then((res) => {
      if (res?.Status) {
        const result = res.Data as BaseTikTokWidget;
        const dto = new SettingProviderWidget(result).ToDto();
        dispatch(WidgetActionTS.OnStep(2));
        dispatch(WidgetActionTS.OnSetSetting(dto));
        onClickToCreateWidget();
        navigate(
          `/create-widget-step-2/${item.id}?shop=${shopReducer.shop.domain}&key=${result.id}`
        );
      }
      return res.Status;
    });
  };
  const onDelete = async (item: any) => {
    const widgetReponsitory = new WidgetReponsitory();
    await toastNotify.promise(widgetReponsitory.Delete(item?.id), {
      loading: `Deleting ${item?.widgetTitle} widget`,
      success: (data: any) => `Deleted ${item?.widgetTitle} widget`,
    });
  };

  const fetchData = async (pageIndex: number) => {
    const widgetReponsitory = new WidgetReponsitory();
    return widgetReponsitory.Get(pageIndex, shopReducer.shop.domain);
  };

  useEffect(() => {
    dispatch(ApplicationActionTS.OnHandleMenuItem("my-widget", true));
    dispatch(WidgetActionTS.OnStep(0));
    dispatch(WidgetActionTS.OnSetSetting(true));
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
            {/* <LinkRouter
              onClick={onClickToCreateWidget}
              size="small"
              to={`/create-widget-step-1?shop=${shopReducer.shop.domain}`}
            >
              Create new widget
            </LinkRouter> */}
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
