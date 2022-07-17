import styled from "styled-components";

export const LoaderBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  background: #fafafa;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  svg {
    width: 40px;
    height: 40px;
  }
`;

export const SnipperLoader = styled.div`
  width: 36px !important;
  height: 36px !important;
  max-width: 36px !important;
  max-height: 36px !important;
  svg {
    width: 36px !important;
    height: 36px !important;
    max-width: 36px !important;
    max-height: 36px !important;
  }
`;

export const ImageStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

export const ButtonViewMore = styled.button`
  background: #01f0ea;
  span svg {
    width: 23px;
    height: 23px;
    margin: 1px 20px;
  }
`;

export const LoadingInfiniteWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding: 20px 0px 10px 0px;
  ${ButtonViewMore} {
    border: none;
    padding: 0px 20px;
    color: #fafafa;
    cursor: pointer;
    h2 {
      margin: 5px 0px;
    }
    &:hover {
      background: #03e5df;
      color: #ffffff;
    }
  }
`;

// IconNetwork class

export interface IIconNetworkWrapper {
  status?: "enable" | "disable";
  width?: number;
  topPosition?: boolean;
  children: any;
}

export const IconNetworkWrapper = styled.div<IIconNetworkWrapper>`
  display: ${(props) =>
    props.status && props.status === "disable" ? "none" : "flex"};
  width: ${(props) => props.width || 15}px;
  height: ${(props) => props.width || 15}px;
  justify-content: stretch;
  border-radius: 5px;
  position: ${(props) => (props.topPosition ? "absolute" : "relative")};
  top: ${(props) => (props.topPosition ? "10px" : "none")};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  padding: 3px;
  background: #000000;
`;

interface IAbsoluteCenter {
  width?: number | string;
  zIndex?: number;
}
export const AbsoluteCenter = styled.div<IAbsoluteCenter>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${(props) => props.zIndex ?? 1};
  width: ${(props) =>
    props.width
      ? `${
          typeof props.width === "number"
            ? `${props.width}px`
            : `${props.width}`
        }`
      : "auto"};
`;
