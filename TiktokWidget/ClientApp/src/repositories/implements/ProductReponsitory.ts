import { RootURL } from "common/constants/RootURL";
import DataTableFunc from "Dependencies/DataTables/DataTableModel";
import { BaseProduct } from "repositories/dtos/responses/BaseProduct";
import { IProductReponsitory } from "repositories/interfaces/IProductReponsitory";

export class ProductReponsitory implements IProductReponsitory {
  Get = async (pageIndex: number, domain?: string) => {
    return DataTableFunc.BuildPaging<BaseProduct>(
      `${RootURL.ApiBase}/odata/shops('${domain}')/products`,
      pageIndex,
      10
    );
  };
}
