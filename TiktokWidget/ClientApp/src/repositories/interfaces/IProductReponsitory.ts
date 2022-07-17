import { IQueryDataTable } from "Dependencies/DataTables/DataTablesType";
import { BaseProduct } from "repositories/dtos/responses/BaseProduct";

export interface IProductReponsitory {
  Get: (
    pageIndex: number,
    domain?: string
  ) => Promise<IQueryDataTable<BaseProduct>>;
}
