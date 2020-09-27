import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";

class Checkbox extends React.Component {
  render() {
    const { field, label, disabled, styles, onChange } = this.props;
    return (
      <FormGroup check style={{
        ...styles,
      }}>
        {
          onChange ? (
            <Field
              type="checkbox"
              name={field}
              disabled={disabled}
              id={field}
              onChange={onChange}
            />
          ) : (
            <Field
              type="checkbox"
              name={field}
              disabled={disabled}
              id={field}
            />
          )
        }

        <Label className="ml-1" check>
          {label}
        </Label>
      </FormGroup>
    );
  }
}

export default Checkbox;
