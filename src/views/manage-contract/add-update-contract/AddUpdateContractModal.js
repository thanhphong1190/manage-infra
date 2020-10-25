import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  CustomInput,
  Col,
  Row,
} from "reactstrap";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { FIELD_REQUIRED } from "../../../app-messages";
import Input from "../../../components/Form/Input";
import http from "../../../helpers/http";
import { toastr } from "react-redux-toastr";
import {
  INIT_PARTNER_OPTION,
  INIT_PAYMENT_PERIOD_OPTION,
  INIT_TIMEAlERT_OPTION,
} from "../../../app-constants";
import {
  PartnerData,
  PaymentPeriodData,
  TimeAlertData,
} from "../../../static/mockData";
import Select from "react-select";
import moment from "moment";
import DatePicker from "../../../components/Form/DatePicker";
import FileUpload from "../../../components/Form/FileUpload";

const formSchema = Yup.object().shape({
  name: Yup.string().required(FIELD_REQUIRED),
  address: Yup.string().required(FIELD_REQUIRED),
  phone: Yup.string().required(FIELD_REQUIRED),
});

class AddUpdateContractModal extends Component {
  render() {
    const { toggle, modal, partner, mode } = this.props;
    if (!partner) {
      return <span></span>;
    }
    return (
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {mode === "add" ? "Tạo hợp đồng" : "Cập nhật hợp đồng"}
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
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleCheckbox">Loại hợp đồng</Label>
                    <div>
                      <CustomInput
                        type="radio"
                        id="exampleCustomRadio"
                        name="customRadio"
                        label="Mobifone thuê"
                      />
                      <CustomInput
                        type="radio"
                        id="exampleCustomRadio2"
                        name="customRadio"
                        label="Mobifone đi thuê"
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Chọn đối tác</Label>
                      <Select
                        value={INIT_PARTNER_OPTION}
                        onChange={this.handleSelectChange}
                        options={PartnerData}
                        isSearchable={false}
                        placeholder="Chọn tỉnh/thành"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <Input
                      field="contract_code"
                      label="Mã hợp đồng"
                      errors={errors}
                      touched={touched}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <DatePicker
                      label="Ngày bắt đầu"
                      name="start_date"
                      field="start_date"
                      value={values.start_date}
                      onChange={(value) => {
                        values.start_date = value;
                        setFieldValue("start_date", value);
                        if (
                          values.end_date &&
                          moment(new Date(values.start_date)).isAfter(
                            moment(new Date(values.end_date))
                          )
                        ) {
                          setFieldValue("end_date", null);
                        }
                      }}
                      errors={errors}
                      touched={touched}
                    />
                  </Col>
                  <Col md={6}>
                    <DatePicker
                      label="Ngày kết thúc"
                      name="start_date"
                      field="start_date"
                      value={values.start_date}
                      onChange={(value) => {
                        values.start_date = value;
                        setFieldValue("start_date", value);
                        if (
                          values.end_date &&
                          moment(new Date(values.start_date)).isAfter(
                            moment(new Date(values.end_date))
                          )
                        ) {
                          setFieldValue("end_date", null);
                        }
                      }}
                      errors={errors}
                      touched={touched}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Chọn chu kì thanh toán</Label>
                      <Select
                        value={INIT_PAYMENT_PERIOD_OPTION}
                        onChange={this.handleSelectChange}
                        options={PaymentPeriodData}
                        isSearchable={false}
                        placeholder="Chu kì thanh toán"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Thời gian nhắc thanh toán</Label>
                      <Select
                        value={INIT_TIMEAlERT_OPTION}
                        onChange={this.handleSelectChange}
                        options={TimeAlertData}
                        isSearchable={false}
                        placeholder="Thời gian nhắc thanh toán"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FileUpload
                      label="Upload nội dung hợp đồng scan"
                      value={values.files}
                      onChange={(event) => {
                        const files = event.currentTarget.files;
                        if (files.length === 0) {
                          return;
                        }
                        values.files = values.files.concat([...files]);
                        setFieldValue("files", values.files);
                      }}
                      onRemoveItem={(file, index) => {
                        values.files.splice(index, 1);
                        setFieldValue("files", values.files);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FileUpload
                      label="Upload phụ lục hợp đồng 1"
                      value={values.files}
                      onChange={(event) => {
                        const files = event.currentTarget.files;
                        if (files.length === 0) {
                          return;
                        }
                        values.files = values.files.concat([...files]);
                        setFieldValue("files", values.files);
                      }}
                      onRemoveItem={(file, index) => {
                        values.files.splice(index, 1);
                        setFieldValue("files", values.files);
                      }}
                    />
                  </Col>
                  <Col md={12}>
                    <span>Generate file phụ lục hợp đồng 2 về giá.txt</span>
                  </Col>
                </Row>
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

AddUpdateContractModal.propTypes = {
  toggle: PropTypes.func,
  doActionAfterSubmit: PropTypes.func,
  modal: PropTypes.bool,
  user: PropTypes.object,
};

AddUpdateContractModal.defaultProps = {
  toggle: () => {},
  doActionAfterSubmit: () => {},
  modal: false,
  user: {},
};

export default AddUpdateContractModal;
