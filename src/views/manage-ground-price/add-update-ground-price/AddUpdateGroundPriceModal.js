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
import Select from "react-select";
import { INIT_WARD_OPTION, INIT_AREA600_OPTION } from "../../../app-constants";
import { WardData, Area600Data } from "../../../static/mockData";

const formSchema = Yup.object().shape({
  name: Yup.string().required(FIELD_REQUIRED),
  address: Yup.string().required(FIELD_REQUIRED),
  phone: Yup.string().required(FIELD_REQUIRED),
});

class AddUpdateGroundPriceModal extends Component {
  render() {
    const { toggle, modal, partner, mode } = this.props;
    if (!partner) {
      return <span></span>;
    }
    return (
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {mode === "add" ? "Tạo khung giá" : "Khung giá mặt bằng"}
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
                <FormGroup>
                  <Label>Chọn xã/phường</Label>
                  <Select
                    value={INIT_WARD_OPTION}
                    onChange={this.handleSelectChange}
                    options={WardData}
                    isSearchable={false}
                    placeholder="Chọn tỉnh/thành"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Chọn khu vực QĐ600</Label>
                  <Select
                    value={INIT_AREA600_OPTION}
                    onChange={this.handleSelectChange}
                    options={Area600Data}
                    isSearchable={false}
                    placeholder="Chọn tỉnh/thành"
                  />
                </FormGroup>

                <Input
                  field="price"
                  label="Giá thuê"
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
    // try {
    //   if (values.id) {
    //     await http.put(`users/${values.id}`, values);
    //     toastr.success("Thông báo", "Cập nhật nhân viên thành công.");
    //   } else {
    //     await http.post("users", values);
    //     toastr.success("Thông báo", "Tạo nhân viên thành công.");
    //   }

    //   toggle();
    //   doActionAfterSubmit();
    // } catch (err) {
    //   const errorMessage = _.get(err, "response.data.error");
    //   toastr.error("Thông báo", errorMessage);
    // }
  };
}

AddUpdateGroundPriceModal.propTypes = {
  toggle: PropTypes.func,
  doActionAfterSubmit: PropTypes.func,
  modal: PropTypes.bool,
  user: PropTypes.object,
};

AddUpdateGroundPriceModal.defaultProps = {
  toggle: () => {},
  doActionAfterSubmit: () => {},
  modal: false,
  user: {},
};

export default AddUpdateGroundPriceModal;
