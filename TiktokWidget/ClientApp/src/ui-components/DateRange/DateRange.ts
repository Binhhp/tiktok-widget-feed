import styled from 'Dependencies/StyledComponents/Container';

export const DateRangeRoot = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  width: 29%;

  .wrapper {
  }
`;

export const PopoverContent = styled('div')`
  padding: 20px;
  width: 500px;

  @media screen and (max-width: 767px) {
    & {
      width: 100%;
    }
  }
  .date-picker {
    margin-top: 20px;
    width: 100%;

    .Polaris-DatePicker__MonthLayout {
      flex-wrap: nowrap;
    }

    .input-date-wrapper {
      display: flex;
      column-gap: 20px;
      margin-bottom: 20px;
      .input-time {
        flex: 1;
      }
    }
  }

  .submit-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;
    align-items: stretch;

    & #selected {
      margin-right: 10px;
      width: calc(50% - 10px);
    }
    & #reset {
      margin-left: 5px;
    }
    & #selected {
      margin-right: 5px;
      background-color: rgba(44, 110, 203, 1);
      color: #fff5ea;
    }
    & button {
      width: 50%;
      font-size: 11px;
    }
  }
`;

export const InputDate = styled('input')`
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  padding: 8px 12px;
  color: #202223;
  background: #ffffff;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  border: none;
  text-transform: initial;
  letter-spacing: initial;
`;

export const DropdownRoot = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 6px 6px 6px 14px;
  border-radius: 4px;
  font-size: 14px;
  color: gray;
  margin-top: 0.4rem;
  width: 100%;
  cursor: pointer;
`;
