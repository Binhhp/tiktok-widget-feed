import React from "react";
import { useState, useCallback } from "react";
import { Popover, DatePicker, Button, TextField, Icon } from "@shopify/polaris";
import { SelectMinor, TickSmallMinor } from "@shopify/polaris-icons";
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

  const [valueDisplay, setValueDisplay] = useState("Last 7 days");
  const [activeDateRange, setActiveDateRange] = useState(false);
  const [popoverActive, setPopoverActive] = useState(false);

  const [inSelectedCustom, setInSelectedCustom] = useState(false);

  const [selectedDates, setSelectedDates] = useState({
    start: new Date((dateRangeSate && dateRangeSate!.startDate) ?? ""),
    end: new Date((dateRangeSate && dateRangeSate!.endDate) ?? ""),
  });

  const [selected, setSelected] = useState<number>(7);

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
        active: valueDisplay === "Today",
        suffix: valueDisplay === "Today" && <Icon source={TickSmallMinor} />,
      },
      {
        content: "Yesterday",
        onAction: () => {
          setTimeout(() => setInSelectedCustom(false), 100);
          handleChangeDateRange("1", "Yesterday");
        },
        value: "1",
        active: valueDisplay === "Yesterday",
        suffix: valueDisplay === "Yesterday" && (
          <Icon source={TickSmallMinor} />
        ),
      },
      {
        content: "Last 7 days",
        onAction: () => {
          setTimeout(() => setInSelectedCustom(false), 100);
          handleChangeDateRange("7", "Last 7 days");
        },
        value: "7",
        active: valueDisplay === "Last 7 days",
        suffix: valueDisplay === "Last 7 days" && (
          <Icon source={TickSmallMinor} />
        ),
      },
      {
        content: "Last 30 days",
        onAction: () => {
          setTimeout(() => setInSelectedCustom(false), 100);
          handleChangeDateRange("30", "Last 30 days");
        },
        value: "30",
        active: valueDisplay === "Last 30 days",
        suffix: valueDisplay === "Last 30 days" && (
          <Icon source={TickSmallMinor} />
        ),
      },
      {
        content: "Last 60 days",
        onAction: () => {
          setTimeout(() => setInSelectedCustom(false), 100);
          handleChangeDateRange("60", "Last 60 days");
        },
        value: "60",
        active: valueDisplay === "Last 60 days",
        suffix: valueDisplay === "Last 60 days" && (
          <Icon source={TickSmallMinor} />
        ),
      },
      {
        content: "Custom",
        onAction: () => {
          setTimeout(() => setInSelectedCustom(false), 100);
          handleChangeDateRange("-1", "Custom");
        },
        value: "-1",
        active: valueDisplay === "Custom",
        suffix: valueDisplay === "Custom" && <Icon source={TickSmallMinor} />,
      },
    ],
    [handleChangeDateRange, valueDisplay]
  );

  React.useEffect(() => {
    if (selected >= 0) {
      if (selected === 1) {
        const yesterday = addDays(new Date(), -selected);
        setSelectedDates({
          start: yesterday,
          end: yesterday,
        });
      } else {
        const endDateNow = new Date();
        const startDate = addDays(endDateNow, -selected);
        setSelectedDates({
          start: startDate,
          end: endDateNow,
        });
      }
    }
  }, [selected, handleOnChangeDateRange]);

  React.useEffect(() => {
    const _startDate = new Date(
      (dateRangeSate && dateRangeSate?.startDate) ?? ""
    );
    const _endDate = new Date((dateRangeSate && dateRangeSate?.endDate) ?? "");
    let _dateDiffDays = dateDiffDays(_startDate, _endDate);

    if (_dateDiffDays >= 0) {
      if (_dateDiffDays === 1) {
        _dateDiffDays = -1;
      }

      const findIndexOption = optionsDateRange.findIndex(
        (x: any) => x.value === _dateDiffDays.toString()
      );

      if (
        optionsDateRange?.[findIndexOption] &&
        _endDate.getDate() === new Date().getDate()
      ) {
        _dateDiffDays = parseInt(optionsDateRange?.[findIndexOption]?.value);
        setValueDisplay(optionsDateRange?.[findIndexOption].content);
      } else {
        const yesterday = addDays(new Date(), -1).getDate();
        if (
          _endDate.getDate() === yesterday &&
          _startDate.getDate() === yesterday
        ) {
          _dateDiffDays = 1;
          setValueDisplay(optionsDateRange[1].content);
        } else {
          _dateDiffDays = -1;
          setValueDisplay(optionsDateRange[5].content);
        }
      }

      setSelected(_dateDiffDays);
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
    setSelected(7);
    setActiveDateRange(false);
    setValueDisplay(optionsDateRange[2].content);
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
