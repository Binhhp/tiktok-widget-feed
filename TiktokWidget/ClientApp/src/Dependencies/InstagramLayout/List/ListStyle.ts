import styled from "Dependencies/StyledComponents/Container";

export const ListWrapper = styled("div", "wrapper", "orichi-instagram")`
  &.orichi-instagram-wrapper {
    width: 100%;
    height: auto;
    position: relative;
  }
`;

export const DivLoadmore = styled("div", "loadmore", "orichi-instagram")`
  &.orichi-instagram-loadmore {
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: center;
  }
`;

interface IButtonLoadmore {
  bg?: string;
}

export const ButtonLoadmore = styled(
  "button",
  "btn__loadmore",
  "orichi-instagram"
)<IButtonLoadmore>`
  &.orichi-instagram-btn__loadmore {
    background: ${(props) =>
      props.bg ??
      "linear-gradient(90.43deg, #1877F2 -127.39%, #CE00F2 -41.29%, #FF5656 86.62%, #FF6C00 210.4%);"};
    border-radius: 80px;
    padding: 12px 37px;
    cursor: pointer;
    color: #ffffff;
    font-family: "SF Pro Display";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 15px;
    margin: 0px;
    border: none;
  }
`;
