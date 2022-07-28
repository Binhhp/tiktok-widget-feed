import { Button, Card, Select, SelectOption } from "@shopify/polaris";
import { Container, ContainerSection } from "common/style/Utils.style";
import config from "config";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShopReponsitory } from "repositories/implements/ShopReponsitory";
import { ButtonWidgetActionTS } from "stores/ButtonWidget/action";
import { ButtonWidgetStoreModel } from "stores/ButtonWidget/state";
import { RootReducer } from "stores/reducers";
import { IButtonWidgetProps } from "../ButtonWidgetModel";

function Step3(props: IButtonWidgetProps) {
  const buttonWidget = useSelector(
    (state: RootReducer) => state.buttonWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);
  const dispatch = useDispatch();
  const handleSelectChange = (value: string) => {
    if (buttonWidget.id) {
      props.onSaveChanges();
    }
    dispatch(
      ButtonWidgetActionTS.OnSetOptional({
        theme: value,
      })
    );
  };

  const [themes, setThemes] = useState<SelectOption[]>([]);
  useEffect(() => {
    new ShopReponsitory()
      .GetThemes(shopReducer.shop.domain ?? "")
      .then((res) => {
        let options: SelectOption[] = [];
        res.forEach((x) => {
          options.push({
            label: x.name,
            value: String(x.id),
          });
        });
        setThemes(options);
      });
  }, []);

  useEffect(() => {
    return () => {
      if (!buttonWidget.id) {
        dispatch(
          ButtonWidgetActionTS.OnSetOptional(new ButtonWidgetStoreModel())
        );
      }
    };
  }, []);

  const onPreviewTheme = () => {
    return window.open(
      `https://${shopReducer.shop.domain}/admin/themes/${buttonWidget.theme}/editor?context=apps&activateAppId=101884ef-09b7-4edf-8d4f-aad30b59c243%2Forichi-tiktok-embed`
    );
  };

  return (
    <Card title="Step 3: Installation" sectioned>
      <Container flexDirection="column">
        <p>
          Our app is supported on all templates. Select the theme to add our app
        </p>
        <Container mt={10} mb={10} flexDirection="row">
          <ContainerSection width={30} mr={15}>
            <Select
              label=""
              options={themes}
              onChange={handleSelectChange}
              value={buttonWidget.theme}
            />
          </ContainerSection>
          <Button onClick={onPreviewTheme} primary>
            Preview in theme
          </Button>
        </Container>
        <span>
          Please follow the instructions{" "}
          <a
            href={`${config.linkButtonWidget}`}
            rel="noreferrer"
            target="_blank"
          >
            here
          </a>
        </span>
      </Container>
    </Card>
  );
}

export default Step3;
