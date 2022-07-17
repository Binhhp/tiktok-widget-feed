import React, { Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/reducers";
import { TemplateStoreModel } from "stores/Templates/state";
import Loader from "ui-components/Loader";
import LoadingInfinite from "ui-components/LoadingInfinite";
import Item from "../Item";
import { TemplateInfiniteItem } from "../LayoutTemplateStype";
import { LayoutPropTypes } from "../LayoutTemplateType";

function LayoutList(props: LayoutPropTypes) {
  const templateReducer: TemplateStoreModel = useSelector(
    (state: RootReducer) =>
      state.templateStoreReducer.filter((x) => x.id === props.id)[0]
  );
  return (
    <Suspense fallback={<Loader />}>
      {props.options?.viewMore ? (
        <div>
          <TemplateInfiniteItem>
            {templateReducer.items
              .slice(0, props.showItems || templateReducer.items.length)
              .map((item, index) => (
                <Item
                  enableHover={props.enableHover}
                  clickRender={props.onClickLayoutRender}
                  hiddenContent={props.hiddenContent}
                  options={props.options}
                  key={`list-${index}`}
                  imgHeight={props.imgHeight ?? "100%"}
                  contentOverflow={props.contentOverflow}
                  width={100 / (props.row ?? 1)}
                  item={item}
                  index={index}
                  type={props.type}
                  zIndex={props.style?.zIndex}
                  bg="#00000024"
                  mr={props.style && props.style.pr === 0 ? props.style.pr : 5}
                  ml={props.style && props.style.pl === 0 ? props.style.pl : 5}
                  mb={props.style && props.style.pb === 0 ? props.style.pb : 10}
                ></Item>
              ))}
          </TemplateInfiniteItem>
          {(templateReducer.items.length < templateReducer.count ||
            props.showLoadInfinite) && (
            <LoadingInfinite
              viewMore={props.options?.viewMore}
              onClickViewMore={props.fetchData}
              loading={props.loadingButton ?? false}
            ></LoadingInfinite>
          )}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={templateReducer.items.length}
          hasMore={
            props.showLoadInfinite
              ? true
              : templateReducer.items.length < templateReducer.count
          }
          loader={<LoadingInfinite></LoadingInfinite>}
          next={props.fetchData}
        >
          <TemplateInfiniteItem>
            {templateReducer.items
              .slice(0, props.showItems || templateReducer.items.length)
              .map((item, index) => (
                <Item
                  enableHover={props.enableHover}
                  clickRender={props.onClickLayoutRender}
                  hiddenContent={props.hiddenContent}
                  options={props.options}
                  key={`list-${index}`}
                  imgHeight={props.imgHeight ?? "100%"}
                  contentOverflow={props.contentOverflow}
                  width={100 / (props.row ?? 1)}
                  item={item}
                  index={index}
                  type={props.type}
                  mr={props.style && props.style.pr === 0 ? props.style.pr : 5}
                  ml={props.style && props.style.pl === 0 ? props.style.pl : 5}
                  mb={props.style && props.style.pb === 0 ? props.style.pb : 10}
                ></Item>
              ))}
          </TemplateInfiniteItem>
        </InfiniteScroll>
      )}
    </Suspense>
  );
}

export default LayoutList;
