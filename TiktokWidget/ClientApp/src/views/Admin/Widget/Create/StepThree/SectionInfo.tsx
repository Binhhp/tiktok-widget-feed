import { Button, Card } from "@shopify/polaris";
import { ContainerSection, LinkRouter } from "common/style/Utils.style";
import config from "config";
import React from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/reducers";
import {
  ButtonWrapper,
  CardBody,
  SectionWrapper,
  SupportHelperText,
} from "./StepThreeStyle";
function SectionInfo() {
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);
  return (
    <ContainerSection width={40} pl={30} pt={30} pr={20}>
      <CardBody>
        <Card sectioned>
          <SectionWrapper>
            <p>Enable the section</p>
            <Button primary>Enable</Button>
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
