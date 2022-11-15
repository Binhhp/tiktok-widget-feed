import {
  BarControllerChartOptions,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";

type optionChart =
  | _DeepPartialObject<
      CoreChartOptions<"bar"> &
        ElementChartOptions<"bar"> &
        PluginChartOptions<"bar"> &
        DatasetChartOptions<"bar"> &
        ScaleChartOptions &
        BarControllerChartOptions
    >
  | undefined;

export const options: optionChart = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      align: "end",
      title: {
        color: "#667085",
      },
      labels: {
        padding: 4,
        boxHeight: 6,
        boxWidth: 6,
        boxPadding: 6,
        usePointStyle: true,
        font: {
          family: "SF Pro Display",
          size: 14,
        },
      },
    },
    title: {
      display: true,
    },
  },
};

export const legendMargin = {
  id: "legendMargin",
  beforeInit(chart: any, legend: any, options: any) {
    const fitValue = chart.legend.fit;
    chart.legend.fit = function fit() {
      fitValue.bind(chart.legend)();
      return (this.height += 20);
    };
  },
};
export const afterDrawCustom = {
  id: "afterDraw",
  afterDraw: function (chart: any) {
    const checkDatasets = chart.data?.datasets;
    if (
      checkDatasets &&
      checkDatasets?.every((x: any) => x?.data?.length === 0)
    ) {
      var { ctx } = chart;
      const defaultFontString = '15px "SF Pro Display"';
      var width = chart.width;
      var height = chart.height;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = defaultFontString;
      ctx.save();
      ctx.restore();
      ctx.fillText("Data avaiable", width / 2, height / 2);
      ctx.save();
      ctx.restore();
      return chart;
    }
  },
};
