import React from "react";
import { Row, Col, Container, Button, Badge } from "reactstrap";
import MyTable from "../../components/MyTable";
import { noFormatter } from "../../helpers/formatter";
import { PAGE_SIZE } from "../../app-constants";
import { CategoryData } from "../../static/mockData";
import SearchBar from "../../components/Form/SearchBar";

class Category extends React.Component {
  state = {
    data: CategoryData,
    search: "",
    page: 1,
    pageSize: PAGE_SIZE
  };

  handleTableChange = (
    type,
    { page, sizePerPage, filters, sortField, sortOrder, cellEdit }
  ) => {
    const { pageSize } = this.state;
    if (pageSize === sizePerPage) {
      this.setState({ page }, this.fetchData);
    } else {
      this.setState({ pageSize: sizePerPage, page: 1 }, this.fetchData);
    }
  };

  render() {
    const { page } = this.state;
    const columns = [
      {
        dataField: "id",
        text: "STT",
        classes: "text-center",
        headerClasses: "text-center",
        headerStyle: {
          width: "50px",
        },
        formatter: noFormatter,
        formatExtraData: { page },
      },
      {
        dataField: "parent_name",
        text: "Mục cha",
        classes: "text-nowrap",
      },
      {
        dataField: "category_name",
        text: "Tên hạng mục",
        classes: "text-nowrap",
      },
      {
        dataField: "category_price",
        text: "Đơn giá",
        classes: "text-nowrap",
      },
      {
        text: "Hoạt động",
        classes: "text-nowrap",
        dataField: "category_field",
        formatter: (cell, row) => {
          return (
            <div className="d-flex">
              <Button color="primary" className="mr-1">Sửa</Button>
              <Button>Xóa</Button>
            </div>
          );
        },
      },
    ];
    return (
      <Container className="mt-2" fluid={true}>
        <Row>
          <Col md="12">
            <div className="d-flex align-items-center justify-content-between w-100 page-title">
              <h6>
                <strong>Quản lý hạng mục</strong>
              </h6>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col md="12" className="pt-3">
            <SearchBar onSearch={this.onSearch} />
            <MyTable
              columns={columns}
              data={this.state.data}
              page={this.state.page}
              sizePerPage={this.state.pageSize}
              totalSize={this.state.totalSize}
              onTableChange={this.handleTableChange}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  fetchData = async (
    page = this.state.page,
    pageSize = this.state.pageSize
  ) => {
    console.log("Fetch data");

    // Will enable when integrate
    // const res = await http.get("users", {
    //   ...this.state.params,
    //   pageSize,
    //   pageIndex: page,
    // });
    // const { data } = res.data;
    // this.setState({
    //   data,
    //   totalSize: res.data.totalCount,
    //   page,
    //   pageSize,
    // });
  };

  handlePageChange = (page) => {
    this.setState({ page }, this.fetchData);
  };

  handleSizePerPageChange = (pageSize) => {
    this.setState({ pageSize, page: 1 }, this.fetchData);
  };

  componentDidMount = async () => {};
}

export default Category;
