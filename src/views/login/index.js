import React from "react";
import { Col, FormGroup, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import "./style.scss";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toastr } from "react-redux-toastr";
import http from "../../helpers/http";
import Session from "../../helpers/session";
import { HTTP_STATUS_CODE, PHONE_REGEX } from "../../app-constants";
import { FIELD_REQUIRED, PHONE_INVALID } from "../../app-messages";
import { updateLoggedInUser } from "../../redux/account/actions";

const formSchema = Yup.object().shape({
  phone: Yup.string()
    .required(FIELD_REQUIRED)
    .test("phone", PHONE_INVALID, value => PHONE_REGEX.test(value)),
  password: Yup.string().required(FIELD_REQUIRED)
});

class Login extends React.Component {
  state = {};
  render() {
    return (
      <div className="LoginContainer d-flex justify-content-center align-items-center">
        <Col
          md="12"
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="LoginContent">
            <div className="LoginMain">
              <div className="LoginHeader d-flex justify-content-center">
                <h6>Đăng nhập</h6>
              </div>
              <div className="LoginForm">
                <Formik
                  initialValues={{
                    phone: "0794542102",
                    password: "123456"
                  }}
                  validationSchema={formSchema}
                  onSubmit={this.onSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label for="phone">Số điện thoại</Label>
                        <Field
                          type="text"
                          name="phone"
                          id="phone"
                          className={`form-control ${errors.phone &&
                            touched.phone &&
                            "is-invalid"}`}
                        />
                        {errors.phone && touched.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for="password">Mật khẩu</Label>
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          className={`form-control ${errors.password &&
                            touched.password &&
                            "is-invalid"}`}
                        />
                        {errors.password && touched.password && (
                          <div className="invalid-feedback">{errors.password}</div>
                        )}
                      </FormGroup>
                      <div className="LoginFormSubmit d-flex justify-content-center">
                        <Button color="danger" type="submit">
                          Đăng nhập
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </Col>
      </div>
    );
  }
  onSubmit = async loginData => {
    // try {
    //   const res = await http.post("users/login", loginData);
    //   if (res.data) {
    //     const token = _.get(res, "data.token");
    //     const userInfo = _.get(res, "data.userInfo");
    //     this.props.updateLoggedInUser(token, userInfo);
    //     Session.setAccessToken(token);
    //     http.setAuthorizationHeader(token);
    //     this.props.history.push("/");
    //   }
    // } catch (err) {
    //   const statusCode = _.get(err, "response.status");
    //   const errorMessage = _.get(err, "response.data.error");
    //   if (statusCode === HTTP_STATUS_CODE.BAD_REQUEST) {
    //     toastr.error("Error", errorMessage);
    //   }
    // }
    if (loginData.phone === "0794542102" && loginData.password === "123456") {
        const token = "mock_token";
        const userInfo = {
          phone: "0794542102",
          name: "Khoa"
        };
        this.props.updateLoggedInUser(token, userInfo);
        Session.setAccessToken(token);
        http.setAuthorizationHeader(token);
        this.props.history.push("/");
    }
    else {
      toastr.error("Error", "Login info is invalid");
    }
  };
}
const mapStateToProps = state => ({
  account: state.account
});

export default connect(mapStateToProps, { updateLoggedInUser })(Login);
