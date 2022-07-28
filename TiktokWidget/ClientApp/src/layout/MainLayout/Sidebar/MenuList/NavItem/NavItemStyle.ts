import { IPropListItemButton } from "./NavItem";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const ListItemTagHref = styled.a<IPropListItemButton>`
  width: 100%;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: #202223;
  padding-top: ${(props) => (props?.level && props?.level > 1 ? 6 : 6.25)}px;
  padding-bottom: ${(props) => (props?.level && props?.level > 1 ? 6 : 6.25)}px;
  padding-left: 24px;
  position: relative;

  &:hover {
    background: #edeeef;
    color: rgba(255, 11, 83, 1);
    border-radius: 4px;
    svg {
      fill: rgba(255, 11, 83, 1);
    }
    &:before {
      content: "";
      position: absolute;
      top: 0.0625rem;
      bottom: 0.0625rem;
      left: 0;
      width: 0.1875rem;
      background-color: red;
      border-top-right-radius: red;
      border-bottom-right-radius: red;
    }
  }
`;

export const ListItemButton = styled(Link)<IPropListItemButton>`
  width: 100%;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: #202223;
  padding-top: ${(props) => (props?.level && props?.level > 1 ? 6 : 6.25)}px;
  padding-bottom: ${(props) => (props?.level && props?.level > 1 ? 6 : 6.25)}px;
  padding-left: 24px;
  position: relative;

  &:hover {
    background: #edeeef;
    color: rgba(255, 11, 83, 1);
    border-radius: 4px;
    svg {
      fill: rgba(255, 11, 83, 1);
    }
    &:before {
      content: "";
      position: absolute;
      top: 0.0625rem;
      bottom: 0.0625rem;
      left: 0;
      width: 0.1875rem;
      background-color: red;
      border-top-right-radius: red;
      border-bottom-right-radius: red;
    }
  }
`;

export const ListItemButtonMenu = styled.div<IPropListItemButton>`
  width: 100%;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: #202223;
  padding-top: ${(props) => (props?.level && props?.level > 1 ? 6 : 6.25)}px;
  padding-bottom: ${(props) => (props?.level && props?.level > 1 ? 6 : 6.25)}px;
  padding-left: 24px;
  position: relative;
  &:hover {
    background: #edeeef;
    color: rgba(255, 11, 83, 1);
    svg {
      fill: rgba(255, 11, 83, 1);
    }
    &:before {
      content: "";
      position: absolute;
      top: 0.0625rem;
      bottom: 0.0625rem;
      left: 0;
      width: 0.1875rem;
      background-color: red;
      border-top-right-radius: red;
      border-bottom-right-radius: red;
    }
  }
`;

export const BorderLineLeft = styled.div`
  background: #ff0b53;
  width: 3px;
  border-radius: 0px 4px 4px 0px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const ListItemIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 18px;
`;

export const Chip = styled.div`
  border-radius: 50%;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #202223;
  background: rgba(228, 229, 231, 1);
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 1px 6px;
`;

export const ListItemWrapper = styled.div`
  padding: 0px 5px;
`;
