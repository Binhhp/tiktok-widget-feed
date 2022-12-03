import { UriProvider } from "common/functions/FuncUtils";
import { NumberFormatter } from "common/functions/NumberFormatter";
import config from "config";
import React from "react";
import { MostPostItem } from "./style";
type IProp = {
  img?: string;
  impressionCount: number;
  clickCount: number;
  url: string;
  desc: string;
};
const MostPostItemComponent: React.FC<IProp> = ({
  img,
  clickCount,
  impressionCount,
  url,
  desc,
}) => {
  return (
    <MostPostItem>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="orichi-post-poster"
      >
        <img
          src={UriProvider.FormatURLImage(img, config.CORS_PROXY, true)}
          alt={desc ?? "Post Popular"}
        />
      </a>
      <div className="orichi-post-content">
        <div className="orichi-post-content-item">
          <span className="orichi-post-name">Impression:</span>
          <span className="orichi-post-value">
            {NumberFormatter.FormatLocaleString(impressionCount)}
          </span>
        </div>
        <div className="orichi-post-content-item">
          <span className="orichi-post-name">Clicks:</span>
          <span className="orichi-post-value">
            {NumberFormatter.FormatLocaleString(clickCount)}
          </span>
        </div>
      </div>
    </MostPostItem>
  );
};

export default MostPostItemComponent;
