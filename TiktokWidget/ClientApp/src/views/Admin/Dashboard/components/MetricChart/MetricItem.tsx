import React from "react";
import { MetricBox } from "./style";
import chartDownTrend from "assets/images/Buttons/chartDownTrend.png";
import chartUpTrend from "assets/images/Buttons/chartUpTrend.png";
import chartZero from "assets/images/Buttons/chartZero.png";
import Skeleton from "react-loading-skeleton";
import { StatusAnalystic } from "repositories/dtos/responses/IAnalytics";
type IProp = {
  title: string;
  value?: string;
  percent?: number;
  status?: StatusAnalystic;
};

const MetricItem: React.FC<IProp> = ({ title, value, percent, status }) => {
  const styleChart =
    status === StatusAnalystic.NoChange
      ? {
          color: "#262626",
          img: chartZero,
        }
      : status === StatusAnalystic.Up
      ? {
          color: "#5E8E3E",
          img: chartUpTrend,
        }
      : {
          color: "#FF0B53",
          img: chartDownTrend,
        };
  return (
    <MetricBox>
      <div>
        <p className="orichi-chart-title">{title}</p>
        <p className="orichi-chart-value">
          {value ?? <Skeleton inline width={100} />}
        </p>
      </div>
      <div
        style={{
          color: styleChart.color,
        }}
      >
        {percent !== undefined ? (
          <img src={styleChart.img} alt={title} />
        ) : (
          <Skeleton inline width={100} />
        )}
        <p className="orichi-chart-percent">
          {percent !== undefined ? (
            `${Math.round(percent * 100) / 100 ?? 0} %`
          ) : (
            <Skeleton inline width={100} />
          )}
        </p>
      </div>
    </MetricBox>
  );
};

export default MetricItem;
