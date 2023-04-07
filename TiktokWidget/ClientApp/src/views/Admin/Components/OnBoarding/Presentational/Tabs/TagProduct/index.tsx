import { Button, Icon } from "@shopify/polaris";
import React, { useEffect } from "react";
import { TabProps } from "../../../OnBoardingModel";
import { TabProductWrapper } from "../TabStyled";
import { PlusMinor } from "@shopify/polaris-icons";
import ProductModal from "./ProductsModal";
import { DeleteMinor } from "@shopify/polaris-icons";
import Image from "ui-components/Image";

function TagProductController(props: TabProps) {
  const onNextStep = () => true;
  const handleClose = () => {
    if (props.setProduct) props.setProduct(false);
  };
  const handleOpen = () => {
    if (props.setProduct) {
      props.setProduct(true);
    }
  };
  useEffect(() => {
    props.setActionFunc(onNextStep);
  }, []);

  const renderAddTagProduct = () => {
    return (
      <>
        <h2>Tag a product</h2>
        <div className="desc">
          <span>
            Upload your store’s logo, change colors and fonts, and more.
          </span>
        </div>
        <div className="add-product">
          <Button onClick={handleOpen} icon={PlusMinor}>
            Tag a product
          </Button>
        </div>
      </>
    );
  };

  const removeProduct = () => {
    if (props.setProduct) {
      props.setProduct(false, null);
    }
  };
  const renderShowProduct = () => {
    return (
      <>
        <div className="product-content">
          <div className="product-img">
            <Image
              src={props.product?.data?.image}
              alt={props.product?.data?.title}
            />
          </div>
          <div className="product-info">
            <h2>{props.product?.data?.title}</h2>
            <span onClick={removeProduct} className="btn-delete">
              <Icon source={DeleteMinor} />
            </span>
          </div>
        </div>
        <div className="add-product mt-20 selected-item">
          <Button onClick={handleOpen} icon={PlusMinor}>
            1 selected
          </Button>
        </div>
      </>
    );
  };
  return (
    <TabProductWrapper>
      {props.product?.data !== undefined
        ? renderShowProduct()
        : renderAddTagProduct()}
      <ProductModal
        productId={props.product?.data?.id ?? ""}
        active={props.product?.active ?? false}
        handleClose={handleClose}
        setProduct={props.setProduct}
      ></ProductModal>
    </TabProductWrapper>
  );
}

export default React.memo(TagProductController);
