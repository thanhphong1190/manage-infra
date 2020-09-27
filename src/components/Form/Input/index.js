import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import classnames from "classnames";

class Input extends React.Component {
  render() {
    const { field, label, disabled, note, errors, touched, type, onKeyUp, min, max } = this.props;
    return (
      <FormGroup>
        <Label for={field}>
          {label}
          {note && (
            <>
              <br />
              <small className="font-italic">{note}</small>
            </>
          )}
        </Label>
        <Field
          type= {type ? type : "text"}
          name={field}
          disabled={disabled}
          id={field}
          onKeyUp={onKeyUp}
          className={classnames("form-control", {
            "is-invalid": errors && errors[field] && touched[field],
          })}
          min={min}
          max={max}
        />
        {errors && errors[field] && touched[field] && (
          <div className="invalid-feedback">{errors[field]}</div>
        )}
      </FormGroup>
    );
  }
}

export default Input;
