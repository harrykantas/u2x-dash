import React from "react";
import { Card, Tooltip } from "antd";

const DashboardItem = ({ children, title, description }) => (
  <Card
    title={title}
    extra={<Tooltip title={description} trigger="click" placement="leftBottom"><a href="">?</a></Tooltip>}
    style={{
      height: "100%",
      width: "100%"
    }}
  >
    {children}
  </Card>
);

export default DashboardItem;
