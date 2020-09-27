import React from "react";
import { Row, Col, Container } from "reactstrap";
import http from "../../helpers/http";

class Settings extends React.Component {
  state = {
    loading: false,
    loaded: false,
  };
  render() {
    const { loading } = this.state;
    return (
      <Container className="mt-2" fluid={true}>
        <Row>
          <Col md="12">
            <div className="d-flex align-items-center w-100 page-title">
              <h6>
                <strong>Cấu hình</strong>
              </h6>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="pt-2">
            <h6>Cấu hình</h6>
          </Col>
        </Row>
      </Container>
    );
  }
  componentDidMount = async () => {};
}

export default Settings;
