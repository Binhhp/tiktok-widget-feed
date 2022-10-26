import styled from "Dependencies/StyledComponents/Container";

export const SliderImageWrapper = styled("div")`
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
  .orichi-instagram-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;
