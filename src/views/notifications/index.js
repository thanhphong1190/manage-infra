import React from "react";
import { Row, Col, Input, Button, FormGroup, Label, Container } from "reactstrap";
import http from "../../helpers/http";

class Notifications extends React.Component {
  state = {};
  render() {
    return (
      <Container className="mt-2" fluid={true}>
        <Row>
          <Col md="12">
            <h3>Thông báo</h3>
          </Col>
        </Row>
      </Container>
    );
  }
  componentDidMount = async () => {};
}

export default Notifications;
