import React from "react";
import { FormGroup, Label } from "reactstrap";
import Select from "react-select";
import classnames from "classnames";

class MultipleSelect extends React.Component {
  onChange = (data) => {
    const { setFieldValue, field } = this.props;
    setFieldValue(field, data);
  };

  render() {
    const {
      field,
      label,
      errors,
      touched,
      note,
      placeholder,
      options,
      values,
      setFieldValue,
    } = this.props;
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
        <Select
          onChange={this.onChange}
          closeMenuOnSelect={false}
          options={options}
          placeholder={placeholder}
          value={values[field]}
          isMulti
        />
        {errors && errors[field] && touched[field] && (
          <div className="invalid-feedback">{errors[field]}</div>
        )}
      </FormGroup>
    );
  }
}

export default MultipleSelect;
