import styled from "Dependencies/StyledComponents/Container";

export const Root = styled("div")`
  width: 100%;
  margin-top: 57px;
  .slider {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #ffffff;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25),
      0px 1px 3px rgba(63, 63, 68, 0.15);
    .swiper-container {
      padding-left: 16px;
      padding-top: 16px;
      padding-bottom: 16px;
      .swiper-slide {
        width: 80%;
      }
    }
  }
  .title {
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #101828;
    margin-bottom: 12px;
  }

  .swipper {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .action {
    display: flex;
    align-items: center;
    padding: 0px 16px 16px 16px;
    .result {
      margin-left: 16px;
      color: #6d7175;
      flex: none;
      order: 0;
      flex-grow: 0;
      font-size: 15px;
      font-family: "SF Pro Display";
    }
  }
`;

export const RecentCourseItemRoot = styled("div")`
  img {
    width: 100%;
    object-fit: center;
  }

  .card-content {
    width: 100%;
    .Polaris-Card .Polaris-Card__Section {
      padding: 0px 0px 50% 0px;
      width: 100%;
      height: 100%;
      position: relative;
    }
    .recent-poster {
      position: absolute;
      top: 0;
      left: 0;
      padding: 16px 16px 0px 16px;
      width: 100%;
      height: 100%;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }

  .Polaris-MediaCard__Heading {
    margin: 0px;
    .Polaris-Heading {
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 22px;
      -webkit-line-clamp: 2;
      height: 44px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
  .Polaris-Stack__Item p {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 22px;
    -webkit-line-clamp: 3;
    height: 66px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .Polaris-Stack__Item .Polaris-MediaCard__ActionContainer {
    padding-top: 17px;
  }
`;
