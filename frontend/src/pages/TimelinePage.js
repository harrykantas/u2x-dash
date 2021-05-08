import React, { useState } from "react";
import { Col } from "antd";
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";

const DashboardItems = [{
  id: 99,
  name: "Live Schedule [Last 20 Days]",
  vizState: {
    query: {
      measures: [],
      timeDimensions: [
        {
          dimension: "U2x.timestamp",
          dateRange: "from 20 days ago to now"
        }
      ],
      order: {
        "U2x.timestamp": "desc"
      },
      filters: [],
      dimensions: ["U2x.title", "U2x.artist", "U2x.album", "U2x.timestamp"]
    },
    chartType: "tableSong"
  }
}];

const DashboardPage = () => {

  const dashboardItem = item => (
    <Col
      span={24}
      lg={item.size || 24}
      key={item.id}
      style={{
        textAlign: "center",
        marginBottom: "24px"
      }}
    >
      <DashboardItem title={item.name}>
        <ChartRenderer vizState={item.vizState} />
      </DashboardItem>
    </Col>
  );

  const Empty = () => (
    <div
      style={{
        textAlign: "center",
        padding: 12
      }}
    >
      <h2>
        There are no charts on this dashboard. Use Playground Build to add one.
      </h2>
    </div>
  );

  return DashboardItems.length ? (
    <Dashboard dashboardItems={DashboardItems}>
      {DashboardItems.map(dashboardItem)}
    </Dashboard>
  ) : (
    <Empty />
  );

};

export default DashboardPage;
