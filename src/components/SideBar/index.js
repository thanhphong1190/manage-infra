import React from "react";
import {} from "reactstrap";
import _ from "lodash";
import "./style.scss";
import { SIDE_BAR } from "../../app-constants";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

class SideBar extends React.Component {
  state = {};
  render() {
    const { history } = this.props;
    return (
      <React.Fragment>
        <SideNav
          onSelect={(selected) => {
            const to = "/" + selected;
            if (history.location.pathname !== to) {
              history.push(to);
            }
          }}
          className="side-nav-container"
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="cong-no">
            {SIDE_BAR.map((item) => {
              return (
                <NavItem eventKey={item.key} key={item.id}>
                  <NavIcon>
                    <i className={item.icon} style={{ fontSize: "1.3em" }}></i>
                  </NavIcon>
                  <NavText>{item.text}</NavText>
                  {
                    _.isEmpty(item.childrens) || item.childrens.map(subItem => (
                      <NavItem eventKey={`${item.key}/${subItem.key}`} key={subItem.id}>
                          <NavText>{subItem.text}</NavText>
                      </NavItem>
                    ))
                  }
                </NavItem>
              );
            })}
          </SideNav.Nav>
        </SideNav>
      </React.Fragment>
    );
  }
}

export default SideBar;
