import { Icon } from "@shopify/polaris";
import { MobileCancelMajor } from "@shopify/polaris-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoPlayer from "./VideoPlayer";
import {
  DivVideoContainer,
  DivBlurBackground,
  VideoScrollWrapper,
  ButtonBasicClose,
} from "./VideoScrollStyle";
import SwiperCore, { Pagination, Mousewheel } from "swiper";
import { TemplateStoreActionTS } from "stores/Templates/action";
import { ErrorCodePlayer } from "./VideoPlayer/ErrorCode";
import { IErrorPlayer } from "./VideoPlayer/VideoType";
import { TemplateStoreModel } from "stores/Templates/state";
import { RootTikTokReducer } from "stores/TikTokReducer";

SwiperCore.use([Pagination, Mousewheel]);

export interface IVideoScrollProps {
  id: string;
}
function VideoScroll(props: IVideoScrollProps) {
  const templateReducer: TemplateStoreModel = useSelector(
    (state: RootTikTokReducer) =>
      state.templateStoreReducer.filter((x) => x.id === props.id)[0]
  );

  const [hidden, setHidden] = useState(false);
  const onHandleContentVideo = () => setHidden(!hidden);

  const dispatch = useDispatch();

  const [swiperController, setSwiperController] = useState<SwiperCore>();
  useEffect(() => {
    if (
      templateReducer?.index &&
      templateReducer?.index?.realIndex &&
      templateReducer?.index?.realIndex !== undefined
    ) {
      swiperController?.slideTo(templateReducer.index.realIndex);
    }
  }, [JSON.stringify(templateReducer?.index?.realIndex)]);

  const [idActive, setIdActive] = useState<string | undefined>("");
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<IErrorPlayer | undefined>({
    active: false,
    message: "",
  });

  const onActiveIndexVideo = (index: number) => () => {
    const idIndexItem = templateReducer.items[index].id;
    if (idActive !== idIndexItem) {
      setIdActive(idIndexItem);
    }
    setLoading(true);
    if (error?.active) {
      setTimeout(() => {
        setError({
          active: false,
          message: "",
        });
      }, 100);
    }
  };

  const onPlaying = (id?: string) => () => {
    if (loading) setLoading(false);
    if (!idActive) setIdActive(id);
  };

  const onPause = () => setIdActive(undefined);

  const onError = (error: any) => {
    setError({
      active: true,
      message: ErrorCodePlayer.CantLoadPlayer,
    });
  };

  const onCloseModal = () => {
    setHidden(false);
    setIdActive(undefined);
    setError({ ...error, active: false });
    dispatch(
      TemplateStoreActionTS.OnActiveItem(props.id, {
        active: false,
        realIndex: 0,
      })
    );
  };
  return templateReducer?.items && templateReducer?.items?.length > 0 ? (
    <VideoScrollWrapper active={templateReducer.index.active}>
      <Swiper
        onActiveIndexChange={(swiper) => {
          if (templateReducer.index.active) {
            onActiveIndexVideo(swiper.activeIndex)();
          }
        }}
        onSwiper={setSwiperController}
        initialSlide={templateReducer.index.realIndex}
        slideNextClass="button-next"
        slidePrevClass="button-prev"
        className="swiper-video-scroll"
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        navigation
        updateOnWindowResize
        observer={true}
        observeParents={true}
        tabIndex={templateReducer.index.realIndex}
      >
        {templateReducer.items.map((item, index) => (
          <SwiperSlide key={`video-${index}`}>
            <DivVideoContainer>
              <DivBlurBackground url={item.video?.originCover} />
              <VideoPlayer
                hidden={hidden}
                onSetHidden={onHandleContentVideo}
                playing={idActive !== undefined && item.id === idActive}
                loading={loading}
                onPlaying={onPlaying}
                onPause={onPause}
                item={item}
                error={error}
                onError={onError}
                options={item}
              />
            </DivVideoContainer>
          </SwiperSlide>
        ))}
      </Swiper>
      <ButtonBasicClose onClick={onCloseModal}>
        <Icon source={MobileCancelMajor} />
      </ButtonBasicClose>
    </VideoScrollWrapper>
  ) : (
    <></>
  );
}

export default VideoScroll;
