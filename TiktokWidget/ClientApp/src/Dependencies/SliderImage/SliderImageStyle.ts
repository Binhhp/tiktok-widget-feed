import styled from "Dependencies/StyledComponents/Container";

export const SliderImageWrapper = styled("div", "", "orichi-slider")`
  height: 100%;
  position: relative;
  .swiper-container-pointer-events {
    height: 100%;
  }
  .swiper-slide {
    width: 100% !important;
    max-width: 100%;
  }
  .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.46);
  }
  .swiper-pagination-bullet-active {
    background: #ffffff;
  }
  .orichi-slider-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    cursor: pointer;
  }
  .swiper-button-next {
    background-color: #ffffff86;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    right: 10px;
    &:after {
      font-size: 13px;
      color: #000000;
      font-weight: 900;
    }
  }
  .swiper-button-disabled {
    display: none;
  }
  .swiper-button-prev {
    background-color: #ffffff86;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    left: 10px;
    &:after {
      font-size: 13px;
      color: #000000;
      font-weight: 900;
    }
  }
`;
