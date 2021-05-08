import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Layout, Menu } from "antd";
import logo from "./cosmo.png";

const Header = ({ location }) => (
  <Layout.Header
    style={{
      padding: "0 32px"
    }}
  >
    <div
      style={{
        float: "left"
      }}
    >
      <img src={logo} style={{ display: "inline", height: "54px", width: "auto" }}/>
      <h2
        style={{
          color: "#fff",
          margin: 0,
          marginRight: "1em",
          display: "inline",
          width: 100,
          lineHeight: "54px"
        }}
      >
        U2 X-Radio Stats
      </h2>
    </div>
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[location.pathname]}
      style={{
        lineHeight: "64px"
      }}
    >
      <Menu.Item key="/" style={{float: "left"}}>
        <Link to="/">Overview</Link>
      </Menu.Item>
      <Menu.Item key="/songs" style={{float: "left"}}>
        <Link to="/songs">Songs</Link>
      </Menu.Item>
      <Menu.Item key="/faq" style={{float: "right"}}>
        <Link to="/faq">FAQ</Link>
      </Menu.Item>
    </Menu>
  </Layout.Header>
);

export default withRouter(Header);
