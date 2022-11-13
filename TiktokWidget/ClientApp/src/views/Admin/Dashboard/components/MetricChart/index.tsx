import React from 'react';
import MetricItem from './MetricItem';
import { ChartRoot, MetricChartRoot, MetricRoot } from './style';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fetchDataAnalytics } from 'repositories/api';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { RootReducer } from 'stores/Admin/reducers';
import {
  IAnalytics,
  IAnalyticsResponse,
} from 'repositories/dtos/responses/IAnalytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const MetricChart = () => {
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  const shop = shopReducer?.shop?.domain || '';

  const dateRangeSate = useSelector(
    (state: RootReducer) => state.AppReducer.dateRange,
  );

  const { data, error } = useSWR(
    ['/Analytics', shop, dateRangeSate.startDate, dateRangeSate.startDate],
    () =>
      fetchDataAnalytics(shop, {
        StartTime: dateRangeSate.startDate,
        EndTime: dateRangeSate.endDate,
      }),
  );
  if (!data) {
    return <div>loading...</div>;
  }
  const { impression, analytics } = data || {};
  const dataChart = {
    labels:
      impression &&
      impression!.map((item) => {
        const date = new Date(item!.time ?? '');
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
    datasets: [
      {
        label: 'Impression',
        data: impression?.map((item) => item.impression),
        backgroundColor: '#7CD4FD',
        borderRadius: 10,
      },
      {
        label: 'Clicks',
        data: impression?.map((item) => item.clicks),
        backgroundColor: 'blue',
        borderRadius: 10,
      },
    ],
  };
  return (
    <MetricChartRoot>
      <MetricRoot>
        <MetricItem
          title='Impressions'
          value={analytics?.impression?.value.toString() ?? '0'}
          percent={analytics?.impression?.analysisIndicator}
        />
        <MetricItem
          title='Clicks'
          value={analytics?.clicks?.value.toString() ?? '0'}
          percent={analytics?.clicks?.analysisIndicator}
        />
        <MetricItem
          title='Conversion Rate'
          value={`${
            (analytics &&
              (analytics!.conversationRate!.value * 100).toFixed(2)) ??
            0
          }%`}
          percent={analytics?.conversationRate?.analysisIndicator}
        />
      </MetricRoot>
      <ChartRoot>
        <p className='title'>Widget Performance</p>
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
                align: 'end',
                title: {
                  color: '#667085',
                },
                labels: {
                  padding: 4,
                  boxHeight: 6,
                  boxWidth: 6,
                  boxPadding: 6,
                  usePointStyle: true,
                  font: {
                    family: 'SF Pro Display',
                    size: 14,
                  },
                },
              },
              title: {
                display: true,
              },
            },
          }}
          data={dataChart}
        />
      </ChartRoot>
    </MetricChartRoot>
  );
};

export default MetricChart;
