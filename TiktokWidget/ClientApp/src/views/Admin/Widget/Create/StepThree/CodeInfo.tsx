import { Icon } from "@shopify/polaris";
import { TickMinor, DuplicateMinor } from "@shopify/polaris-icons";
import { ContainerSection, LinkRouter } from "common/style/Utils.style";
import config from "config";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ApplicationActionTS } from "stores/Application/action";
import { RootReducer } from "stores/reducers";
import {
  ButtonWrapper,
  CopyButton,
  CopyContent,
  CopySelection,
  SupportHelperText,
} from "./StepThreeStyle";

function CodeInfo() {
  const { widgetId } = useParams();
  const script = `<div name="orichi" data-id="${widgetId}"></div>${config.script}`;

  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);
  const [isCopy, setCopy] = useState(false);
  const onCopy = () => {
    if (isCopy) return;
    setCopy(true);
    navigator.clipboard.writeText(script);
  };

  useEffect(() => {
    if (isCopy) {
      const timeout = setTimeout(() => setCopy(false), 4000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopy]);

  const dispatch = useDispatch();
  const onSetActiveMenu = () => {
    dispatch(ApplicationActionTS.OnHandleMenuItem("my-widget", true));
  };
  return (
    <ContainerSection width={40} pl={30} pt={30} pr={20}>
      <SupportHelperText
        fontSize={15}
        fontWeight={700}
        mb={25}
        textAlign="left"
      >
        Copy and paste this code into desired place of your website (HTML
        editor, website template, theme, etc)
      </SupportHelperText>
      <CopySelection>
        <CopyContent>
          <div>{script}</div>
          <CopyButton isCopy={isCopy} onClick={onCopy}>
            <Icon source={!isCopy ? DuplicateMinor : TickMinor}></Icon>
          </CopyButton>
        </CopyContent>
      </CopySelection>
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
          onClick={onSetActiveMenu}
          size="small"
          to={`/my-widget?shop=${shopReducer.shop.domain}`}
        >
          I have installed the code
        </LinkRouter>
      </ButtonWrapper>
    </ContainerSection>
  );
}

export default CodeInfo;
