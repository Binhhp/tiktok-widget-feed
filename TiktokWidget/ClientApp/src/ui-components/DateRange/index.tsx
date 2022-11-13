import { Select } from '@shopify/polaris';
import React from 'react';
import { useState, useCallback } from 'react';
import { Button, Modal, TextContainer, DatePicker } from '@shopify/polaris';

import { DateRangeRoot } from './DateRange';
import { DateRangeType } from 'stores/Admin/Application/state';
export type DateRangeProps = {
  label?: React.ReactNode;
  onChangeDateRange?: (_dateRange: DateRangeType) => void;
  valueDefault?: DateRangeType;
};
export function convertShortDate(date: string): string {
  const _date = new Date(date);
  return _date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
export function dateDiffDays(date1: Date, date2: Date): number {
  const Difference_In_Time = date2.getTime() - date1.getTime();

  return Difference_In_Time / (1000 * 3600 * 24);
}

const DateRange: React.FC<DateRangeProps> = ({
  label,
  valueDefault,
  onChangeDateRange,
}) => {
  const [{ month, year }, setDate] = useState({ month: 11, year: 2022 });
  const [activeDateRange, setActiveDateRange] = useState(false);

  const [selectedDates, setSelectedDates] = useState({
    start: new Date((valueDefault && valueDefault!.startDate) ?? ''),
    end: new Date((valueDefault && valueDefault!.endDate) ?? ''),
  });

  const [selected, setSelected] = useState<number>(7);

  const handleMonthChange = useCallback(
    (month: any, year: any) => setDate({ month, year }),
    [],
  );

  const handleChangeActiveModal = useCallback(
    () => setActiveDateRange(!activeDateRange),
    [activeDateRange],
  );

  const options = React.useMemo(
    () => [
      { label: 'Today', value: '0' },
      { label: 'Yesterday', value: '1' },
      { label: 'Last 7 days', value: '7' },
      { label: 'Last 30 days', value: '30' },
      { label: 'Last 60 days', value: '60' },
      { label: 'Custom', value: '-1' },
    ],
    [],
  );

  const handleSelectChange = useCallback(
    (value: string, id: string) => {
      const _value = parseInt(value);
      if (_value < 0) {
        // setActiveDateRange(true);
        handleChangeActiveModal();
      }
      setSelected(_value);
    },
    [handleChangeActiveModal],
  );

  React.useEffect(() => {
    if (selected >= 0) {
      const endDateNow = new Date();
      const startDate = addDays(endDateNow, -selected);
      console.log({ startDate, endDateNow });
      console.log('date diff', dateDiffDays(startDate, endDateNow));
      onChangeDateRange?.({
        startDate: startDate.toString(),
        endDate: endDateNow.toString(),
      });
    }
  }, [selected, onChangeDateRange]);

  React.useEffect(() => {
    const _startDate = new Date(
      (valueDefault && valueDefault?.startDate) ?? '',
    );
    const _endDate = new Date((valueDefault && valueDefault?.endDate) ?? '');
    const _dateDiffDays = dateDiffDays(_startDate, _endDate);

    if (_dateDiffDays >= 0) {
      const findIndexOption = options.findIndex(
        (x) => x.value === _dateDiffDays.toString(),
      );
      if (findIndexOption > 0) {
        setSelected(_dateDiffDays);
      } else {
        setSelected(-1);
      }
      setSelectedDates({
        start: _startDate,
        end: _endDate,
      });
    }
  }, [valueDefault, options]);

  const handleOkeDatePicker = () => {
    console.log({ selectedDates });
    onChangeDateRange?.({
      endDate: selectedDates.end.toString(),
      startDate: selectedDates.start.toString(),
    });
    handleChangeActiveModal();
  };
  return (
    <DateRangeRoot>
      <Select
        label={label}
        options={options}
        onChange={handleSelectChange}
        value={selected.toString()}
      />

      <div style={{ height: '500px' }}>
        <Modal
          open={activeDateRange}
          onClose={handleChangeActiveModal}
          title='Date picker'
          primaryAction={{
            content: 'OK',
            onAction: handleOkeDatePicker,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleChangeActiveModal,
            },
          ]}>
          <Modal.Section>
            <DatePicker
              month={month}
              year={year}
              onChange={setSelectedDates}
              onMonthChange={handleMonthChange}
              selected={selectedDates}
              allowRange
            />
          </Modal.Section>
        </Modal>
      </div>
    </DateRangeRoot>
  );
};

export default DateRange;
