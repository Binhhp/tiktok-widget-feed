import styled from "Dependencies/StyledComponents/Container";

export const ActionItem = styled("div")``;

export const ActionWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  span {
    margin-right: 10px;
  }
  span:last-child {
    margin-right: 0px;
  }
  button {
    padding: 5px 12px;
  }
  button#btn-delete-table {
    background: #a21b00 !important;
    color: white;
  }
`;

export const CopyButtonSuccessed = styled("div")`
  position: absolute;
  top: 7px;
  right: 7px;
  width: max-content;
`;
export const ButtonCopy = styled("button")`
  position: absolute;
  top: 7px;
  right: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  display: block;
  background: #7d7d7d;
  width: auto;
  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
  border: none;
  cursor: pointer;
`;
