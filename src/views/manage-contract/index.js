import React from "react";
import { Row, Col, Container, Button, FormGroup } from "reactstrap";
import Select from "react-select"
import MyTable from "../../components/MyTable";
import { noFormatter } from "../../helpers/formatter";
import {
  PAGE_SIZE,
  INIT_PROVINCE_OPTION
} from "../../app-constants";
import ConfirmModal from "../../components/Modal/Confirm";
import {
  ManageContractData,
  ProvinceData,
} from "../../static/mockData";
import SearchBar from "../../components/Form/SearchBar";
import AddUpdateContractModal from "./add-update-contract/AddUpdateContractModal";

class ManageContract extends React.Component {
  state = {
    data: ManageContractData,
    search: "",
    page: 1,
    pageSize: PAGE_SIZE,
    isShowConfirmDelete: false,
    selectedId: null,
    selectedItem: null,
    isShowAddUpdateModal: false,
    mode: "add",
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
    const { page, isShowConfirmDelete } = this.state;
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
        dataField: "contract_type",
        text: "Loại hợp đồng",
        classes: "text-nowrap",
      },
      {
        dataField: "partner_id",
        text: "Đối tác",
        classes: "text-nowrap",
      },
      {
        dataField: "contract_id",
        text: "Mã hợp đồng",
        classes: "text-nowrap",
      },
      {
        dataField: "time_range",
        text: "Hiệu lực hợp đồng",
        classes: "text-nowrap",
      },
      {
        dataField: "payment_period",
        text: "Chu kì thanh toán",
        classes: "text-nowrap",
      },
      {
        dataField: "time_alert",
        text: "Thời gian nhắc thanh toán",
        classes: "text-nowrap",
      },
      {
        text: "Thao tác",
        classes: "text-center text-nowrap",
        headerClasses: "text-center",
        headerStyle: {
          width: "150px",
        },
        dataField: "action",
        formatter: (cell, row) => {
          return (
            <div className="d-flex justify-content-center">
              <Button
                className="ml-1"
                color="primary"
                onClick={() =>
                  this.setState({
                    isShowAddUpdateModal: true,
                    selectedItem: row,
                    mode: "update",
                  })
                }
              >
                <i className="fa fa-pencil"></i>
              </Button>
              <Button
                className="ml-1"
                color={"danger"}
                onClick={() =>
                  this.setState({
                    isShowConfirmDelete: true,
                    selectedId: row.id,
                  })
                }
              >
                <i className="fa fa-trash-o"></i>
              </Button>
              <Button
                className="ml-1"
                color={"primary"}
                onClick={() =>
                  this.setState({
                    selectedId: row.id,
                  })
                }
              >
                Sửa phụ lục
              </Button>
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
                <strong>Quản lý hợp đồng</strong>
              </h6>
              <Button
                color="primary"
                onClick={() =>
                  this.setState({
                    isShowAddUpdateModal: true,
                    selectedItem: {},
                    mode: "add",
                  })
                }
              >
                <i className="fa fa-plus-circle" aria-hidden="true"></i> Tạo hợp
                đồng
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col md="12" className="pt-3">
            {/* <SearchBar onSearch={this.onSearch} /> */}
            <Row>
              <Col md="2" sm="6" xs="12">
                <FormGroup>
                  <Select
                    value={INIT_PROVINCE_OPTION}
                    onChange={this.handleSelectChange}
                    options={ProvinceData}
                    isSearchable={false}
                    placeholder="Chọn tỉnh/thành"
                  />
                </FormGroup>
              </Col>
            </Row>
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
        <AddUpdateContractModal
          toggle={() =>
            this.setState({
              isShowAddUpdateModal: !this.state.isShowAddUpdateModal,
            })
          }
          modal={this.state.isShowAddUpdateModal}
          partner={this.state.selectedItem}
          doActionAfterSubmit={this.fetchData}
          mode={this.state.mode}
        />
        <ConfirmModal
          modal={isShowConfirmDelete}
          toggle={this.onToggleDeleteModal}
          message={"Bạn có chắc muốn xóa ?"}
          onConfirmPress={this.onDelete}
        />
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

  onToggleDeleteModal = () => {
    this.setState({
      isShowConfirmDelete: !this.state.isShowConfirmDelete,
    });
  };

  componentDidMount = async () => {};
}

export default ManageContract;
