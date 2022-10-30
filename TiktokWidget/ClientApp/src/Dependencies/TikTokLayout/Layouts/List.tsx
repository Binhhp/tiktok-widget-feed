import React, { Suspense, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "ui-components/Loading/ComponentLoader";
import LoadingInfinite from "ui-components/Loading/ButtonLoading";
import Item from "../Item";
import { LayoutTemplateContext } from "../LayoutTemplateContext";
import { TemplateInfiniteItem } from "../LayoutTemplateStype";
import { LayoutPropTypes } from "../LayoutTemplateType";

function LayoutList(props: LayoutPropTypes) {
  const templateContext = useContext(LayoutTemplateContext);
  return (
    <Suspense fallback={<Loader />}>
      {props.options?.viewMore ? (
        <div>
          <TemplateInfiniteItem>
            {templateContext.state.items
              .slice(0, props.showItems || templateContext.state.items.length)
              .map((item, index) => (
                <Item
                  widthItem="100%"
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
                  bg="#dfdfdf"
                  mr={props.style && props.style.pr === 0 ? props.style.pr : 5}
                  ml={props.style && props.style.pl === 0 ? props.style.pl : 5}
                  mb={props.style && props.style.pb === 0 ? props.style.pb : 10}
                ></Item>
              ))}
          </TemplateInfiniteItem>
          {(templateContext.state.items.length < templateContext.state.count ||
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
          dataLength={templateContext.state.items.length}
          hasMore={
            props.showLoadInfinite
              ? true
              : templateContext.state.items.length < templateContext.state.count
          }
          loader={<LoadingInfinite></LoadingInfinite>}
          next={props.fetchData}
        >
          <TemplateInfiniteItem>
            {templateContext.state.items
              .slice(0, props.showItems || templateContext.state.items.length)
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
