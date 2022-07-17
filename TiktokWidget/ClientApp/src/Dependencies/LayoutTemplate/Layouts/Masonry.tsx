import React, { Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/reducers";
import { TemplateStoreModel } from "stores/Templates/state";
import Loader from "ui-components/Loader";
import LoadingInfinite from "ui-components/LoadingInfinite";
import Item from "../Item";
import { LayoutPropTypes } from "../LayoutTemplateType";

function Masonries(props: LayoutPropTypes) {
  const templateReducer: TemplateStoreModel = useSelector(
    (state: RootReducer) =>
      state.templateStoreReducer.filter((x) => x.id === props.id)[0]
  );

  return (
    <Suspense fallback={<Loader />}>
      {props?.options?.viewMore ? (
        <div>
          <Masonry
            breakpointCols={{
              default: props.row,
              1200: 3,
              768: 2,
              500: 1,
            }}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {templateReducer.items
              .slice(0, props.showItems || templateReducer.items.length)
              .map((item, index) => (
                <Item
                  showDesc
                  enableHover={props.enableHover}
                  clickRender={props.onClickLayoutRender}
                  showAllHashTag={true}
                  pr={props.style && props.style.pr === 0 ? props.style.pr : 5}
                  pl={props.style && props.style.pl === 0 ? props.style.pl : 5}
                  hiddenContent={props.hiddenContent}
                  options={props.options}
                  mb={20}
                  imgHeight={props.imgHeight ?? "100%"}
                  isHidden={true}
                  bg={props.options?.bg}
                  key={`masonry-${index}`}
                  item={item}
                  index={index}
                  type={props.type}
                ></Item>
              ))}
          </Masonry>
          {(templateReducer.items.length < templateReducer.count ||
            props.showLoadInfinite) && (
            <LoadingInfinite
              viewMore={props.options?.viewMore}
              onClickViewMore={props.fetchData}
              loading={props.loadingButton}
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
          <Masonry
            breakpointCols={props.row}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {templateReducer.items
              .slice(0, props.showItems || templateReducer.items.length)
              .map((item, index) => (
                <Item
                  showDesc
                  enableHover={props.enableHover}
                  clickRender={props.onClickLayoutRender}
                  showAllHashTag={true}
                  pr={props.style && props.style.pr === 0 ? props.style.pr : 5}
                  pl={props.style && props.style.pl === 0 ? props.style.pl : 5}
                  hiddenContent={props.hiddenContent}
                  options={props.options}
                  mb={20}
                  imgHeight={props.imgHeight}
                  isHidden={true}
                  bg={props.options?.bg}
                  key={`masonry-${index}`}
                  item={item}
                  index={index}
                  type={props.type}
                ></Item>
              ))}
          </Masonry>
        </InfiniteScroll>
      )}
    </Suspense>
  );
}

export default Masonries;
