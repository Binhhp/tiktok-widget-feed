import React from 'react';
import { useState, useCallback } from 'react';
import {
  Popover,
  ActionList,
  TextContainer,
  DatePicker,
  Button,
  TextField,
  Icon,
} from '@shopify/polaris';
import { SelectMinor } from '@shopify/polaris-icons';
import {
  DateRangeRoot,
  DropdownRoot,
  InputDate,
  PopoverContent,
} from './DateRange';
import { DateRangeType } from 'stores/Admin/Application/state';
import Dropdown from './Dropdown';
import { DropdownMinor } from '@shopify/polaris-icons';
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

const DateRangePicker: React.FC<DateRangeProps> = ({
  label,
  valueDefault,
  onChangeDateRange,
}) => {
  const dateNow = new Date();
  const [{ month, year }, setDate] = useState({
    month: dateNow.getMonth() + 1,
    year: dateNow.getFullYear(),
  });
  const [valueDisplay, setValueDisplay] = useState('');
  const [activeDateRange, setActiveDateRange] = useState(false);
  const [popoverActive, setPopoverActive] = useState(false);
  console.log({ popoverActive, activeDateRange });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date((valueDefault && valueDefault!.startDate) ?? ''),
    end: new Date((valueDefault && valueDefault!.endDate) ?? ''),
  });

  const [selected, setSelected] = useState<number>(7);

  const handleMonthChange = useCallback(
    (month: any, year: any) => setDate({ month, year }),
    [],
  );
  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const handleChangeDateRange = useCallback((value: string, name: string) => {
    const _value = parseInt(value);
    setSelected(_value);
    setActiveDateRange(false);
    setValueDisplay(name);
  }, []);

  const optionsDateRange = React.useMemo(
    () => [
      {
        content: 'Today',
        onAction: () => handleChangeDateRange('0', 'Today'),
        value: '0',
      },
      {
        content: 'Yesterday',
        onAction: () => handleChangeDateRange('1', 'Yesterday'),
        value: '1',
      },
      {
        content: 'Last 7 days',
        onAction: () => handleChangeDateRange('7', 'Last 7 days'),
        value: '7',
      },
      {
        content: 'Last 30 days',
        onAction: () => handleChangeDateRange('30', 'Last 30 days'),
        value: '30',
      },
      {
        content: 'Last 60 days',
        onAction: () => handleChangeDateRange('60', 'Last 60 days'),
        value: '60',
      },
      {
        content: 'Custom',
        onAction: () => handleChangeDateRange('-1', 'Custom'),
        value: '-1',
      },
    ],
    [handleChangeDateRange],
  );

  React.useEffect(() => {
    if (selected >= 0) {
      const endDateNow = new Date();
      const startDate = addDays(endDateNow, -selected);
      // setSelectedDates?.({
      //   startDate: startDate.toString(),
      //   endDate: endDateNow.toString(),
      // });
      setSelectedDates({
        start: startDate,
        end: endDateNow,
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
      const findIndexOption = optionsDateRange.findIndex(
        (x: any) => x.value === _dateDiffDays.toString(),
      );
      if (
        findIndexOption > 0 &&
        convertShortDate(new Date().toString()) ===
          convertShortDate(_endDate.toString())
      ) {
        setSelected(_dateDiffDays);
      } else {
        setSelected(-1);
      }
      setValueDisplay(optionsDateRange?.[findIndexOption].content);
      setSelectedDates({
        start: _startDate,
        end: _endDate,
      });
    }
  }, [valueDefault, optionsDateRange]);

  const activator = (
    <DropdownRoot
      onClick={togglePopoverActive}
      style={{ borderColor: '#ccc', backgroundColor: 'white' }}>
      <div>{valueDisplay}</div>
      <div>
        <Icon source={SelectMinor} color='base' />
      </div>
    </DropdownRoot>
  );

  const handleSelectedDate = () => {
    onChangeDateRange?.({
      endDate: selectedDates.end.toString(),
      startDate: selectedDates.start.toString(),
    });
    togglePopoverActive();
  };

  const handleResetDate = () => {
    console.log('handleResetDate');
  };

  const handleChangeEnd = (value: any) => {
    console.log('handleChangeEnd');
  };

  const handleChangeStart = (value: any) => {
    console.log('handleChangeStart');
  };

  return (
    <DateRangeRoot>
      <div className='wrapper'>
        <Popover
          active={popoverActive}
          activator={activator}
          onClose={() => {
            console.log('onclose Popover');
          }}
          // sectioned
          // ariaHaspopup={'false'}
          // preferredPosition='mostSpace'
          fluidContent={true}>
          <PopoverContent>
            <div className='dashboard-filter-timezones'>
              <span>Date range</span>
              <Dropdown
                isActive={activeDateRange}
                handleActive={() => setActiveDateRange(true)}
                handleInActive={() => setActiveDateRange(false)}
                items={optionsDateRange}
                value={valueDisplay}
              />
            </div>

            <div className='date-picker'>
              <div className='input-date-wrapper'>
                <div className='input-time'>
                  <TextField
                    id='start-time'
                    value={convertShortDate(selectedDates.start.toString())}
                    onChange={handleChangeStart}
                    label='Starting'
                    type='text'
                    autoComplete='off'
                    disabled
                  />
                </div>
                <div className='input-time'>
                  <TextField
                    onChange={handleChangeEnd}
                    id='end-time'
                    value={convertShortDate(selectedDates.end.toString())}
                    label='Ending'
                    type='text'
                    autoComplete='off'
                    disabled
                  />
                </div>
              </div>
              <DatePicker
                month={month}
                year={year}
                onChange={setSelectedDates}
                onMonthChange={handleMonthChange}
                selected={selectedDates}
                multiMonth
                allowRange
              />
            </div>

            <div className='submit-group'>
              <Button onClick={handleSelectedDate} id='selected'>
                Selected DateTime
              </Button>
              <Button onClick={handleResetDate} id='reset'>
                Reset DateTime
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </DateRangeRoot>
  );
};

export default DateRangePicker;
