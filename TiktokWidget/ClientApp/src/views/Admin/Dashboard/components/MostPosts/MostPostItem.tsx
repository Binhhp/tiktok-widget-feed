import { NumberFormatter } from "common/functions/NumberFormatter";
import React from "react";
import { MostPostItem } from "./style";
type IProp = {
  img?: string;
  impressionCount: number;
  clickCount: number;
  url: string;
};
const MostPostItemComponent: React.FC<IProp> = ({
  img,
  clickCount,
  impressionCount,
  url,
}) => {
  return (
    <MostPostItem>
      <a href={url} target="_blank" rel="noreferrer" className="poster">
        <img src={img} alt={"img post"} />
      </a>
      <div className="content">
        <div className="content-item">
          <span className="name">Impression:</span>
          <span className="value">
            {NumberFormatter.FormatLocaleString(impressionCount)}
          </span>
        </div>
        <div className="content-item">
          <span className="name">Clicks:</span>
          <span className="value">
            {NumberFormatter.FormatLocaleString(clickCount)}
          </span>
        </div>
      </div>
    </MostPostItem>
  );
};

export default MostPostItemComponent;
