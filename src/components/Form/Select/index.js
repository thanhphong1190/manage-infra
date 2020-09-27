import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import classnames from "classnames";

class Select extends React.Component {
  render() {
    const { field, label, errors, touched, note, options, placeholder, onChange } = this.props;
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
        {
          onChange ? (
            <Field
              component="select"
              name={field}
              id={field}
              className={classnames("form-control", {
                "is-invalid": errors && errors[field] && touched[field],
              })}
              onChange={onChange}
            >
              { placeholder && <option value={""}>{placeholder}</option> }
              {options &&
                options.map((option, index) => {
                  return <option key={index} value={option.value}>{option.label || option.name}</option>;
                })}
            </Field>
          ) : (
            <Field
              component="select"
              name={field}
              id={field}
              className={classnames("form-control", {
                "is-invalid": errors && errors[field] && touched[field],
              })}
            >
              { placeholder && <option value={""}>{placeholder}</option> }
              {options &&
                options.map((option, index) => {
                  return <option key={index} value={option.value}>{option.label || option.name}</option>;
                })}
            </Field>
          )
        }
        {errors && errors[field] && touched[field] && (
          <div className="invalid-feedback">{errors[field]}</div>
        )}
      </FormGroup>
    );
  }
}

export default Select;
