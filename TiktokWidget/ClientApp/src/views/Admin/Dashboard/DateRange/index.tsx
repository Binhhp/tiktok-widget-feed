import React from "react";
import { useState, useCallback } from "react";
import { Popover, DatePicker, Button, TextField, Icon } from "@shopify/polaris";
import { SelectMinor } from "@shopify/polaris-icons";
import { DateRangeRoot, DropdownRoot, PopoverContent } from "./DateRange";
import { DateRangeType } from "stores/Admin/Application/state";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationActionTS } from "stores/Admin/Application/action";
import { addDays, convertShortDate, dateDiffDays } from "./DateFunc";
import { RootReducer } from "stores/Admin/reducers";

const DateRangePicker = () => {
  const dateRangeSate = useSelector(
    (state: RootReducer) => state.AppReducer.dateRange
  );

  //Filter select datetime
  const dispatch = useDispatch();

  const handleOnChangeDateRange = React.useCallback(
    (dateRange: DateRangeType) => {
      dispatch(ApplicationActionTS.OnHandleChangeDateRange(dateRange));
    },
    [dispatch]
  );

  const dateNow = new Date();
  const [{ month, year }, setDate] = useState({
    month: dateNow.getMonth() - 1,
    year: dateNow.getFullYear(),
  });

  const [valueDisplay, setValueDisplay] = useState("");
  const [activeDateRange, setActiveDateRange] = useState(false);
  const [popoverActive, setPopoverActive] = useState(false);

  const [inSelectedCustom, setInSelectedCustom] = useState(false);

  const [selectedDates, setSelectedDates] = useState({
    start: new Date((dateRangeSate && dateRangeSate!.startDate) ?? ""),
    end: new Date((dateRangeSate && dateRangeSate!.endDate) ?? ""),
  });

  const [selected, setSelected] = useState<number>(0);

  const handleMonthChange = useCallback(
    (month: any, year: any) => setDate({ month, year }),
    []
  );
  const togglePopoverActive = () => {
    if (inSelectedCustom) return;
    setPopoverActive((popoverActive) => !popoverActive);
  };

  const handleChangeDateRange = useCallback((value: string, name: string) => {
    const _value = parseInt(value);
    setSelected(_value);
    setActiveDateRange(false);
    setValueDisplay(name);
    if (_value === -1) {
      const endDateNow = new Date();
      const startDate = addDays(endDateNow, -1);
      setSelectedDates({
        start: startDate,
        end: endDateNow,
      });
    }
  }, []);

  const optionsDateRange = React.useMemo(
    () => [
      {
        content: "Today",
        onAction: () => {
          setTimeout(() => setInSelectedCustom(false), 100);
          handleChangeDateRange("0", "Today");
        },
        value: "0",
      },
      {
        content: "Yesterday",
        onAction: () => {
          setTimeout(() => setInSelectedCustom(false), 100);
          handleChangeDateRange("1", "Yesterday");
        },
        value: "1",
      },
      {
        content: "Last 7 days",
        onAction: () => {
          setTimeout(() => setInSelectedCustom(false), 100);
          handleChangeDateRange("7", "Last 7 days");
        },
        value: "7",
      },
      {
        content: "Last 30 days",
        onAction: () => {
          setTimeout(() => setInSelectedCustom(false), 100);
          handleChangeDateRange("30", "Last 30 days");
        },
        value: "30",
      },
      {
        content: "Last 60 days",
        onAction: () => {
          setTimeout(() => setInSelectedCustom(false), 100);
          handleChangeDateRange("60", "Last 60 days");
        },
        value: "60",
      },
      {
        content: "Custom",
        onAction: () => {
          setTimeout(() => setInSelectedCustom(false), 100);
          handleChangeDateRange("-1", "Custom");
        },
        value: "-1",
      },
    ],
    [handleChangeDateRange]
  );

  React.useEffect(() => {
    if (selected >= 0) {
      const endDateNow = new Date();
      const startDate = addDays(endDateNow, -selected);
      setSelectedDates({
        start: startDate,
        end: endDateNow,
      });
    }
  }, [selected, handleOnChangeDateRange]);

  React.useEffect(() => {
    const _startDate = new Date(
      (dateRangeSate && dateRangeSate?.startDate) ?? ""
    );
    const _endDate = new Date((dateRangeSate && dateRangeSate?.endDate) ?? "");
    const _dateDiffDays = dateDiffDays(_startDate, _endDate);

    if (_dateDiffDays >= 0) {
      const findIndexOption = optionsDateRange.findIndex(
        (x: any) => x.value === _dateDiffDays.toString()
      );
      if (
        findIndexOption > 0 &&
        convertShortDate(new Date().toString()) ===
          convertShortDate(_endDate.toString())
      ) {
        setSelected(_dateDiffDays);
      }

      if (
        optionsDateRange?.[findIndexOption] &&
        _endDate.getDate() === new Date().getDate()
      ) {
        setValueDisplay(optionsDateRange?.[findIndexOption].content);
      } else {
        setValueDisplay(optionsDateRange[5].content);
      }
      setSelectedDates({
        start: _startDate,
        end: _endDate,
      });
    }
  }, [dateRangeSate]);

  const activator = (
    <DropdownRoot
      onClick={togglePopoverActive}
      style={{ borderColor: "#ccc", backgroundColor: "white" }}
    >
      <div>{valueDisplay}</div>
      <div>
        <Icon source={SelectMinor} color="base" />
      </div>
    </DropdownRoot>
  );

  const handleSelectedDate = () => {
    handleOnChangeDateRange?.({
      endDate: selectedDates.end.toString(),
      startDate: selectedDates.start.toString(),
    });
    togglePopoverActive();
  };

  const handleResetDate = () => {
    setSelected(0);
    setActiveDateRange(false);
    setValueDisplay("Today");
  };

  //Dropdown handle
  const handleDropdownCustom = () => {
    setInSelectedCustom(true);
    setActiveDateRange(true);
  };

  const handleExitDropdownCustom = () => {
    setActiveDateRange(false);
    setTimeout(() => {
      setInSelectedCustom(false);
    }, 100);
  };

  return (
    <DateRangeRoot>
      <div className="wrapper">
        <Popover
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
          sectioned
          ariaHaspopup={"false"}
          preferredPosition="mostSpace"
          fluidContent={true}
        >
          <PopoverContent>
            <div className="dashboard-filter-timezones">
              <span>Date range</span>
              <Dropdown
                isActive={activeDateRange}
                handleActive={handleDropdownCustom}
                handleInActive={handleExitDropdownCustom}
                items={optionsDateRange}
                value={valueDisplay}
              />
            </div>

            {selected === -1 && (
              <div className="date-picker">
                <div className="input-date-wrapper">
                  <div className="input-time">
                    <TextField
                      id="start-time"
                      value={convertShortDate(selectedDates.start.toString())}
                      label="Starting"
                      type="text"
                      autoComplete="off"
                      disabled
                    />
                  </div>
                  <div className="input-time">
                    <TextField
                      id="end-time"
                      value={convertShortDate(selectedDates.end.toString())}
                      label="Ending"
                      type="text"
                      autoComplete="off"
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
                  disableDatesAfter={new Date()}
                  disableDatesBefore={addDays(new Date(), -60)}
                />
              </div>
            )}

            <div className="submit-group">
              <Button onClick={handleSelectedDate} id="selected">
                Selected DateTime
              </Button>
              <Button onClick={handleResetDate} id="reset">
                Reset DateTime
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </DateRangeRoot>
  );
};

export default React.memo(DateRangePicker);
