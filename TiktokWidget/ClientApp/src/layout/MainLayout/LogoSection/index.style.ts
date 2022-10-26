import styled from "Dependencies/StyledComponents/Container";

export const LogoSectionContext = styled("div")`
  display: block;
  align-items: center;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const LogoWrapper = styled("a")`
  width: auto;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  line-break: none;
  text-decoration: none;
`;

export const BackToShop = styled("span")`
  width: auto;
  font-weight: 600;
  font-size: 14px;
  margin-left: 10px;
  line-height: 20px;
  color: #202223;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileViewMenu = styled("div")`
  display: none;
  margin-right: 10px;
  @media (max-width: 768px) {
    display: block;
  }
`;
