import styled from "Dependencies/StyledComponents/Container";
import { IDataTableProvider } from "./DataTablesType";

export const DataTablesProvider = styled("div")<IDataTableProvider>`
  width: 100%;
  height: 100%;
  .Polaris-IndexTable,
  .Polaris-IndexTable-ScrollContainer {
    height: 96%;
  }
  .Polaris-IndexTable__TableCell,
  .Polaris-IndexTable__TableHeading {
    padding: 1rem 1rem 1rem 0px !important;
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
  /* thead {
    width: calc(100% - 1em);
  } */
  thead th {
    font-weight: 700;
    height: 50px;
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
