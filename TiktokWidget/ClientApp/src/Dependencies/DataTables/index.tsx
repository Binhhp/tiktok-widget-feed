import {
  EmptySearchResult,
  Icon,
  IndexTable,
  Modal,
  Spinner,
} from "@shopify/polaris";
import { ExternalSmallMinor, InfoMinor } from "@shopify/polaris-icons";
import { IndexTableHeading } from "@shopify/polaris/build/ts/latest/src/components/IndexTable";
import { NonEmptyArray } from "@shopify/polaris/build/ts/latest/src/types";
import { ChatPlugin } from "common/functions/ChatPlugin";
import { ContainerSection } from "common/style/UtilStyles";
import config from "config";
import React, { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import LoadingInfinite from "ui-components/Loading/ButtonLoading";
import { AbsoluteCenter } from "ui-components/UtilsStyle";
import Actions from "./Actions";
import CopyButton from "./Actions/CopyButton";
import { AddToStore, AlertTitle, DataTablesProvider } from "./DataTablesStyle";
import { IColumnProvider, IDataTableProps } from "./DataTablesType";

const DataTables = React.memo(function DataTables(props: IDataTableProps) {
  const [dataTable, setDataTable] = useState<Array<any>>([]);
  const [page, setPage] = useState({
    pageIndex: 1,
    count: 0,
  });
  const [loading, setLoading] = useState(true);

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
        if (props.onSetCount) props.onSetCount(res.count);
      })
      .catch((err) => {
        setDataTable([]);
        setLoading(false);
      });
  };

  const [showAddToStore, setShowAddToStore] = useState("");
  const onCloseAddToStore = () => setShowAddToStore("");
  const onShowAddToStore = (id: string) => () => setShowAddToStore(id);

  const actions = (item: any) => (
    <Actions
      onEdit={onHandleUpdate(item)}
      onDelete={onHandleUpdate(item, true)}
      showAddToStore={props.addToStore?.isShow}
      onHandleAddToStore={onShowAddToStore(item.id)}
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
      if (isDeleted) {
        if (!isConfirm) {
          onSetAlert(item);
        } else {
          setLoadingButton(true);
          await props.onDelete(item);
          fetchData(true);
          setLoadingButton(false);
          onCloseAlert();
        }
      } else {
        await props.onUpdate(item);
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

  const RenderAddToStore = (
    <Modal
      title={
        <h2 className="modal-title-store">Add the widget to your website</h2>
      }
      open={showAddToStore !== ""}
      onClose={onCloseAddToStore}
      primaryAction={{
        id: "btn-install-store",
        content: "I have installed the code",
        loading: loadingButton,
        onAction: onCloseAddToStore,
      }}
      footer={
        <span id="btn-need-help-table" onClick={ChatPlugin.Open}>
          Need help?
        </span>
      }
    >
      <Modal.Section>
        <AddToStore>
          <h2>
            Copy and paste this code into desired place of your website (HTML
            editor, website template, theme, section, etc)
          </h2>
          <div className="copy-board">
            <p>{`<script src="${props.addToStore?.script}" defer></script>`}</p>
            <p>{`<div name="${props.addToStore?.divName}" data-id="${showAddToStore}"></div>`}</p>
            <CopyButton
              script={`<script src="${props.addToStore?.script}" defer></script><div name="${props.addToStore?.divName}" data-id="${showAddToStore}"></div>`}
            ></CopyButton>
          </div>
          <div className="guides">
            <Icon source={InfoMinor} color="interactive" />
            <div className="guides-text">
              <span>Video Tutorials</span>&nbsp;&nbsp;|&nbsp;&nbsp;
              <a
                href={config.Guides}
                target="_blank"
                className="watch-guides"
                rel="noreferrer"
              >
                Watch guides on YouTube.{" "}
                <Icon source={ExternalSmallMinor} color="primary" />
              </a>
            </div>
          </div>
        </AddToStore>
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
      <IndexTable.Cell className="data-actions" key={`col-action`}>
        {actions(item)}
      </IndexTable.Cell>
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
            {props.addToStore?.isShow && RenderAddToStore}
          </>
        )}
        {loading && (
          <tr>
            <td>
              <AbsoluteCenter>
                <Spinner size="large" />
              </AbsoluteCenter>
            </td>
          </tr>
        )}
        {!loading && dataTable?.length === 0 && (
          <tr>
            <td>
              <AbsoluteCenter>
                <EmptySearchResult
                  title="No data available"
                  description="You can create a new widget above"
                  withIllustration
                />
              </AbsoluteCenter>
            </td>
          </tr>
        )}
      </IndexTable>
    </DataTablesProvider>
  );
});

export default DataTables;
