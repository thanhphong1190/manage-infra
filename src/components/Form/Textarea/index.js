import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import PropTypes from "prop-types";
import classnames from "classnames";

class Textarea extends React.Component {
  render() {
    const { field, label, rows, errors, touched, note } = this.props;
    return (
      <FormGroup>
        <Label for={field}>
          {label}
          { note && <><br/><small className="font-italic">{note}</small></> }
        </Label>
        <Field
          component="textarea"
          rows={rows}
          name={field}
          id={field}
          className={classnames("form-control", {
            "is-invalid": errors && errors[field] && touched[field]
          })}
        />
        {errors && errors[field] && touched[field] && (
          <div className="invalid-feedback">{errors[field]}</div>
        )}
      </FormGroup>
    );
  }
}

Textarea.propTypes = {
  rows: PropTypes.number
};

Textarea.defaultProps = {
  rows: 5
};

export default Textarea;
