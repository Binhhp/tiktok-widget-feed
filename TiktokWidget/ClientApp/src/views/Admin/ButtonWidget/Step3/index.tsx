import { Button, Card, Select } from "@shopify/polaris";
import { Container, ContainerSection } from "common/style/Utils.style";
import config from "config";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonWidgetActionTS } from "stores/ButtonWidget/action";
import { RootReducer } from "stores/reducers";

function Step3() {
  const options = [
    {
      label: "Dawn",
      value: "dawn",
    },
    {
      label: "Dawn 2",
      value: "dawn2",
    },
  ];
  const dispatch = useDispatch();
  const handleSelectChange = (value: string) => {
    dispatch(
      ButtonWidgetActionTS.OnSetOptional({
        theme: value,
      })
    );
  };

  const buttonWidget = useSelector(
    (state: RootReducer) => state.buttonWidgetReducer
  );
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
              options={options}
              onChange={handleSelectChange}
              value={buttonWidget.theme}
            />
          </ContainerSection>
          <Button primary>Preview in theme</Button>
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
