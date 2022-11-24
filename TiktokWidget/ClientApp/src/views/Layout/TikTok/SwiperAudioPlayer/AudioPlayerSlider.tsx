import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoPlayer from "./VideoPlayer";
import {
  DivVideoContainer,
  DivBlurBackground,
  VideoScrollWrapper,
  ButtonBasicClose,
} from "./AudioPlayerStyle";
import SwiperCore, { Pagination, Mousewheel } from "swiper";
import { ErrorCodePlayer } from "./VideoPlayer/ErrorCode";
import { IErrorPlayer } from "./VideoPlayer/VideoType";
import { LayoutTemplateContext } from "Dependencies/TikTokLayout/LayoutTemplateContext";
import { IAudioPlayerSliderProps } from "./AudioPlayerType";
import { AudioPlayerContext } from "./AudioPlayerContext";
import IconClose from "assets/svg/Close";

SwiperCore.use([Pagination, Mousewheel]);

function AudioPlayerSlider(props: IAudioPlayerSliderProps) {
  const templateContext = useContext(LayoutTemplateContext);

  const [hidden, setHidden] = useState(false);
  const onHandleContentVideo = () => setHidden(!hidden);

  const [swiperController, setSwiperController] = useState<SwiperCore>();
  useEffect(() => {
    if (
      templateContext.state.index &&
      templateContext.state.index?.realIndex !== undefined
    ) {
      swiperController?.slideTo(templateContext.state.index.realIndex);
    }
  }, [JSON.stringify(templateContext.state?.index?.realIndex)]);

  const audioPlayerContext = useContext(AudioPlayerContext);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<IErrorPlayer | undefined>({
    active: false,
    message: "",
  });

  const onActiveIndexVideo = (index: number) => () => {
    const item = templateContext.state.items[index];
    if (audioPlayerContext.videoId !== item.id) {
      audioPlayerContext.handleVideoClick(item.id);
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
    if (id) {
      audioPlayerContext.handleVideoClick(id);
      audioPlayerContext.handleSetStatus("Playing");
    }
  };

  const onPause = () => audioPlayerContext.handleSetStatus("Paused");

  const onError = (error: any) => {
    setError({
      active: true,
      message: ErrorCodePlayer.CantLoadPlayer,
    });
  };

  const onHandleClose = () => {
    setHidden(false);
    audioPlayerContext.handleVideoClick(undefined);
    setError({ ...error, active: false });
    templateContext.OnActiveItem({
      realIndex: 0,
      active: false,
    });
  };

  const onActiveIndexChangeSwiper = (swiper: SwiperCore) => {
    if (templateContext.state.index.active) {
      onActiveIndexVideo(swiper.activeIndex)();
    }
  };

  return templateContext.state?.items &&
    templateContext.state?.items?.length > 0 ? (
    <VideoScrollWrapper active={templateContext.state.index.active}>
      <Swiper
        onActiveIndexChange={onActiveIndexChangeSwiper}
        onSwiper={setSwiperController}
        initialSlide={templateContext.state.index.realIndex}
        slideNextClass="orichi-tiktok-player-next"
        slidePrevClass="orichi-tiktok-player-prev"
        className="orichi-tiktok-slider"
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        navigation
        updateOnWindowResize
        observer={true}
        observeParents={true}
        tabIndex={templateContext.state.index.realIndex}
      >
        {templateContext.state.items.map((item) => (
          <SwiperSlide key={`video-${item.id}`}>
            <DivVideoContainer>
              <DivBlurBackground url={item.video?.originCover} />
              <VideoPlayer
                videoId={audioPlayerContext.videoId}
                hidden={hidden}
                onSetHidden={onHandleContentVideo}
                playing={
                  audioPlayerContext.videoId !== undefined &&
                  item.id === audioPlayerContext.videoId &&
                  audioPlayerContext.status === "Playing"
                }
                loading={loading}
                onPlaying={onPlaying}
                onPause={onPause}
                item={item}
                error={error}
                onError={onError}
                options={props.widget}
              />
            </DivVideoContainer>
          </SwiperSlide>
        ))}
      </Swiper>
      <ButtonBasicClose onClick={onHandleClose}>
        <IconClose />
      </ButtonBasicClose>
    </VideoScrollWrapper>
  ) : (
    <></>
  );
}

export default AudioPlayerSlider;
