export interface IDataTableProps {
  maxHeight?: number;
  columns: IColumnProvider[];
  queryData: (pageIndex: number) => Promise<NonNullable<IQueryDataTable<any>>>;
  labelAction?: string;
  reload?: number;
  onUpdate: (item: any) => any;
  onDelete: (item: any) => any;
}

export interface IColumnProvider {
  title: string;
  fieldName: string;
  onRender?: (item: any) => any;
}

export interface IDataTableProvider {
  maxHeight?: number;
  width?: number;
}

export interface IQueryDataTable<T> {
  data: T[];
  count: number;
}
