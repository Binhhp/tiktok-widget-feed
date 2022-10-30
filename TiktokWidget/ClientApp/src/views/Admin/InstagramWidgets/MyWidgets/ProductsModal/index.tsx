import {
  EmptySearchResult,
  Icon,
  Modal,
  Spinner,
  TextField,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import React, { useEffect, useState } from "react";
import {
  LoadingTagProduct,
  ProductDesc,
  ProductImage,
  ProductModalWrapper,
  ProductRadio,
  ProductWrapper,
  TagProductContainer,
  TagProductSearch,
  TagProductSection,
} from "../MyWidgetStyle";
import { IProductModalProps } from "../MyWidgetType";
import { AddTagProductRequest } from "repositories/dtos/requests/AddTagProductRequest";
import { useDispatch, useSelector } from "react-redux";
import { BaseProduct } from "repositories/dtos/responses/BaseProduct";
import { toastNotify } from "Dependencies/Toast";
import Image from "ui-components/Image";
import LoadingInfinite from "ui-components/Loading/ButtonLoading";
import { ProductReponsitory } from "repositories/implements/ProductReponsitory";
import { Waypoint } from "react-waypoint";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { InstagramReponsitory } from "repositories/implements/InstagramReponsitory";

function ProductModal(props: IProductModalProps) {
  const [keyword, setKeyword] = useState("");

  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<BaseProduct[]>([]);

  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const [loadingSaveChanges, setLoadingSaveChanges] = useState(false);

  const [page, setPage] = useState({
    pageIndex: 1,
    count: 0,
  });

  const dispatch = useDispatch();

  const setupId = (id: string) => `${id}${props.widget.id}`;
  const fetchProducts = () => {
    const productReponsitory = new ProductReponsitory();
    productReponsitory
      .Get(page.pageIndex, shopReducer.shop.domain)
      .then((res) => {
        setPage({
          count: res.count,
          pageIndex: page.pageIndex + 1,
        });
        dispatch(InstagramWidgetActionTS.OnSetTagProducts(res.data));
      });
  };

  const onSetProductId = (key: string) => () => {
    if (setupId(key) === productId) {
      setProductId("");
    } else {
      setProductId(setupId(key));
    }
  };

  useEffect(() => {
    if (props.productId) {
      setProductId(`${props.productId}`);
    } else setProductId("");
  }, [props.productId]);

  useEffect(() => {
    if (shopReducer.shop.domain) {
      fetchProducts();
    }
  }, [shopReducer.shop.domain]);

  useEffect(() => {
    if (widgetReducer?.products) {
      setProducts(widgetReducer.products);
      setLoading(false);
    }
  }, [JSON.stringify(widgetReducer?.products)]);

  useEffect(() => {
    return () => {
      setProducts([]);
      setProductId("");
      dispatch(InstagramWidgetActionTS.OnSetTagProducts([], true));
    };
  }, []);

  const matchStateToTerm = (item: any, val: string) => {
    const regex = new RegExp(`${val.toLowerCase()}`);
    const title = item?.title.toLowerCase();
    return regex.test(title);
  };

  const onSearchResult = (val: string) => {
    setKeyword(val);
    if (widgetReducer.products) {
      const newProducts = val
        ? widgetReducer.products?.filter((item: any) =>
            matchStateToTerm(item, val)
          )
        : widgetReducer.products;
      setProducts(newProducts);
    }
  };

  const onSaveChange = async () => {
    setLoadingSaveChanges(true);
    const widgetReponsitory = new InstagramReponsitory();
    const loadingTitle = productId
      ? `Adding ${widgetReducer.products
          .filter((x) => setupId(x.id) === productId)[0]
          .title.substring(0, 16)}... for ${props.widget.widgetTitle}`
      : `Removing products for ${props.widget.widgetTitle}`;

    const successTitle = productId
      ? `Added ${widgetReducer.products
          .filter((x) => setupId(x.id) === productId)[0]
          .title.substring(0, 16)}... for ${props.widget.widgetTitle}`
      : `Removed products ${props.widget.widgetTitle}`;

    let products = productId
      ? widgetReducer.products.filter((x) => setupId(x.id) === productId)
      : [];

    if (products.length > 0) {
      products = products.map((x) => {
        return { ...x, id: setupId(x.id) };
      });
    }
    toastNotify
      .promise(
        widgetReponsitory.AddTagProducts(
          props.widget.id,
          new AddTagProductRequest(products)
        ),
        {
          loading: loadingTitle,
          success: () => successTitle,
        }
      )
      .then((res) => {
        if (res.Status) {
          props.onReloadData();
        }
        setProductId("");
        setLoadingSaveChanges(false);
      });
  };

  const onClearButtonClick = () => onSearchResult("");

  const onCloseModal = () => {
    setProductId("");
    props.handleClose();
  };

  const onChangeRadioButton = (newValue: string) => () =>
    setProductId(setupId(newValue));

  const RenderTagProduct = products?.map((item, index) => (
    <ProductWrapper
      active={setupId(item.id) === productId}
      onClick={onSetProductId(item.id)}
      shadow={(index + 1) % 2 === 0}
      key={index}
    >
      <ProductRadio>
        <input
          type="radio"
          checked={setupId(item.id) === productId}
          onClick={onChangeRadioButton(item.id)}
        />
      </ProductRadio>
      <ProductImage>
        <Image src={item.image} alt={item.title} />
      </ProductImage>
      <ProductDesc>{item.title}</ProductDesc>
    </ProductWrapper>
  ));

  const RenderLoading = (
    <LoadingTagProduct>
      <Spinner></Spinner>
    </LoadingTagProduct>
  );

  const RenderEmpty = (
    <LoadingTagProduct>
      <EmptySearchResult
        title={"No tag products yet"}
        description={"Try changing the filters or search term"}
        withIllustration
      ></EmptySearchResult>
    </LoadingTagProduct>
  );

  const RenderWaypoint = (
    <>
      <Waypoint onEnter={fetchProducts}></Waypoint>
      <LoadingInfinite></LoadingInfinite>
    </>
  );
  return (
    <Modal
      loading={loading}
      open={props.active}
      title="Add products"
      onClose={onCloseModal}
      primaryAction={{
        content: "Save",
        onAction: onSaveChange,
        loading: loadingSaveChanges,
        disabled: loading,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onCloseModal,
        },
      ]}
    >
      <ProductModalWrapper id="scrollableDiv">
        <TagProductContainer>
          <TagProductSearch>
            <TextField
              prefix={<Icon source={SearchMinor} color="base" />}
              value={keyword}
              onChange={onSearchResult}
              label=""
              autoComplete="off"
              placeholder="Search Product"
              clearButton
              onClearButtonClick={onClearButtonClick}
            ></TextField>
          </TagProductSearch>
          <TagProductSection>
            {loading
              ? RenderLoading
              : products?.length > 0
              ? RenderTagProduct
              : RenderEmpty}
          </TagProductSection>
        </TagProductContainer>
        {page.pageIndex < page.count + 1 && !keyword && RenderWaypoint}
      </ProductModalWrapper>
    </Modal>
  );
}

export default ProductModal;
