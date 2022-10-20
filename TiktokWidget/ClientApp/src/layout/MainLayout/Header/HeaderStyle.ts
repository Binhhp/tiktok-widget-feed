import styled from "Dependencies/StyledComponents/Container";

export const HeaderWrapper = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  padding: 7px 14px;
  background: #ffffff;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25);
`;

export const FlagStyle = styled("div")`
  background: rgba(69, 241, 237, 0.19);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  padding: 3px;
  margin-right: 6px;
`;

export const FlagText = styled("div")`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #202223;
`;

export const HeaderRight = styled("div")`
  display: flex;
  flex-wrap: wrap;
  width: max-content;
`;

export const Account = styled("div")`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 27px;
`;

export const AccountName = styled("div")`
  font-family: "SF Pro Display";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #202223;
  margin-left: 8px;
  @media (max-width: 768px) {
    display: none;
  }
`;
