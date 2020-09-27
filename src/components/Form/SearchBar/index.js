import React from "react";
import { Row, Col, Button, Input, FormGroup } from "reactstrap";
import DateRangePicker from "../DateRangePicker";
import moment from "moment";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: "",
      startDate: moment().add(-1, "years").toDate(),
      endDate: moment().toDate(),
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSearch = () => {
    if (this.props.dateRange) {
      this.props.onSearch(this.state);
    } else {
      this.props.onSearch({ q: this.state.q });
    }
  };

  onRangeChange = (ranges) => {
    this.setState({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  render() {
    const { placeholder, dateRange, dateRangeLabel } = this.props;
    return (
      <Row className="d-flex align-items-end">
        {dateRange && (
          <Col md="3">
            <DateRangePicker
              onChange={this.onRangeChange}
              ranges={[
                {
                  key: "selection",
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                },
              ]}
              label={dateRangeLabel}
            />
          </Col>
        )}
        <Col md="4">
          <FormGroup>
            <Input
              name="q"
              placeholder={placeholder}
              onChange={this.handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
            <Button onClick={this.handleSearch} color="success">
              Tìm kiếm
            </Button>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

SearchBar.defaultProps = {
  placeholder: "Nhập từ khoá",
  dateRangeLabel: "Ngày bắt đầu",
};

export default SearchBar;
