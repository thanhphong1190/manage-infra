import React from "react";
import { FormGroup, Label } from "reactstrap";
import classnames from "classnames";
import ReactCurrencyInput from "react-currency-input";

class CurrencyInput extends React.Component {
  render() {
    const {
      field,
      label,
      disabled,
      note,
      errors,
      touched,
      value,
      setFieldValue,
      onValueChange,
      formGroupClass,
    } = this.props;
    return (
      <FormGroup className={formGroupClass}>
        {label && (
          <Label for={field}>
            {label}
            {note && (
              <>
                <br />
                <small className="font-italic">{note}</small>
              </>
            )}
          </Label>
        )}

        <ReactCurrencyInput
          id={field}
          name={field}
          precision={0}
          suffix="đ"
          disabled={disabled}
          value={value}
          onChangeEvent={(event, maskedvalue, floatvalue) => {
            setFieldValue(field, floatvalue);
            if (onValueChange) {
              onValueChange(floatvalue);
            }
          }}
          className={classnames("form-control", {
            "is-invalid": errors && errors[field],
          })}
        />
        {errors && errors[field] && (
          <div className="invalid-feedback">{errors[field]}</div>
        )}
      </FormGroup>
    );
  }
}

export default CurrencyInput;
