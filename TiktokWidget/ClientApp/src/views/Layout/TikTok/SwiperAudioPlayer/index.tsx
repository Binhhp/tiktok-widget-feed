import AudioPlayerSlider from "./AudioPlayerSlider";
import React from "react";
import { IAudioPlayerSliderProps } from "./AudioPlayerType";

function AudioPlayerContainer(props: IAudioPlayerSliderProps) {
  return <AudioPlayerSlider {...props} />;
}

export default React.memo(AudioPlayerContainer);
