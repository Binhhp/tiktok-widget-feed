import styled from 'Dependencies/StyledComponents/Container';

export const RootComponent = styled('div')`
  p.text-welcome {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #667085;
    margin-bottom: 28px;
  }
  h3 {
    color: #101828;
    font-weight: 500;
    font-size: 30px;
    line-height: 38px;
    margin-bottom: 3px;
  }

  .banner-slider {
    height: 276px;
  }
  .swipper {
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      cursor: pointer;
    }
    .swiper-slide {
      width: 100%;
      height: 100%;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .swiper-wrapper {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .swiper-pagination-bullet-active {
      background: #ffffff;
      opacity: 0.6;
    }
  }
  @media only screen and (min-width: 1590px) {
    .banner-slider {
      height: 366px;
    }
  }
`;
