import React, { useContext, useEffect, useState } from "react";
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
import Skeleton from "react-loading-skeleton";
import { PlayMinor } from "@shopify/polaris-icons";
import LayoutList from "./Layouts/List";
import Masonries from "./Layouts/Masonry";
import Slider from "./Layouts/Slider";
import Carousel from "./Layouts/Carourel";
import LoadingInfinite from "ui-components/Loading/ButtonLoading";
import { LayoutTemplateContext } from "./LayoutTemplateContext";
import config from "config";

SwiperCore.use([Autoplay, Navigation]);

function LayoutTemplate(props: ITemplateProps) {
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(true);

  const templateContext = useContext(LayoutTemplateContext);

  const fetchData = () => {
    setLoadingButton(true);
    let showItems = 0;
    if (
      props.type === TemplateType.Slider ||
      props.type === TemplateType.Carousel
    ) {
      showItems = config.sliderShowItem;
    }
    let page = templateContext.state.pageIndex;
    props._queryData(page, showItems).then((res) => {
      if (res?.data.length > 0) {
        templateContext.OnSetItems({
          count: res.count,
          items: res.data,
        });
      }
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
        : templateContext.state.items.length === 0
        ? RenderEmptyData()
        : RenderComponent()}
    </TemplateWrapper>
  );
}

export default React.memo(LayoutTemplate);
