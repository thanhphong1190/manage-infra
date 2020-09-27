import React from "react";
import { Button, Label } from "reactstrap";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import _ from "lodash";
import "./style.scss";
import appConfig from "../../app-config";
import ConfirmModal from "../Modal/Confirm";
import http from "../../helpers/http";
import { updateLoggedInUser } from "../../redux/account/actions";
import Session from "../../helpers/session";

class AppHeader extends React.Component {
  state = {
    email: "",
    password: "",
    isShowRegisterModal: false,
    isShowLogoutModal: false
  };
  render() {
    const { account } = this.props;
    const isLoggedIn = !_.isEmpty(account.token);
    return (
      <div className="app-header">
        <span className="header-title">{appConfig.appName}</span>
        {isLoggedIn ? this._renderAuthorizedHeaderSide() : <span></span>}
      </div>
    );
  }
  _renderAuthorizedHeaderSide = () => {
    const { isShowLogoutModal } = this.state;
    // const email = _.get(this.props, "account.userInfo.email");
    return (
      <div className="header-right">
        <div className="notification" onClick={this.goToNotifications}>
          <i className="fa fa-bell-o" aria-hidden="true"></i>
          <div className="notificationNum d-flex justify-content-center align-items-center"><span>12</span></div>
        </div>
        <Label className="mr-2 mb-0 font-weight-bold">Hi there</Label>
        <Button color="danger" onClick={this.onToggleLogoutModal}>
          Đăng xuất
        </Button>
        <ConfirmModal
          modal={isShowLogoutModal}
          toggle={this.onToggleLogoutModal}
          message={"Bạn có muốn đăng xuất?"}
          onConfirmPress={this.onLogout}
        />
      </div>
    );
  };
  onToggleRegisterModal = () => {
    this.setState({
      isShowRegisterModal: !this.state.isShowRegisterModal
    });
  };
  onToggleLogoutModal = () => {
    this.setState({
      isShowLogoutModal: !this.state.isShowLogoutModal
    });
  };
  onLogout = async () => {
    this.props.updateLoggedInUser(null, {});
    http.setAuthorizationHeader(null);
    Session.clearAll();
    window.location = "/login";
  };
  goToNotifications = () => {
    window.location= "/notifications";
  }
}

const mapStateToProps = state => ({
  account: state.account
});

export default connect(mapStateToProps, { updateLoggedInUser })(AppHeader);
