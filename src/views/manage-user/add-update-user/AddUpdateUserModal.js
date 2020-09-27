import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { FIELD_REQUIRED } from "../../../app-messages";
import Input from "../../../components/Form/Input";
import http from "../../../helpers/http";
import { toastr } from "react-redux-toastr";

const formSchema = Yup.object().shape({
  name: Yup.string().required(FIELD_REQUIRED),
  username: Yup.string().required(FIELD_REQUIRED),
  email: Yup.string().required(FIELD_REQUIRED),
  phone: Yup.string(),
  province_id: Yup.string().required(FIELD_REQUIRED),
  department_id: Yup.string().required(FIELD_REQUIRED),
});

class AddUpdateUserModal extends Component {
  render() {
    const { toggle, modal, user, mode } = this.props;
    if (!user) {
      return <span></span>;
    }
    return (
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {mode === "add" ? "Tạo nhân viên" : "Cập nhật nhân viên"}
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              province_id: "",
              department_id: "",
              ...user,
            }}
            validationSchema={formSchema}
            onSubmit={this.onSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <Input
                  field="name"
                  label="Tên nhân viên(*)"
                  errors={errors}
                  touched={touched}
                />
                <Input
                  field="username"
                  label="Tài khoản đăng nhập(*)"
                  errors={errors}
                  disabled={mode === "update"}
                  touched={touched}
                />
                <Input
                  field="email"
                  label="Email(*)"
                  errors={errors}
                  note="Mật khẩu sẽ được gửi về Email"
                  touched={touched}
                />
                <Input
                  field="phone"
                  label="SĐT"
                  errors={errors}
                  touched={touched}
                />
                <FormGroup>
                  <Label for="province_id">Tỉnh/Thành(*)</Label>
                  <Field
                    as="select"
                    name="province_id"
                    id="province_id"
                    className={`form-control ${
                      errors.province_id && touched.province_id && "is-invalid"
                    }`}
                  >
                    <option>Chọn Tỉnh/Thành</option>
                  </Field>
                  {errors.province_id && touched.province_id && (
                    <div className="invalid-feedback">{errors.province_id}</div>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label for="department_id">Vị trí(*)</Label>
                  <Field
                    as="select"
                    name="department_id"
                    id="department_id"
                    className={`form-control ${
                      errors.department_id &&
                      touched.department_id &&
                      "is-invalid"
                    }`}
                  >
                    <option>Chọn Vị trí</option>
                  </Field>
                  {errors.department_id && touched.department_id && (
                    <div className="invalid-feedback">
                      {errors.department_id}
                    </div>
                  )}
                </FormGroup>

                <div className="d-flex justify-content-center">
                  <Button color="secondary" className="mr-2" onClick={toggle}>
                    Huỷ
                  </Button>
                  <Button color="success" type="submit">
                    {mode === "add" ? "Tạo" : "Cập nhật"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    );
  }

  onSubmit = async (values) => {
    const { toggle, doActionAfterSubmit } = this.props;
    try {
      if (values.id) {
        await http.put(`users/${values.id}`, values);
        toastr.success("Thông báo", "Cập nhật nhân viên thành công.");
      } else {
        await http.post("users", values);
        toastr.success("Thông báo", "Tạo nhân viên thành công.");
      }

      toggle();
      doActionAfterSubmit();
    } catch (err) {
      const errorMessage = _.get(err, "response.data.error");
      toastr.error("Thông báo", errorMessage);
    }
  };
}

AddUpdateUserModal.propTypes = {
  toggle: PropTypes.func,
  doActionAfterSubmit: PropTypes.func,
  modal: PropTypes.bool,
  user: PropTypes.object,
};

AddUpdateUserModal.defaultProps = {
  toggle: () => {},
  doActionAfterSubmit: () => {},
  modal: false,
  user: {},
};

export default AddUpdateUserModal;
