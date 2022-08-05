import {
  Button,
  ButtonGroup,
  Card,
  ContextualSaveBar,
  Frame,
  Layout,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
} from "@shopify/polaris";
import { Container, ContainerSection } from "common/style/Utils.style";
import React, { useContext, useEffect, useState } from "react";
import {
  ButtonWidgetContainer,
  ButtonWidgetTiktok,
  ButtonWidgetWrapper,
  PreviewButtonWidget,
  ShowNotification,
} from "./ButtonWidgetStyle";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/reducers";
import Step3 from "./Step3";
import { ButtonWidgetActionTS } from "stores/ButtonWidget/action";
import { WidgetActionTS } from "stores/Widget/action";
import { ShopReponsitory } from "repositories/implements/ShopReponsitory";
import { ButtonPositionProvider } from "./ButtonWidgetType";
import { toastNotify } from "Dependencies/Toast";
import { ImageStorage } from "assets/images/ImageStorage";
import { ButtonWidgetContext } from "./ButtonWidgetContext";
import { ErrorMessage } from "common/constants/Validator";

function ButtonWidgetView() {
  const buttonWidget = useSelector(
    (state: RootReducer) => state.buttonWidgetReducer
  );

  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);

  const classFromPosition = () => {
    if (buttonWidget.position.top && buttonWidget.position.left)
      return "top-left";
    if (buttonWidget.position.top && buttonWidget.position.right)
      return "top-right";
    if (buttonWidget.position.bottom && buttonWidget.position.left)
      return "bottom-left";
    return "bottom-right";
  };

  const dispatch = useDispatch();

  const fetchShopConfiguration = () => {
    const shopReponsitory = new ShopReponsitory();
    shopReponsitory.GetConfiguration(shopReducer.shop?.domain).then((res) => {
      if (res) {
        dispatch(
          ButtonWidgetActionTS.OnSetOptional({
            step: 3,
            image: res.image ?? ImageStorage.ButtonTikTok[0],
            position: ButtonPositionProvider.Clone(res.buttonPosition),
            theme: res.theme,
            userName: res.tikTokUserName,
            id: res.id,
            isEnabled: res.isEnabled,
            timeZone: res.timezone,
          })
        );
      } else {
        dispatch(
          ButtonWidgetActionTS.OnSetOptional({
            step: 1,
            image: ImageStorage.ButtonTikTok[0],
          })
        );
      }
    });
  };

  useEffect(() => {
    if (shopReducer.shop?.domain) {
      fetchShopConfiguration();
    }
  }, [JSON.stringify(shopReducer.shop.domain)]);

  useEffect(() => {
    dispatch(WidgetActionTS.OnStep(0));
    dispatch(WidgetActionTS.OnSetSetting(true));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(
        ButtonWidgetActionTS.OnSetOptional({
          step: 0,
        })
      );
    };
  }, []);

  const [isPending, setIsPending] = useState(false);

  const [showNotify, setShowNotify] = useState(false);
  const [status, setStatus] = useState<"Enabled" | "Disabled" | "SaveChanges">(
    "Enabled"
  );

  const buttonWidgetContext = useContext(ButtonWidgetContext);
  const onUpdateConfiguration = () => {
    if (!buttonWidget.userName) {
      buttonWidgetContext.OnSetState(
        ErrorMessage.REQUIREMENTS.format("Tiktok Username")
      );
      return;
    }
    if (shopReducer.shop?.id) {
      setIsPending(true);
      const shopReponsitory = new ShopReponsitory();
      let statusBtn = true;
      let loadingTitle = `Enabling configuration for ${shopReducer.shop.domain}`;
      let successTitle = `Enabled succeed`;

      if (status === "Disabled") {
        statusBtn = false;
        loadingTitle = `Disabling configuration for ${shopReducer.shop.domain}`;
        successTitle = `Disabled succeed`;
      }
      if (status === "SaveChanges") {
        statusBtn = buttonWidget.isEnabled;
        loadingTitle = `Save Changing configuration for ${shopReducer.shop.domain}`;
        successTitle = `Save changed succeed`;
      }

      toastNotify.promise(
        shopReponsitory
          .Update(shopReducer.shop?.domain, {
            buttonPosition: ButtonPositionProvider.ToDtoV2(
              buttonWidget.position
            ),
            image: buttonWidget.image,
            tikTokUserName: buttonWidget.userName,
            theme: buttonWidget.theme,
            isEnabled: statusBtn,
          })
          .then((res) => {
            if (res.Status) {
              fetchShopConfiguration();
            }
            setShowNotify(false);
            setIsPending(false);
            setStatus("Enabled");
            return res;
          }),
        {
          loading: loadingTitle,
          success: () => successTitle,
        }
      );
    }
  };

  const onHandleNotify = () => {
    setShowNotify(!showNotify);
  };
  const onDisable = () => {
    setShowNotify(true);
    setStatus("Disabled");
  };

  const onSaveChanges = () => {
    setShowNotify(true);
    setStatus("SaveChanges");
  };

  return (
    <ButtonWidgetWrapper>
      <Container bg="#FDFDFD" flexDirection="column" pt={50} pl={60} pr={60}>
        <ContainerSection
          width={100}
          mb={40}
          pl={5}
          pr={5}
          pt={5}
          pb={5}
          bg="#F6F6F7"
        >
          <Card title="Flexible Tiktok Button" sectioned>
            <ContainerSection width={100} mb={20}>
              <p>
                This plugin allows you to display a static/animated floating
                Tiktok logo or
                <br /> Tikcode (on frontend) linked to your Tiktok account to
                increase your
                <br /> Tiktok followers
              </p>
            </ContainerSection>
            {buttonWidget.isEnabled ? (
              <ButtonGroup>
                <Button loading={isPending} onClick={onDisable}>
                  Disable App
                </Button>
              </ButtonGroup>
            ) : (
              <Button
                onClick={onUpdateConfiguration}
                primary
                loading={isPending}
                disabled={buttonWidget.step !== 3}
              >
                Enable App
              </Button>
            )}
          </Card>
        </ContainerSection>
        <ContainerSection
          width={100}
          mb={40}
          pl={5}
          pr={5}
          pt={5}
          pb={5}
          bg="#F6F6F7"
        >
          <ButtonWidgetContainer>
            <ContainerSection width={50} pr={7} bg="#F6F6F7">
              <Step1 onSaveChanges={onSaveChanges}></Step1>
              <Step2 onSaveChanges={onSaveChanges}></Step2>
            </ContainerSection>
            <ContainerSection width={50} pl={7} bg="#F6F6F7">
              <PreviewButtonWidget>
                <Card sectioned title="Preview">
                  <SkeletonPage primaryAction>
                    <Layout>
                      <Layout.Section>
                        <Container
                          justifyContent="flex-start"
                          flexDirection="row"
                        >
                          <ContainerSection width={20} mr={20}>
                            <SkeletonBodyText lines={1} />
                          </ContainerSection>
                          <ContainerSection width={20}>
                            <SkeletonBodyText lines={1} />
                          </ContainerSection>
                        </Container>
                      </Layout.Section>
                      <Layout.Section>
                        <ContainerSection width={100}>
                          <Card sectioned>
                            <SkeletonBodyText />
                          </Card>
                          <Card sectioned>
                            <TextContainer>
                              <SkeletonDisplayText size="small" />
                              <SkeletonBodyText />
                            </TextContainer>
                          </Card>
                        </ContainerSection>
                      </Layout.Section>
                      <ButtonWidgetTiktok className={classFromPosition()}>
                        <img src={buttonWidget.image} alt="Tiktok Feed Icon" />
                      </ButtonWidgetTiktok>
                    </Layout>
                  </SkeletonPage>
                </Card>
              </PreviewButtonWidget>
            </ContainerSection>
          </ButtonWidgetContainer>
        </ContainerSection>
        {buttonWidget.step === 3 && (
          <ContainerSection
            width={100}
            mb={100}
            pl={5}
            pr={5}
            pt={5}
            pb={5}
            bg="#F6F6F7"
          >
            <Step3></Step3>
          </ContainerSection>
        )}
      </Container>
      {showNotify && (
        <ShowNotification>
          <Frame>
            <ContextualSaveBar
              message="Unsaved changes"
              saveAction={{
                onAction: onUpdateConfiguration,
                loading: isPending,
                disabled: false,
              }}
              discardAction={{
                onAction: onHandleNotify,
              }}
            />
          </Frame>
        </ShowNotification>
      )}
    </ButtonWidgetWrapper>
  );
}

export default ButtonWidgetView;
