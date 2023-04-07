import styled from "Dependencies/StyledComponents/Container";

export const TabWrapper = styled("div", "tab", "orichi")`
  display: flex;
  border-top: 2px solid #e1e3e5;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  height: 100%;
  z-index: 1;
  .tab-menu {
    display: flex;
    flex-direction: column;
    width: 25%;
  }
  .tab-content {
    width: 75%;
    position: relative;
  }
  .tabs {
    margin: 0px;
    list-style: none;
    display: block;
    padding: 0px;
    .Polaris-Tabs__Tab {
      padding: 13px;
      background: #f6f6f7;
      border-width: 0px 1px 1px 0px;
      border-style: solid;
      border-color: #dcdcdc;
    }
    .Polaris-Tabs__Tab.active {
      background: #ffffff;
    }
    .Polaris-Tabs__Tab:hover {
      background: #ffffff;
    }
  }
`;

export const ImportVideoWrapper = styled("div", "import-video", "orichi")`
  &.orichi-import-video {
    width: 100%;
    padding: 20px 23px;
    height: 100%;
    .header {
      font-family: "Jost";
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      margin-bottom: 16px;
    }
    .content {
      display: block;
      width: 508px;
      .form-user {
        max-width: 100%;
        margin-top: 41px;
        .Polaris-Label {
          width: 100%;
        }
        .input-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          span {
            font-family: "SF Pro Text";
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #202223;
          }
          a {
            color: #2c6ecb;
            text-decoration: none;
            font-family: "SF Pro Text";
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            text-align: center;
          }
        }
        .helptext {
          font-family: "SF Pro Text";
          font-style: italic;
          font-weight: 400;
          font-size: 15px;
          color: #6d7175;
        }
      }
      .import-type {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        .import-video-type:first-child {
          margin-right: 18px;
        }
        .import-video-type.active {
          background: #ffffff;
          font-weight: 600;
        }
        .import-video-type:hover {
          background: #ffffff;
        }
        .import-video-type {
          width: 245px;
          border: 0.5px solid #dcdcdc;
          cursor: pointer;
          background: #f6f6f7;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 9px 24px 9px 44px;
          position: relative;
          max-height: 34px;
          img {
            display: block;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
          }
        }
      }
    }
  }
`;

export const TabProductWrapper = styled("div", "tag-product", "orichi")`
  &.orichi-tag-product {
    width: 100%;
    padding: 64px 41px 0px 41px;
    h2 {
      font-family: "SF Pro Text";
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #202223;
      margin-bottom: 7px;
    }
    .desc {
      font-family: "SF Pro Text";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #202223;
      margin-bottom: 16px;
    }
    .mt-20 {
      margin-top: 36px;
    }
    .selected-item {
      button {
        color: #2c6ecb;
        font-family: "SF Pro Text";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
      }
      svg {
        fill: #5c5f62;
      }
    }
    .product-content {
      display: flex;
      flex-direction: row;
      width: 100%;
      .product-img {
        border-radius: 4px;
        border: 2px solid #e1e3e5;
        margin-right: 10px;
        width: 63px;
        img {
          width: 100%;
          height: 100%;
          max-height: 100%;
          overflow: hidden;
          border-radius: 4px;
          font-size: 12px;
          display: block;
        }
      }
      .product-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        width: calc(100% - 100px);
        h2 {
          font-family: "SF Pro Text";
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          max-width: 100%;
          color: #202223;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span.btn-delete {
          margin-bottom: 4px;
          cursor: pointer;
          svg {
            fill: #5c5f62;
          }
        }
      }
    }
  }
`;

export const EnableAppWrapper = styled("div")`
  width: 100%;
  padding: 19px;
  height: 100%;
  .Polaris-Card {
    box-shadow: none;
    height: 100%;
    .Polaris-Card__Section {
      padding-top: 0px;
      padding-bottom: 0px;
      height: 100%;
      display: block;
      .Polaris-MediaCard__Heading {
        margin-right: 0px;
      }
    }
    .Polaris-Stack--vertical {
      display: flex;
      justify-content: space-between;
      align-content: space-between;
      height: 100%;
    }
    #btn-done,
    #btn-done:hover,
    #btn-next,
    #btn-next:hover {
      color: #ffffff;
      background: #fb447a;
    }
    #btn-next {
      padding-left: 18px;
      padding-right: 18px;
      text-decoration: none;
    }
    #btn-verified {
      background: #f1f1f1;
      color: #8c9196;
    }
  }
  &.next .Polaris-ButtonGroup {
    display: flex;
    justify-content: space-between;
  }
`;

export const TestAppControllerWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 11px 44px;
  .almost-done {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 23px;
    h2 {
      font-family: "SF Pro Text";
      font-style: normal;
      font-weight: 700;
      font-size: 13px;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0.04em;
    }
    img {
      display: block;
      width: 69px;
    }
  }
  p {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    color: #6d7175;
    a {
      text-decoration: none;
      font-weight: bold;
      color: #4680d1;
    }
  }
`;

export const EnableAppTitle = styled("span", "enableApp-title", "orichi")`
  font-family: "Jost";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
  margin: 0px;
  .link-toggle {
    color: #000000;
  }
`;
