import { ButtonViewMore, LoadingInfiniteWrapper } from "../UtilsStyle";
import React from "react";
import SniperLoading from "./SniperLoading";

export interface ILoadingInfiniteProps {
  viewMore?: string;
  onClickViewMore?: () => void;
  loading?: boolean;
  color?: string;
  customButton?: any;
}
function ButtonLoading(props: ILoadingInfiniteProps) {
  return (
    <LoadingInfiniteWrapper>
      {props.viewMore ? (
        !props.loading ? (
          props.customButton ? (
            props.customButton
          ) : (
            <ButtonViewMore onClick={props.onClickViewMore}>
              <h2 className="viewmore">{props.viewMore}</h2>
            </ButtonViewMore>
          )
        ) : (
          <SniperLoading color={props.color}></SniperLoading>
        )
      ) : (
        <SniperLoading color={props.color}></SniperLoading>
      )}
    </LoadingInfiniteWrapper>
  );
}

export default ButtonLoading;
