import React from "react";
import { Row, Col, Container } from "reactstrap";

class ManageStatistic extends React.Component {
  state = {};
  render() {
    return (
      <Container className="mt-2" fluid={true}>
        <Row>
          <Col md="12">
            <div className="d-flex align-items-center w-100 page-title">
              <h6>
                <strong>Quản lý thống kê</strong>
              </h6>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="pt-2">
            <h6>- Thống kê tổng số hợp đồng, tổng số trạm tương ứng</h6>
            <h6>- Tổng chi phí từng loại hợp đồng (Xã hội hóa / VNPT ...)</h6>
            <h6>- Tổng giá trị thanh toán từng loại (XHH / VNPT)</h6>
            <h6>- Tổng sl hợp đồng cần gia hạn tới thời điểm nào đó => Lọc theo ngày</h6>
            <h6>- Số lượng hoàn thành gia hạn - đã kí gia hạn, upload file</h6>
            <h6>- Số lượng giá trị chi phí tăng giảm theo tháng ? Cần rõ hơn</h6>
            <h6>- Hạng mục thêm giảm cho từng hợp đồng</h6>
          </Col>
        </Row>
      </Container>
    );
  }
  componentDidMount = async () => {};
}

export default ManageStatistic;
