import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

export const DivContainer = styled("div", "container", "orichi-instagram")`
  &.orichi-instagram-container {
    display: flex;
    flex-direction: row;
    width: auto;
    max-width: 80%;
    align-items: stretch;
    flex-shrink: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 90vh;
    overflow: hidden;
  }
`;

export const DivContent = styled("div", "content", "orichi-instagram")`
  &.orichi-instagram-content {
    background: #000000;
    max-width: 50%;
    max-height: 100%;
    overflow: hidden;
    min-width: 200px;
    min-height: 30vh;
  }
`;

export const DivDesc = styled("div", "divdesc", "orichi-instagram")`
  &.orichi-instagram-divdesc {
    max-width: 50%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    justify-content: space-between;
    padding: 15px 11px 10px 11px;
    .orichi-instagram-desc {
      margin: 22px 0px;
      p {
        margin: 0px;
        font-family: "SF Pro Display" !important;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        color: #000000;
        text-overflow: ellipsis;
        line-height: 18px;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        overflow: hidden;
        max-height: 54px;
      }
      .desc {
        max-height: max-content;
        display: block;
        overflow: auto;
        line-height: normal;
      }
    }
  }
`;
//Button read more
export const LinkReadMore = styled("span")`
  margin: 0px;
  font-size: 14px;
  cursor: pointer;
`;

export const DivUserName = styled("div", "user1", "orichi-instagram")`
  &.orichi-instagram-user1 {
    display: flex;
    flex-direction: row;
    padding-bottom: 12px;
    align-items: center;
    border-bottom: 1px solid rgba(213, 213, 213, 0.53);
    svg {
      margin-right: 7px;
    }
    h2 {
      font-family: "SF Pro Display";
      font-size: 16px;
      font-weight: 700;
      line-height: 16px;
      color: #000000;
      margin: 0px;
      word-break: keep-all;
    }
    a {
      text-decoration: none;
      color: #0095f6;
      font-weight: 700;
      font-size: 16px;
      line-height: 16px;
    }
  }
`;

export const DivTimezone = styled("div", "tz__root", "orichi-instagram")`
  &.orichi-instagram-tz__root {
    padding-top: 22px;
  }
`;

export const DivTimezoneContent = styled(
  "div",
  "tz__content",
  "orichi-instagram"
)`
  &.orichi-instagram-tz__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid rgba(213, 213, 213, 0.53);
    h2 {
      font-style: italic;
      text-transform: uppercase;
      font-family: "SF Pro Display";
      font-size: 14px;
      font-weight: 500;
      line-height: 16px;
      color: #888888;
      margin: 0px;
    }
    h3 {
      color: #888888;
      font-family: "SF Pro Display";
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      font-style: italic;
      margin: 0px;
    }
  }
`;

interface IDivDot {
  bg?: string;
}
export const DivDot = styled("div", "dot", "orichi-instagram")<IDivDot>`
  &.orichi-instagram-dot {
    background: ${(props) => props.bg ?? "#000000"};
    margin: 0px 8px;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    display: block !important;
  }
`;

export const DivDetailWrapper = styled("div", "root", "orichi-instagram")`
  .img-fill-loading {
    filter: blur(10px);
    clip-path: inset(0);
  }

  .img-fill-loaded {
    filter: blur(0px);
    transition: filter 0.5s linear;
  }
  &.orichi-instagram-root {
    max-width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    justify-content: center;
    align-items: center;
    z-index: 999999;
    .orichi-instagram-user {
      display: none;
      background: #ffffff;
      padding: 0px 12px;
    }
    @media only screen and (min-width: 1200px) {
      ${DivDesc} {
        min-width: 45vh;
      }
    }
    @media only screen and (${breakpoints.device.lg}) {
      ${DivContainer} {
        flex-direction: column;
        ${DivContent} {
          max-width: 100%;
        }
        ${DivDesc} {
          max-width: 100%;
          min-width: auto;
        }
      }
      .orichi-instagram-user {
        display: block;
        ${DivUserName} {
          padding: 15px 0px;
          border: none;
        }
      }
      .username .orichi-instagram-desc {
        margin-top: 0px;
      }
      .username ${DivUserName} {
        display: none;
      }
      .username p {
        margin: 12px 0px;
      }
      ${DivContainer} {
        width: 75%;
      }
    }
    @media only screen and (${breakpoints.device.sm}) {
    }
    @media only screen and (${breakpoints.device.xm}) {
    }
  }
`;
