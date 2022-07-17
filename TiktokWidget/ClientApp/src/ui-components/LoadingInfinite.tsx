import { ButtonViewMore, LoadingInfiniteWrapper } from "./UtilsStyle";
import React from "react";
import { SnipperLoading } from "./SnipperLoading";

export interface ILoadingInfiniteProps {
  viewMore?: string;
  onClickViewMore?: () => void;
  loading?: boolean;
}
function LoadingInfinite(props: ILoadingInfiniteProps) {
  return (
    <LoadingInfiniteWrapper>
      {props.viewMore ? (
        !props.loading ? (
          <ButtonViewMore onClick={props.onClickViewMore}>
            <h2>{props.viewMore}</h2>
          </ButtonViewMore>
        ) : (
          <SnipperLoading></SnipperLoading>
        )
      ) : (
        <SnipperLoading></SnipperLoading>
      )}
    </LoadingInfiniteWrapper>
  );
}

export default LoadingInfinite;
