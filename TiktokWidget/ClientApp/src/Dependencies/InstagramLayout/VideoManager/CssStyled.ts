import styled from "Dependencies/StyledComponents/Container";

export const VideoPreviewContainer = styled("div")`
  width: 100%;
  padding: 21px 21px;
  position: relative;
  .video-item {
    flex: 1;
  }
  .video-item-image {
    min-height: 150px;
    height: calc(100% - 50px);
    img {
      display: block;
      object-fit: cover;
      height: 100%;
    }
  }
  .header {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    margin-bottom: 26px;
    .note {
      margin-top: 10px;
      font-style: italic;
    }
    .cbx-top {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 10px;
      margin-bottom: 25px;
      .check-video {
        margin-right: 6px;
        .Polaris-Choice {
          padding: 0px;
        }
      }
      span {
        font-family: "SF Pro Text";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #202223;
      }
    }
  }
  .video-empty {
    width: 100%;
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 15px;
    margin-top: 60px;
  }
  .more {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .btn-more {
      cursor: pointer;
      font-family: "Lato";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: #2c6ecb;
      margin-bottom: 100px;
      display: flex;
      align-items: center;
      width: max-content;
      height: max-content;
      margin: 0;
      span {
        margin-left: 1px;
        border-bottom: 1px solid #2c6ecb;
      }
      img {
        width: 12px;
        display: block;
      }
    }
  }
  .sortable-item:hover {
    z-index: 9999999;
  }
  .video-list {
    display: -ms-grid;
    display: grid;
    align-content: center;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 22px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    margin-bottom: 87px;
    flex: 1;
  }
`;

export const ImportVideoTitle = styled("div", "import-video-title", "orichi")`
  font-family: "SF Pro Display";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #202223;
`;
