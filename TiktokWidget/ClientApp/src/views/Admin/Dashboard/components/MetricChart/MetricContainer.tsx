import React from "react";
import { IAnalytics } from "repositories/dtos/responses/IAnalytics";
import MetricItem from "./MetricItem";
import { MetricRoot } from "./style";

interface IMetricProps {
  analytics?: IAnalytics;
}
export default function MetricContainer(props: IMetricProps) {
  return (
    <MetricRoot>
      <MetricItem
        title="Impressions"
        value={props.analytics?.impression?.value.toString()}
        percent={RatePercent(props.analytics?.impression?.analysisIndicator)}
        status={props.analytics?.impression?.status}
      />
      <MetricItem
        title="Clicks"
        value={props.analytics?.clicks?.value.toString()}
        percent={RatePercent(props.analytics?.clicks?.analysisIndicator)}
        status={props.analytics?.clicks?.status}
      />
      <MetricItem
        title="Conversion Rate"
        value={
          props?.analytics
            ? `${
                props?.analytics &&
                Math.round(props.analytics!.conversationRate!.value * 10000) /
                  100
              }%`
            : undefined
        }
        percent={RatePercent(
          props.analytics?.conversationRate?.analysisIndicator
        )}
        status={props.analytics?.conversationRate?.status}
      />
    </MetricRoot>
  );
}

function RatePercent(
  val: number | undefined,
  isRounding?: boolean
): number | undefined {
  if (val !== undefined) {
    const result = val * 100;
    if (isRounding) {
      return Math.round(result) / 100;
    }
    return result;
  }
  return undefined;
}
