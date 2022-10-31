import React from 'react';
import MetricItem from './MetricItem';
import { MetricChartRoot, MetricRoot } from './style';

const MetricChart = () => {
  return (
    <MetricChartRoot>
      <MetricRoot>
        <MetricItem title='Impressions' value={'28'} percent={5.28} />
        <MetricItem title='Clicks' value={'14'} percent={5.28} />
        <MetricItem title='Conversion Rate' value={'50%'} percent={5.28} />
      </MetricRoot>
    </MetricChartRoot>
  );
};

export default MetricChart;
