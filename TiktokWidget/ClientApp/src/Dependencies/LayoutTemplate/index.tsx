import React, { useEffect, useState } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import {
  TemplateControl,
  TemplateControlItem,
  TemplateSkeleton,
  TemplateSkeletonItem,
  TemplateSkeletonItemContent,
  TemplateVideoPlay,
  TemplateWrapper,
} from "./LayoutTemplateStype";
import { ITemplateProps, TemplateType } from "./LayoutTemplateType";
import { EmptySearchResult, Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { TemplateStoreActionTS } from "stores/Templates/action";
import { RootReducer } from "stores/reducers";
import Skeleton from "react-loading-skeleton";
import { PlayMinor } from "@shopify/polaris-icons";
import LayoutList from "./Layouts/List";
import Masonries from "./Layouts/Masonry";
import Slider from "./Layouts/Slider";
import Carousel from "./Layouts/Carourel";
import { TemplateStoreModel } from "stores/Templates/state";
import LoadingInfinite from "ui-components/LoadingInfinite";

SwiperCore.use([Autoplay, Navigation]);

function LayoutTemplate(props: ITemplateProps) {
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(true);

  const templateReducer: TemplateStoreModel = useSelector(
    (state: RootReducer) =>
      state.templateStoreReducer.filter((x) => x.id === props.id)[0]
  );
  const dispatch = useDispatch();

  const fetchData = () => {
    setLoadingButton(true);
    let page = templateReducer?.pageIndex ?? 1;
    props._queryData(page).then((res) => {
      if (res?.data.length > 0) {
        dispatch(TemplateStoreActionTS.OnSetItems(props.id, res.data));
      }
      dispatch(
        TemplateStoreActionTS.OnSetPage(props.id, {
          count: res.count,
          pageIndex: 1,
        })
      );
      setLoading(false);
      setLoadingButton(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickLayoutRender = (index: number) => () => {
    if (props.clickRender) {
      props.clickRender(index);
    }
  };

  const RenderList = (
    <LayoutList
      {...props}
      fetchData={fetchData}
      onClickLayoutRender={onClickLayoutRender}
      loadingButton={loadingButton}
    ></LayoutList>
  );
  const RenderMasonry = (
    <Masonries
      {...props}
      fetchData={fetchData}
      onClickLayoutRender={onClickLayoutRender}
      loadingButton={loadingButton}
    ></Masonries>
  );

  const RenderSlider = (
    <Slider
      {...props}
      fetchData={fetchData}
      onClickLayoutRender={onClickLayoutRender}
      loadingButton={loadingButton}
    ></Slider>
  );

  const RenderCarousel = (
    <Carousel
      {...props}
      fetchData={fetchData}
      onClickLayoutRender={onClickLayoutRender}
      loadingButton={loadingButton}
    ></Carousel>
  );

  const RenderComponent = () => {
    switch (props.type) {
      case TemplateType.List:
        return RenderList;
      case TemplateType.Masonry:
        return RenderMasonry;
      case TemplateType.Carousel:
        return RenderCarousel;
      default:
        return RenderSlider;
    }
  };

  const items = Array.from(Array(props.row).keys());
  const RenderLoading = (
    <TemplateSkeleton>
      {items.map((i) => (
        <TemplateSkeletonItem row={props.row} key={`skeleton-${i}`}>
          <Skeleton className="skeleton-item" />
          <TemplateSkeletonItemContent>
            <Skeleton inline height={40} className="skeleton-desc" />
            <Skeleton inline width="50%" height={20} />
          </TemplateSkeletonItemContent>
          <TemplateVideoPlay>
            <Icon source={PlayMinor}></Icon>
          </TemplateVideoPlay>
        </TemplateSkeletonItem>
      ))}
    </TemplateSkeleton>
  );

  const RenderCircleLoading = <LoadingInfinite></LoadingInfinite>;
  const RenderEmptyData = () => {
    if (props.onNotFound) {
      return props.onNotFound();
    }
    return (
      <TemplateControl>
        <TemplateControlItem>
          <EmptySearchResult
            title="No videos not found"
            description="Add or update widget with new username and hashtag"
            withIllustration
          />
        </TemplateControlItem>
      </TemplateControl>
    );
  };
  return (
    <TemplateWrapper {...props}>
      {loading
        ? props.circleLoading
          ? RenderCircleLoading
          : RenderLoading
        : templateReducer.items.length === 0
        ? RenderEmptyData()
        : RenderComponent()}
    </TemplateWrapper>
  );
}

export default React.memo(LayoutTemplate);
