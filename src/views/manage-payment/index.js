import React from "react";
import { Row, Col, Container } from "reactstrap";

class ManagePayment extends React.Component {
  state = {};
  render() {
    return (
      <Container className="mt-2" fluid={true}>
        <Row>
          <Col md="12">
            <div className="d-flex align-items-center w-100 page-title">
              <h6>
                <strong>Quản lý thanh toán</strong>
              </h6>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="pt-2">
            <h6>Confirm flow thanh toán ?</h6>
          </Col>
        </Row>
      </Container>
    );
  }
  componentDidMount = async () => {};
}

export default ManagePayment;
