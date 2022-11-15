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
      />
      <MetricItem
        title="Clicks"
        value={props.analytics?.clicks?.value.toString()}
        percent={RatePercent(props.analytics?.clicks?.analysisIndicator)}
      />
      <MetricItem
        title="Conversion Rate"
        value={
          props?.analytics
            ? `${
                props?.analytics &&
                props.analytics!.conversationRate!.value * 100
              }%`
            : undefined
        }
        percent={RatePercent(
          props.analytics?.conversationRate?.analysisIndicator
        )}
      />
    </MetricRoot>
  );
}

function RatePercent(val: number | undefined): number | undefined {
  if (val !== undefined) {
    if (val < 0) return (0 - val) * 100;
    return val * 100;
  }
  return undefined;
}
