import styled from "Dependencies/StyledComponents/Container";
import { IDataTableProvider } from "./DataTablesType";

export const DataTablesProvider = styled("div")<IDataTableProvider>`
  width: 100%;
  height: 100%;
  .Polaris-IndexTable,
  .Polaris-IndexTable-ScrollContainer {
    height: 100%;
  }
  .Polaris-IndexTable__TableCell,
  .Polaris-IndexTable__TableHeading {
    padding: 1rem 1rem 1rem 0px;
  }
  table {
    width: ${(props) => props.width || 100}%;
  }
  tbody {
    width: 100%;
    display: block;
    overflow: auto;
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  tbody {
    height: ${(props) => `${props.maxHeight}px` || `100%`};
  }
  thead th {
    font-weight: 700;
    height: 50px;
  }
  thead th:last-child {
    text-align: center;
  }
  svg {
    width: 35px;
    height: 35px;
  }
`;

export const AlertTitle = styled("h2")`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  padding: 10px 0px 30px 0px;
`;

export const AddToStore = styled("div")`
  width: 100%;
  h2 {
    font-family: "SF Pro Text";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #202223;
    margin: 0px 0px 25px 0px;
  }
  .copy-board {
    background: #f6f6f6;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-bottom: 26px;
    position: relative;
    padding: 5px 9px 10px 9px;
  }
  .guides {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 81px;
    padding-left: 3px;
    .Polaris-Icon {
      width: max-content;
      margin: 0px;
      margin-right: 10px;
      svg {
        fill: #00a0ac !important;
      }
    }
    .guides-text {
      display: flex;
      .watch-guides {
        display: flex;
        text-decoration: none;
        color: #2c6ecb;
        svg {
          margin-top: 1px;
          fill: #2c6ecb !important;
        }
      }
    }
  }
`;
