import {
  EmptySearchResult,
  IndexTable,
  Modal,
  Spinner,
} from "@shopify/polaris";
import { IndexTableHeading } from "@shopify/polaris/build/ts/latest/src/components/IndexTable";
import { NonEmptyArray } from "@shopify/polaris/build/ts/latest/src/types";
import { ContainerSection } from "common/style/UtilStyles";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Waypoint } from "react-waypoint";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import LoadingInfinite from "ui-components/LoadingInfinite";
import { AbsoluteCenter } from "ui-components/UtilsStyle";
import Actions from "./Actions";
import { AlertTitle, DataTablesProvider } from "./DataTablesStyle";
import { IColumnProvider, IDataTableProps } from "./DataTablesType";

function DataTables(props: IDataTableProps) {
  const [dataTable, setDataTable] = useState<Array<any>>([]);
  const [page, setPage] = useState({
    pageIndex: 1,
    count: 0,
  });
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const fetchData = (isReload = false) => {
    setLoading(true);
    props
      .queryData(isReload ? 1 : page.pageIndex)
      .then((res) => {
        if (isReload) {
          setDataTable(res.data);
          setPage({
            pageIndex: 2,
            count: res.count,
          });
        } else {
          setDataTable([...dataTable, ...res.data]);
          setPage({
            pageIndex: page.pageIndex + 1,
            count: res.count,
          });
        }
        setLoading(false);
        dispatch(WidgetActionTS.OnSetWidgetCount(res.count));
      })
      .catch((err) => {
        console.log(err.message);
        setDataTable([]);
        setLoading(false);
      });
  };

  const actions = (item: any) => (
    <Actions
      onEdit={onHandleUpdate(item)}
      onDelete={onHandleUpdate(item, true)}
    ></Actions>
  );
  useEffect(() => {
    fetchData(true);
  }, [props.reload]);

  const renderFields = (item: any, col: IColumnProvider) => {
    if (col && col.onRender) {
      return col.onRender(item);
    }
    return item[col.fieldName];
  };

  const renderHeadings = (): any => {
    var heading: Array<IndexTableHeading> = [];
    props.columns.map((item) => {
      heading.push({
        title: item.title,
      });
    });
    heading.push({ title: props.labelAction || "Actions" });
    return heading as NonEmptyArray<IndexTableHeading>;
  };

  const [alert, setAlert] = useState({
    active: false,
    item: {
      widgetTitle: "",
    },
    isDeleted: false,
  });
  const onSetAlert = (item: any) => {
    setAlert({
      ...alert,
      item: item,
      active: !alert.active,
    });
  };

  const onCloseAlert = () => {
    setAlert({
      active: false,
      item: {
        widgetTitle: "",
      },
      isDeleted: false,
    });
  };

  const [loadingButton, setLoadingButton] = useState(false);
  const onHandleUpdate =
    (item: any, isDeleted: boolean = false, isConfirm = false) =>
    async () => {
      var result = false;
      if (isDeleted) {
        if (!isConfirm) {
          onSetAlert(item);
        } else {
          setLoadingButton(true);
          result = await props.onDelete(item);
          fetchData(true);
          setLoadingButton(false);
          onCloseAlert();
        }
      } else {
        result = await props.onUpdate(item);
        fetchData(true);
      }
    };
  const renderAlert = (
    <Modal
      titleHidden
      title=""
      open={alert.active}
      onClose={onCloseAlert}
      primaryAction={{
        id: "btn-delete",
        content: "Delete",
        loading: loadingButton,
        onAction: onHandleUpdate(alert.item, true, true),
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onCloseAlert,
        },
      ]}
    >
      <Modal.Section>
        <AlertTitle>
          Are you sure you want to delete
          <strong>“{alert.item.widgetTitle}”</strong>?
        </AlertTitle>
      </Modal.Section>
    </Modal>
  );

  const renderData = dataTable.map((item, index) => (
    <IndexTable.Row id={`data-table-${index}`} key={index} position={index}>
      {props.columns.map((col, indexCol) => (
        <IndexTable.Cell key={`col-${indexCol}`}>
          {renderFields(item, col)}
        </IndexTable.Cell>
      ))}
      <IndexTable.Cell key={`col-action`}>{actions(item)}</IndexTable.Cell>
    </IndexTable.Row>
  ));
  return (
    <DataTablesProvider
      width={loading || dataTable?.length === 0 ? 100 : 0}
      maxHeight={props.maxHeight}
    >
      <IndexTable
        lastColumnSticky
        hasMoreItems
        headings={renderHeadings()}
        itemCount={1}
        selectable={false}
      >
        {!loading && dataTable?.length > 0 && (
          <>
            {renderData}
            {dataTable?.length < page.count && (
              <Waypoint onEnter={() => fetchData()}></Waypoint>
            )}
            {dataTable?.length < page.count && (
              <ContainerSection width={100} mt={30}>
                <LoadingInfinite></LoadingInfinite>
              </ContainerSection>
            )}
            {renderAlert}
          </>
        )}
        {loading && (
          <AbsoluteCenter>
            <Spinner size="large" />
          </AbsoluteCenter>
        )}
        {!loading && dataTable?.length === 0 && (
          <AbsoluteCenter>
            <EmptySearchResult
              title="No data available"
              description="You can create a new widget above"
              withIllustration
            />
          </AbsoluteCenter>
        )}
      </IndexTable>
    </DataTablesProvider>
  );
}
export default React.memo(DataTables);
