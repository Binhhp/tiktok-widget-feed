import React, { Suspense, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import Loader from "ui-components/Loading/ComponentLoader";
import LoadingInfinite from "ui-components/Loading/ButtonLoading";
import Item from "../Item";
import { LayoutTemplateContext } from "../LayoutTemplateContext";
import { LayoutPropTypes } from "../LayoutTemplateType";

function Masonries(props: LayoutPropTypes) {
  const templateContext = useContext(LayoutTemplateContext);

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
            {templateContext.state.items
              .slice(0, props.showItems || templateContext.state.items.length)
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
                  isHidden={true}
                  bg={props.options?.bg}
                  key={`masonry-${index}`}
                  item={item}
                  index={index}
                  type={props.type}
                ></Item>
              ))}
          </Masonry>
          {(templateContext.state.items.length < templateContext.state.count ||
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
          dataLength={templateContext.state.items.length}
          hasMore={
            props.showLoadInfinite
              ? true
              : templateContext.state.items.length < templateContext.state.count
          }
          loader={<LoadingInfinite></LoadingInfinite>}
          next={props.fetchData}
        >
          <Masonry
            breakpointCols={props.row}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {templateContext.state.items
              .slice(0, props.showItems || templateContext.state.items.length)
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
        </InfiniteScroll>
      )}
    </Suspense>
  );
}

export default Masonries;
