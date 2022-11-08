import styled from 'Dependencies/StyledComponents/Container';

export const Root = styled('div')`
  width: 100%;

  .title {
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #101828;
    margin-bottom: 12px;
    margin-top: 40px;
  }

  .slider {
    background: #ffffff;
    width: 100%;
    height: 100%;

    .swipper {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .swiper-slide {
      max-width: 334px;
      width: 80% !important;
    }
  }
`;

export const RecentCourseItemRoot = styled('div')`
  width: 256px;
  padding: 16px;
  img {
    width: 100%;
    object-fit: center;
  }
  .title {
    font-weight: 600;
    font-size: 17px;
    line-height: 24px;
    color: #202223;
    margin-top: 20px;
  }

  .title {
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #101828;
    margin-bottom: 12px;
    margin-top: 40px;
  }

  .slider {
    background: #ffffff;
  }
`;
