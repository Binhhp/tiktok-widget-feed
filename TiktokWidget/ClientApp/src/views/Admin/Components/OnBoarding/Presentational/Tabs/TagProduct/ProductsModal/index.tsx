import {
  EmptySearchResult,
  Icon,
  Modal,
  Spinner,
  TextField,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import React, { useEffect, useState, useCallback } from "react";
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
} from "./ProductStyled";
import { IProductModalProps } from "./ProductModel";
import { useDispatch, useSelector } from "react-redux";
import { ProductResponse } from "repositories/dtos/responses/ProductResponse";
import Image from "ui-components/Image";
import LoadingInfinite from "ui-components/Loading/ButtonLoading";
import ProductAPI from "repositories/implements/ProductAPI";
import { Waypoint } from "react-waypoint";
import { RootReducer } from "stores/Admin/reducers";
import { WidgetActionTS } from "stores/Admin/TiktokWidget/action";

function ProductModal(props: IProductModalProps) {
  const [keyword, setKeyword] = useState("");

  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductResponse[]>([]);

  const widgetReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const [page, setPage] = useState({
    pageIndex: 1,
    count: 0,
  });

  const dispatch = useDispatch();

  const fetchProducts = useCallback(() => {
    ProductAPI.Get(page.pageIndex, shopReducer.shop.domain).then((res) => {
      setPage({
        count: res.count,
        pageIndex: page.pageIndex + 1,
      });
      dispatch(WidgetActionTS.OnSetTagProducts(res.data));
    });
  }, []);

  const onSetProductId = (key: string) => () => {
    if (key === productId) {
      setProductId("");
    } else {
      setProductId(key);
    }
  };

  useEffect(() => {
    if (props.productId) {
      setProductId(props.productId);
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
      dispatch(WidgetActionTS.OnSetTagProducts([], true));
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
    let products = productId
      ? widgetReducer.products.filter((x) => x.id === productId)
      : [];

    if (products.length > 0) {
      products = products.map((x) => {
        return { ...x, id: x.id };
      });
    }
    if (props.setProduct) {
      return props.setProduct(false, products[0] ?? undefined);
    }
  };

  const onClearButtonClick = () => onSearchResult("");

  const onCloseModal = () => {
    props.handleClose();
  };

  const onChangeRadioButton = (newValue: string) => () =>
    setProductId(newValue);

  const RenderTagProduct = products?.map((item, index) => (
    <ProductWrapper
      active={item.id === productId}
      onClick={onSetProductId(item.id)}
      shadow={(index + 1) % 2 === 0}
      key={index}
    >
      <ProductRadio>
        <input
          type="radio"
          checked={item.id === productId}
          onClick={onChangeRadioButton(item.id)}
          onChange={() => {}}
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
      title="Tag a product"
      onClose={onCloseModal}
      primaryAction={{
        content: "Next",
        onAction: onSaveChange,
        disabled: loading,
        id: "btn-save-onboarding",
      }}
      secondaryActions={[
        {
          content: "Back",
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
