import { Select } from '@shopify/polaris';
import React from 'react';
import { useState, useCallback } from 'react';
export type DateRangeProps = {
  label?: React.ReactNode;
};
const DateRange: React.FC<DateRangeProps> = ({ label }) => {
  const [selected, setSelected] = useState('lastWeek');

  const handleSelectChange = useCallback(
    (value: string, id: string) => setSelected(value),
    [],
  );

  const options = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: 'lastWeek' },
    { label: 'Last 30 days', value: 'lastMonth' },
    { label: 'Last 60 days', value: 'last60d' },
    { label: 'Custom', value: 'custom', disabled: true },
  ];

  return (
    <Select
      label={label}
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
};

export default DateRange;
