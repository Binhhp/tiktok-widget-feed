import React from "react";
import { ChartRoot, MetricChartRoot } from "./style";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { fetchDataAnalytics } from "repositories/api";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { afterDrawCustom, legendMargin, options } from "./AnalysticProvider";
import MetricContainer from "./MetricContainer";
import SniperLoading from "ui-components/Loading/SniperLoading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MetricChart = () => {
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);
  const shop = shopReducer?.shop?.domain || "";

  const dateRangeSate = useSelector(
    (state: RootReducer) => state.AppReducer.dateRange
  );

  const { data, error } = useSWR(
    ["/Analytics", shop, dateRangeSate.startDate, dateRangeSate.startDate],
    () =>
      fetchDataAnalytics(shop, {
        StartTime: dateRangeSate.startDate,
        EndTime: dateRangeSate.endDate,
      })
  );

  const plugins = [legendMargin, afterDrawCustom];

  const { impression, analytics } = data || {};
  let dataChart: ChartData<"bar", (string | undefined)[] | undefined, string> =
    {
      labels:
        impression &&
        impression!.map((item) => {
          const date = new Date(item!.time ?? "");
          return `${date.getDate()}/${date.getMonth() + 1}`;
        }),
      datasets: [
        {
          label: "Impression",
          data: impression?.map((item) => item.impression),
          backgroundColor: "#7CD4FD",
          borderRadius: 10,
          barPercentage: 0.3,
          categoryPercentage: 0.6,
        },
      ],
    };

  return (
    <MetricChartRoot>
      <MetricContainer analytics={analytics} />
      <ChartRoot>
        <p className="orichi-chart-title">Widget Performance</p>
        {impression ? (
          <Bar options={options} data={dataChart} plugins={plugins} />
        ) : (
          <SniperLoading />
        )}
      </ChartRoot>
    </MetricChartRoot>
  );
};

export default MetricChart;
