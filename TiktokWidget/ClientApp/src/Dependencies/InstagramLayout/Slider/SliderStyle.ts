import styled from "styled-components";

export const DivSliderWrapper = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  .orichi-instagram-slider {
    position: relative;
  }
  .swiper-button-next {
    background-color: #000000;
    right: -23px;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    &:after {
      font-size: 13px;
      color: #ffffff;
      font-weight: 900;
      margin-right: 21px;
    }
  }
  .swiper-button-prev {
    background-color: #000000;
    left: -23px;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    &:after {
      font-size: 13px;
      color: #ffffff;
      font-weight: 900;
      margin-left: 21px;
    }
  }
`;
