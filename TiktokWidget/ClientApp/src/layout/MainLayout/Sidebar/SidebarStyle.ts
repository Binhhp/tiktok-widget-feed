import styled from "Dependencies/StyledComponents/Container";

export interface ISidebarWrapper {
  active: boolean;
}

export const SidebarWrapper = styled("div")<ISidebarWrapper>`
  width: 239px;
  height: 100%;
  position: fixed;
  display: block;
  flex-direction: column;
  background: rgba(246, 246, 247, 1);
  padding-top: 45px;
  z-index: 9;
  box-shadow: inset -1px 0px 0px #e4e5e7;
  .active-menu {
    background: #edeeef;
    color: rgba(255, 11, 83, 1) !important;
  }
  .active-menu svg {
    fill: rgba(255, 11, 83, 1) !important;
  }
  .active-menu::before {
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
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    padding-top: 75px;
    transition: transform 0.5s ease-out;
    transform: translateX(${(props) => (props.active ? 0 : -300)}px);
  }
`;
