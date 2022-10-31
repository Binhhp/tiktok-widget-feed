import React from 'react';
import { MetricBox } from './style';
import chartDownTrend from 'assets/images/Buttons/chartDownTrend.png';
import chartUpTrend from 'assets/images/Buttons/chartUpTrend.png';
import chartZero from 'assets/images/Buttons/chartZero.png';
type IProp = {
  title: string;
  value: string;
  percent: number;
};

const MetricItem: React.FC<IProp> = ({ title, value, percent }) => {
  const styleChart =
    percent === 0
      ? {
          color: '#262626',
          img: chartZero,
        }
      : percent > 0
      ? {
          color: '#5E8E3E',
          img: chartUpTrend,
        }
      : {
          color: '#FF0B53',
          img: chartDownTrend,
        };
  return (
    <MetricBox>
      <div>
        <p className='title'>{title}</p>
        <p className='value'>{value}</p>
      </div>
      <div
        style={{
          color: styleChart.color,
        }}>
        <img src={styleChart.img} alt={title} />
        <p className='percent'>{`${percent.toFixed(2)} %`}</p>
      </div>
    </MetricBox>
  );
};

export default MetricItem;
