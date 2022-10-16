import { Button, Card } from "@shopify/polaris";
import { ContainerSection, LinkRouter } from "common/style/UtilStyles";
import config from "config";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootReducer } from "stores/Admin/reducers";
import {
  ButtonWrapper,
  CardBody,
  SectionWrapper,
  SupportHelperText,
} from "./StepThreeStyle";
function SectionInfo() {
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  const navigate = useNavigate();

  const onEnableSection = () => {
    window.open(
      `https://${shopReducer.shop.domain}/admin/themes/current/editor`
    );
    return navigate(`/my-widget?shop=${shopReducer.shop.domain}`);
  };
  return (
    <ContainerSection width={40} pl={30} pt={30} pr={20}>
      <CardBody>
        <Card sectioned>
          <SectionWrapper>
            <p>Enable the section</p>
            <Button onClick={onEnableSection} primary>
              Enable
            </Button>
          </SectionWrapper>
        </Card>
      </CardBody>
      <SupportHelperText
        fontSize={13}
        mb={40}
        textAlign="left"
        fontStyle="italic"
      >
        Please contact use{" "}
        <a
          style={{ textDecoration: "none" }}
          href={config.helperUrl}
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>{" "}
        If you need any further assistance we'll be happy to support
      </SupportHelperText>
      <ButtonWrapper>
        <LinkRouter
          size="small"
          to={`/my-widget?shop=${shopReducer.shop.domain}`}
        >
          I've done
        </LinkRouter>
      </ButtonWrapper>
    </ContainerSection>
  );
}

export default SectionInfo;
