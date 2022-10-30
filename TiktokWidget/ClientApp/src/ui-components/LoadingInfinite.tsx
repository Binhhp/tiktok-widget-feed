import { ButtonViewMore, LoadingInfiniteWrapper } from "./UtilsStyle";
import React from "react";
import TikTokLoader from "./TikTokLoader";

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
            <h2 className="viewmore">{props.viewMore}</h2>
          </ButtonViewMore>
        ) : (
          <TikTokLoader></TikTokLoader>
        )
      ) : (
        <TikTokLoader></TikTokLoader>
      )}
    </LoadingInfiniteWrapper>
  );
}

export default LoadingInfinite;
