import breakpoints from "Dependencies/Devices/breakpoint";
import styled from "Dependencies/StyledComponents/Container";

export const DivContainer = styled("div", "container", "orichi-instagram")`
  &.orichi-instagram-container {
    display: flex;
    flex-direction: row;
    width: auto;
    max-width: 100%;
    align-items: stretch;
    flex-shrink: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const DivContent = styled("div", "content", "orichi-instagram")`
  &.orichi-instagram-content {
    background: #000000;
    max-width: 50%;
    max-height: 100%;
    overflow: hidden;
    min-width: 200px;
  }
`;

export const DivDesc = styled("div", "divdesc", "orichi-instagram")`
  &.orichi-instagram-divdesc {
    max-width: 50%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    justify-content: space-between;
    padding: 15px 11px 0px 11px;
    p.orichi-instagram-desc {
      margin: 32px 0px;
      font-family: "SF Pro Display";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #000000;
    }
  }
`;

export const DivUserName = styled("div", "", "orichi-instagram")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 12px;
  align-items: center;
  border-bottom: 1px solid rgba(213, 213, 213, 0.53);
  svg {
    margin-right: 5px;
  }
  h2 {
    font-family: "SF Pro Display";
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
    color: #000000;
    margin: 0px;
  }
  a {
    text-decoration: none;
    color: #0095f6;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
  }
`;

export const DivTimezone = styled("div", "", "orichi-instagram")`
  padding-top: 22px;
`;

export const DivTimezoneContent = styled("div", "", "orichi-instagram")`
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
  }
  h3 {
    color: #888888;
    font-family: "SF Pro Display";
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    font-style: italic;
  }
`;

interface IDivDot {
  bg?: string;
}
export const DivDot = styled("div", "", "orichi-instagram")<IDivDot>`
  background: ${(props) => props.bg ?? "#000000"};
  margin: 0px 8px;
  height: 4px;
  width: 4px;
  border-radius: 50%;
`;

export const DivDetailWrapper = styled("div", "", "orichi-instagram")`
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
    padding: 0px 11px;
  }
  @media only screen and (${breakpoints.device.lg}) {
    ${DivContainer} {
      flex-direction: column;
      ${DivContent} {
        max-width: 100%;
      }
      ${DivDesc} {
        max-width: 100%;
      }
    }
    .orichi-instagram-user {
      display: block;
      ${DivUserName} {
        padding: 15px 0px;
        border: none;
      }
    }
    .username ${DivUserName} {
      display: none;
    }
    .username p {
      margin: 12px 0px;
    }
    p.orichi-instagram-desc {
      margin-bottom: 46px;
    }
    ${DivContainer} {
      width: 75%;
    }
  }
  @media only screen and (${breakpoints.device.sm}) {
  }
  @media only screen and (${breakpoints.device.xm}) {
  }
`;
