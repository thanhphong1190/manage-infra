import React from "react";
import { FormGroup, Label, Alert, Button } from "reactstrap";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./styles.scss";

class FileUpload extends React.Component {
  render() {
    const {
      field,
      label,
      value,
      note,
      errors,
      touched,
      accept,
      onChange,
      onRemoveItem,
      multiple,
      buttonText,
      onUpload,
      showUploadButton,
    } = this.props;

    return (
      <FormGroup>
        {(label || note) && (
          <Label for={"file_upload"}>
            {label}
            {note && (
              <>
                <br />
                <small className="font-italic">{note}</small>
              </>
            )}
          </Label>
        )}
        <input
          ref={(ref) => (this.fileInput = ref)}
          type="file"
          id="file_upload"
          name="file_upload"
          onChange={onChange}
          accept={accept || ".doc,.docx"}
          multiple={multiple}
          className="hidden"
        />
        {value &&
          value.map((file, index) => (
            <Alert
              key={index}
              color="info"
              isOpen={true}
              toggle={multiple ? () => onRemoveItem(file, index) : null}
            >
              {file.name}
            </Alert>
          ))}
        <div>
          <Button
            color="success"
            onClick={() => {
              this.fileInput.click();
            }}
          >
            {buttonText}
          </Button>
          {showUploadButton && value && value.length > 0 && (
            <Button className="ml-1" color="success" onClick={onUpload}>
              Upload
            </Button>
          )}
        </div>
      </FormGroup>
    );
  }
}

FileUpload.propTypes = {
  multiple: PropTypes.bool,
  onRemoveItem: PropTypes.func,
  buttonText: PropTypes.string,
};

FileUpload.defaultProps = {
  multiple: true,
  onRemoveItem: () => {},
  buttonText: "Chọn File",
};

export default FileUpload;
