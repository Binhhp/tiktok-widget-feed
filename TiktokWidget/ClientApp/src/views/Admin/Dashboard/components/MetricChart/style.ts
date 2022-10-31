import styled from 'Dependencies/StyledComponents/Container';

export const MetricChartRoot = styled('div')`
  margin-top: 20px;
`;
export const MetricRoot = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 24px;
`;
export const MetricBox = styled('div')`
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  border: 1px solid #eaecf0;
  padding: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  p.title {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
  }
  p.value {
    font-weight: 600;
    font-size: 30px;
    line-height: 38px;
    color: #101828;
    margin-top: 8px;
  }
  p.percent {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }
`;
