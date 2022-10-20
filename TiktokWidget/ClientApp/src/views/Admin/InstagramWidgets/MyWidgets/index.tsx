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
import { BaseInstagramWidget } from "repositories/dtos/responses/BaseInstagramWidget";
import { BaseProduct } from "repositories/dtos/responses/BaseProduct";
import { BaseTikTokWidget } from "repositories/dtos/responses/BaseTikTokWidget";
import { InstagramReponsitory } from "repositories/implements/InstagramReponsitory";
import { ShopReponsitory } from "repositories/implements/ShopReponsitory";
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
import ProductModal from "./ProductsModal";

function MyWidget() {
  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );

  const [modal, setModal] = useState({
    active: false,
    widget: {},
    productId: "",
  });

  const [reload, setReload] = useState<number>(0);
  const handleChange =
    (products: BaseProduct[], widget: BaseInstagramWidget) => () => {
      setModal({
        ...modal,
        active: !modal.active,
        widget: widget,
        productId: products[0]?.id ?? "",
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
    return new InstagramReponsitory().GetById(item?.id).then((res) => {
      if (res?.Status) {
        const result = res.Data as BaseInstagramWidget;
        const dto = new InstagramWidget(result).ToDto();
        dispatch(InstagramWidgetActionTS.OnStep(1));
        dispatch(InstagramWidgetActionTS.OnSetSetting(dto));
        onClickToCreateWidget();
        navigate(
          `/instagram-step-1?shop=${shopReducer.shop.domain}&key=${result.id}`
        );
      }
      return res.Status;
    });
  };
  const onDelete = async (item: any) => {
    const widgetReponsitory = new InstagramReponsitory();
    await toastNotify.promise(widgetReponsitory.Delete(item?.id), {
      loading: `Deleting ${item?.widgetTitle} widget`,
      success: (data: any) => `Deleted ${item?.widgetTitle} widget`,
    });
  };

  const [timeZone, setTimeZone] = useState<string | undefined>("UTC");
  const fetchData = async (pageIndex: number) => {
    const widgetReponsitory = new InstagramReponsitory();
    const shopReponsitory = new ShopReponsitory();
    const config = await shopReponsitory.GetConfiguration(
      shopReducer.shop?.domain
    );
    if (config) setTimeZone(config?.timezone);
    return widgetReponsitory.Get(pageIndex, shopReducer.shop.domain);
  };

  useEffect(() => {
    dispatch(ApplicationActionTS.OnHandleMenuItem("my-instagram-widget", true));
    dispatch(InstagramWidgetActionTS.OnStep(0));
    dispatch(InstagramWidgetActionTS.OnSetSetting(true));
  }, []);

  useEffect(() => {
    if (!widgetReducer.count)
      return navigate(`/instagram-step-1?shop=${shopReducer.shop.domain}`);
  }, [widgetReducer.count]);

  const onReloadData = () => {
    handleClose();
    setReload(Math.floor(Math.random() * 1000));
  };

  const RenderTagProduct = (
    products: BaseProduct[],
    widget: BaseInstagramWidget
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

  return (
    <MyWidgetWrapper>
      <Container bg="transparent" flexDirection="column">
        <ContainerSection bg="transparent" width={100} mb={30}>
          <MyWidgetHeader>
            <h2>My Widget</h2>
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
