import React from "react";
import { Row, Col, Container } from "reactstrap";
import "./style.scss";
// import _ from "lodash";
// import http from "../../helpers/http";

class Home extends React.Component {
  state = {
    movies: [],
    loading: false,
    loaded: false,
  };
  render() {
    return (
      <Container className="mt-2" fluid={true}>
        <Row>
          <Col md="12">
            <h3>Home</h3>
          </Col>
        </Row>
      </Container>
    );
  }
  componentDidMount = async () => {};
}

export default Home;
