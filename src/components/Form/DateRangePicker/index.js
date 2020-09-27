import React, { useState } from "react";
import {
  FormGroup,
  Button,
  Label,
  Input,
  Popover,
  PopoverBody,
} from "reactstrap";
import PropTypes from "prop-types";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange as RangePicker } from "react-date-range";
import moment from "moment";
import "./styles.scss";

const DateRangePicker = ({ label, ...otherProps }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => {
    setPopoverOpen(!popoverOpen);
  };

  return (
    <FormGroup>
      {label && <Label>{label}</Label>}
      <Input
        value={
          moment(otherProps.ranges[0].startDate).format("DD/MM/YYYY") +
          " - " +
          moment(otherProps.ranges[0].endDate).format("DD/MM/YYYY")
        }
        id="dateRange"
        className="range-picker"
        readOnly
      />
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        toggle={toggle}
        hideArrow={false}
        target="dateRange"
      >
        <RangePicker {...otherProps} />
      </Popover>
    </FormGroup>
  );
};

DateRangePicker.propTypes = {
  label: PropTypes.string,
};

DateRangePicker.defaultProps = {
  label: "",
  ranges: [
    {
      key: "selection",
      startDate: new Date(),
      endDate: new Date(),
    },
  ],
};

export default DateRangePicker;
