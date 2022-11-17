import React, { useState } from "react";
import ReactPlayer from "react-player";
import {
  DivBasicPlayerWrapper,
  DivContainer,
  DivContent,
  DivErrorVideo,
  DivLoader,
  DivPlayerIcon,
  DivPlayerIconContainer,
  DivVideoPlay,
  DivVideoWrapper,
  ImgPoster,
} from "./VideoStyle";
import { IErrorPlayer, IVideoProps, StatusType } from "./VideoType";
import TikTokLoader from "ui-components/Loading/TikTokLoader";
import Loader from "ui-components/Loading/ComponentLoader";
import { ErrorCodePlayer } from "./ErrorCode";

function VideoPlayer(props: IVideoProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IErrorPlayer | undefined>({
    active: false,
    message: "",
  });

  const [status, setStatus] = React.useState<StatusType>("Playing");
  const handleSetStatus = (sts: StatusType) => setStatus(sts);

  const onPlaying = () => {
    if (loading) setLoading(false);
    handleSetStatus("Playing");
  };
  const onPause = () => handleSetStatus("Paused");
  const onError = (error: any) => {
    setError({
      active: true,
      message: ErrorCodePlayer.CantLoadPlayer,
    });
  };
  return (
    <DivVideoWrapper>
      <DivContainer className={`${props.hidden ? "visible" : "show"}`}>
        <DivContent>
          <DivVideoPlay>
            <ImgPoster
              crossorigin="anonymous"
              height="100%"
              loading="lazy"
              src={
                props.corsProxy
                  ? `${props.corsProxy}${props.image}`
                  : props.image
              }
              alt={props.image}
            ></ImgPoster>
            <DivLoader>
              <TikTokLoader></TikTokLoader>
            </DivLoader>
            <DivErrorVideo hidden={!error?.active} className="error-video">
              <h2>{error?.message}</h2>
            </DivErrorVideo>
            <DivBasicPlayerWrapper hidden={loading}>
              <ReactPlayer
                playIcon={
                  <DivPlayerIconContainer>
                    <DivPlayerIcon></DivPlayerIcon>
                  </DivPlayerIconContainer>
                }
                key={`player-${props.playSrc}`}
                onStart={onPlaying}
                fallback={<Loader></Loader>}
                onPause={onPause}
                onPlay={onPlaying}
                muted={props.muted}
                url={
                  props.corsProxy
                    ? `${props.corsProxy}${props.playSrc}`
                    : props.playSrc
                }
                playing={status === "Playing"}
                stopOnUnmount={true}
                loop={true}
                width={loading ? 0 : `100%`}
                height="100%"
                controls
                onError={(error) => {
                  onError(error);
                }}
              />
              <DivPlayerIconContainer
                onClick={onPlaying}
                hidden={status === "Playing"}
              >
                <DivPlayerIcon></DivPlayerIcon>
              </DivPlayerIconContainer>
            </DivBasicPlayerWrapper>
          </DivVideoPlay>
        </DivContent>
      </DivContainer>
    </DivVideoWrapper>
  );
}

export default React.memo(VideoPlayer);
