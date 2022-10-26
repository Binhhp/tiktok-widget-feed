import { Spinner } from "@shopify/polaris";
import React from "react";
import styled from "styled-components";

interface ICircleLoading {
  size?: "small" | "large";
}
function CircleLoading(props: ICircleLoading) {
  return (
    <DivLoad>
      <Spinner size={props.size ?? "large"} />
    </DivLoad>
  );
}

const DivLoad = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default CircleLoading;
