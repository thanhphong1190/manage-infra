import React from "react";
import { FormGroup, Label } from "reactstrap";
import DatePicker from "reactstrap-date-picker";
import PropTypes from "prop-types";
import classnames from "classnames";
import { DATE_TIME_FORMAT } from "../../../app-constants";

const DatePickerField = ({ field, label, name, value, onChange, minDate, maxDate, disabled, errors, touched }) => {
  return (
    <FormGroup>
      <Label for={field}>{label}</Label>
      <DatePicker
        name={name}
        id={name}
        value={value}
        dateFormat={DATE_TIME_FORMAT.DDMMYYYY}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
        disabled= {disabled}
        className={classnames({
          "is-invalid": errors && errors[field],
        })}
      />
      {errors && errors[field] && (
        <div className="text-danger text-feedback">{errors[field]}</div>
      )}
    </FormGroup>
  );
};

DatePickerField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

DatePickerField.defaultProps = {
  label: "",
  name: "",
};

export default DatePickerField;
