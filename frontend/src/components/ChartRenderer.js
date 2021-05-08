import React from "react";
import PropTypes from "prop-types";
import { useCubeQuery } from "@cubejs-client/react";
import { Spin, Row, Col, Statistic, Table } from "antd";
import {
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line
} from "recharts";
import "./recharts-theme.less";
import moment from "moment-timezone";
import numeral from "numeral";

const numberFormatter = item => numeral(item).format("0,0");
const timeLengthFormatter = item => numeral(item).format("00:00:00");

const localTimeZone = moment.tz.guess();
const dateFormatter = item => moment.utc(item).tz(localTimeZone).format("MMM DD");
const timeFormatter = item => moment.utc(item).tz(localTimeZone).format("HH:mm");
const dateTimeFormatter = item => moment.utc(item).tz(localTimeZone).format("MMM DD, HH:mm");

const colors = ["#197EED", "#FFAE6C", "#CA6363", "#CDB47C", "#E05455", "#8995BF", "#8DECFF", "#1E91C7", "#ECDF1F", "#F08B23", "#FF6D80", "#63D797"];

const xAxisFormatter = (item) => {
  if (moment(item).isValid()) {
    return dateFormatter(item)
  } else {
    return item;
  }
}

const getThumbnail = (item) => {
  if (item == null) {
    return ""
  } else {
    return item
  }
}

const renderPieLabel = (item) => {
  return item.name;
}

const CartesianChart = ({ resultSet, children, ChartComponent }) => (
  <ResponsiveContainer width="100%" height={350}>
    <ChartComponent margin={{ left: -10 }} data={resultSet.chartPivot()}>
      <XAxis axisLine={false} tickLine={false} tickFormatter={xAxisFormatter} dataKey="x" minTickGap={20} />
      <YAxis axisLine={false} tickLine={false} tickFormatter={numberFormatter} />
      <CartesianGrid vertical={false} />
      { children }
    <Tooltip labelFormatter={dateFormatter} formatter={numberFormatter} cursor={false} />
    </ChartComponent>
  </ResponsiveContainer>
)

const stackedChartData = resultSet => {
  const data = resultSet
    .pivot()
    .map(({ xValues, yValuesArray }) =>
      yValuesArray.map(([yValues, m]) => ({
        x: resultSet.axisValuesString(xValues, ", "),
        color: resultSet.axisValuesString(yValues, ", "),
        measure: m && Number.parseFloat(m)
      }))
    )
    .reduce((a, b) => a.concat(b), []);
  return data;
};

const TypeToChartComponent = {
  line: ({ resultSet }) => (
    <CartesianChart resultSet={resultSet} ChartComponent={LineChart}>
      {resultSet.seriesNames().map((series, i) => (
        <Line
          key={series.key}
          stackId="a"
          dataKey={series.key}
          name={series.title}
          stroke={colors[i]}
        />
      ))}
    </CartesianChart>
  ),
  bar: ({ resultSet }) => (
    <CartesianChart resultSet={resultSet} ChartComponent={BarChart}>
      {resultSet.seriesNames().map((series, i) => (
        <Bar
          key={series.key}
          stackId="a"
          dataKey={series.key} label={{ position: "top" }}
          name={series.title}
          fill={colors[i]}
        />
      ))}
    </CartesianChart>
  ),
  area: ({ resultSet }) => (
    <CartesianChart resultSet={resultSet} ChartComponent={AreaChart}>
      {resultSet.seriesNames().map((series, i) => (
        <Area
          key={series.key}
          stackId="a"
          dataKey={series.key}
          name={series.title}
          stroke={colors[i]}
          fill={colors[i]}
        />
      ))}
    </CartesianChart>
  ),
  pie: ({ resultSet }) => (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          isAnimationActive={true}
          data={resultSet.chartPivot()}
          nameKey="x"
          dataKey={resultSet.seriesNames()[0].key}
          fill="#8884d8"
	  label={renderPieLabel}
        >
          {resultSet.chartPivot().map((e, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
	<Tooltip />
      </PieChart>
    </ResponsiveContainer>
  ),
  number: ({ resultSet }) => (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{
        height: "100%"
      }}
    >
      <Col>
        {resultSet.seriesNames().map(s => (
          <Statistic value={resultSet.totalRow()[s.key]} />
        ))}
      </Col>
    </Row>
  ),
  numberHoursMins: ({ resultSet }) => (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{
        height: "100%"
      }}
    >
      <Col>
        {resultSet.seriesNames().map(s => (
          <Statistic value={timeLengthFormatter(resultSet.totalRow()[s.key]).split(":")[0] + " hours " + timeLengthFormatter(resultSet.totalRow()[s.key]).split(":")[1] + " minutes"} />
        ))}
      </Col>
    </Row>
  ),
  table: ({ resultSet, pivotConfig }) => (
    <Table
      pagination={false}
      columns={resultSet.tableColumns(pivotConfig)}
      dataSource={resultSet.tablePivot(pivotConfig)}
    />
  ),
  tableLive: ({ resultSet, pivotConfig }) => (
    <Table
      pagination={false}
      columns={[{
        title: 'Track',
        dataIndex: 'U2x.title'
      },
      {
        title: 'Artist / Presenter',
        dataIndex: 'U2x.artist'
      },
      {
        title: 'Release / Show',
        dataIndex: 'U2x.album'
      },
      {
        title: 'Time',
        dataIndex: 'U2x.timestamp',
	render: (text, record, index) => {return timeFormatter(text)}
      }]}
      dataSource={resultSet.tablePivot(pivotConfig)}
    />
  ),
  tableSong: ({ resultSet, pivotConfig }) => (
    <Table
      pagination={false}
      columns={[{
        title: 'Track',
        dataIndex: 'U2x.title'
      },
      {
        title: 'Artist',
        dataIndex: 'U2x.artist'
      },
      {
        title: 'Release',
        dataIndex: 'U2x.album'
      },
      {
        title: 'Timestamp',
        dataIndex: 'U2x.timestamp',
	render: (text, record, index) => {return dateTimeFormatter(text)}
      }]}
      dataSource={resultSet.tablePivot(pivotConfig)}
    />
  )
};

const TypeToMemoChartComponent = Object.keys(TypeToChartComponent)
  .map(key => ({
    [key]: React.memo(TypeToChartComponent[key])
  }))
  .reduce((a, b) => ({ ...a, ...b }));

const renderChart = Component => ({ resultSet, error }) =>
  (resultSet && <Component resultSet={resultSet} />) ||
  (error && error.toString()) || <Spin />;

const ChartRenderer = ({ vizState }) => {
  const { query, chartType } = vizState;
  const component = TypeToMemoChartComponent[chartType];
  const renderProps = useCubeQuery(query);
  return component && renderChart(component)(renderProps);
};

ChartRenderer.propTypes = {
  vizState: PropTypes.object,
  cubejsApi: PropTypes.object
};
ChartRenderer.defaultProps = {
  vizState: {},
  cubejsApi: null
};
export default ChartRenderer;
