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
  address: Yup.string().required(FIELD_REQUIRED),
  phone: Yup.string().required(FIELD_REQUIRED)
});

class AddUpdatePartnerModal extends Component {
  render() {
    const { toggle, modal, partner, mode } = this.props;
    if (!partner) {
      return <span></span>;
    }
    return (
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {mode === "add" ? "Tạo đối tác" : "Cập nhật đối tác"}
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: "",
              address: "",
              phone: "",
              ...partner,
            }}
            validationSchema={formSchema}
            onSubmit={this.onSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <Input
                  field="name"
                  label="Tên đối tác(*)"
                  errors={errors}
                  touched={touched}
                />
                <Input
                  field="address"
                  label="Địa chỉ(*)"
                  errors={errors}
                  touched={touched}
                />
                <Input
                  field="phone"
                  label="SĐT"
                  errors={errors}
                  touched={touched}
                />

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

AddUpdatePartnerModal.propTypes = {
  toggle: PropTypes.func,
  doActionAfterSubmit: PropTypes.func,
  modal: PropTypes.bool,
  user: PropTypes.object,
};

AddUpdatePartnerModal.defaultProps = {
  toggle: () => {},
  doActionAfterSubmit: () => {},
  modal: false,
  user: {},
};

export default AddUpdatePartnerModal;
