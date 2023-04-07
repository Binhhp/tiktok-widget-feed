import { Checkbox } from "@shopify/polaris";
import SniperLoading from "ui-components/Loading/SniperLoading";
import React from "react";
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from "react-sortable-hoc";
import IconDrag from "assets/svg/DragIcon";
import ChevronDown from "assets/svg/ChevronDown";
import { DragListProps } from "./Model";

export default function DragDropList(props: DragListProps) {
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    props.onChangeData(arrayMove(props.data, oldIndex, newIndex));
  };
  const onSortStart = ({ index }: any, event: any) => {
    if (event?.target?.classList[0] === "Polaris-Checkbox__Backdrop") {
      const id = props.data[index]?.id;
      if (id) {
        props.unCheckShowVideos(id)();
      }
    }
  };
  const SortableItem: any = SortableElement(({ item }: { item: any }) => (
    <div key={item?.id} className="video-item">
      <div className="video-item-header">
        <div className="icon-drag">
          <IconDrag />
        </div>
        <div className="check-video">
          <Checkbox
            label=""
            checked={!props.unChecked.includes(item.id)}
            onChange={props.unCheckShowVideos(item.id)}
          />
        </div>
      </div>
      <div className="video-item-image">
        <img src={item?.video?.originCover} alt={item?.desc} />
      </div>
    </div>
  ));
  const SortableList: any = SortableContainer(({ items }: { items: any[] }) => {
    return (
      <div className="video-list">
        {items.map((item, index) => (
          <SortableItem
            key={index}
            sortIndex={index}
            index={index}
            item={item}
          />
        ))}
      </div>
    );
  });
  return (
    <div className="drag-list">
      <SortableList
        axis="xy"
        onSortStart={onSortStart}
        helperClass="dragging"
        onSortEnd={onSortEnd}
        items={props.data}
      />
      {props.data.length < props.count && (
        <div className="more">
          {props.loading ? (
            <SniperLoading />
          ) : (
            <div onClick={props.onGetmore} className="btn-more">
              <span>Get more</span>
              <ChevronDown />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
