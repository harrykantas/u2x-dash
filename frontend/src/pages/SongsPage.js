import React, { useState } from "react";
import { Col } from "antd";
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
import SongNames, { getMatchingSongs, getNonMatchingSongs } from "../components/Songs";

const DashboardItems = [
  {
    id: 0,
    size: 8,
    name: "Song Play Count [All Time]",
    description: "The total number of times the selected song has ever been played.",
    vizState: {
      query: {
        measures: ["U2x.count"],
        timeDimensions: [
          {
            dimension: "U2x.timestamp"
          }
        ],
        order: {
          "U2x.timestamp": "asc"
        },
        dimensions: [],
        filters: [
          {
            dimension: "U2x.type",
            operator: "equals",
            values: ["Song"]
          }
        ]
      },
      chartType: "number"
    }
  },
  {
    id: 1,
    size: 8,
    name: "Song Play Time [All Time]",
    description: "The total time the selected song has amounted to.",
    vizState: {
      query: {
        measures: ["U2x.duration"],
        timeDimensions: [
          {
            dimension: "U2x.timestamp"
          }
        ],
        order: {
          "U2x.timestamp": "asc"
        },
        filters: [
          {
            dimension: "U2x.type",
            operator: "equals",
            values: ["Song"]
          }
        ]
      },
      chartType: "numberHoursMins"
    }
  },
  {
    id: 100,
    size: 12,
    name: "Song Play Count [All Time]",
    description: "Play count of the different tracks for the selected song that were ever played.",
    vizState: {
      query: {
        measures: ["U2x.count"],
        timeDimensions: [],
        order: {
          "U2x.title": "asc"
        },
        filters: [
          {
            dimension: "U2x.type",
            operator: "equals",
            values: ["Song"]
	  }
        ],
        dimensions: ["U2x.title"]
      },
      chartType: "pie"
    }
  },
  {
    id: 101,
    size: 12,
    name: "Song Last Played",
    description: "The last 5 times the selected song was played in the last 14 days.",
    vizState: {
      query: {
        measures: [],
        timeDimensions: [
          {
            dimension: "U2x.timestamp",
            dateRange: "from 14 days ago to now"
          }
        ],
        order: {
          "U2x.timestamp": "desc"
        },
        dimensions: ["U2x.timestamp", "U2x.title", "U2x.album", "U2x.artist"],
        filters: [],
        limit: 5
      },
      chartType: "tableSong"
    }
  },
  {
    id: 102,
    size: 12,
    name: "Song Timeline [Last 14 days]",
    description: "Play count of the different tracks for the selected song that were played in the last 14 days.",
    vizState: {
      query: {
        measures: ["U2x.count"],
	dimensions: ["U2x.title"],
        timeDimensions: [
          {
            dimension: "U2x.timestamp",
            granularity: "day",
            dateRange: "last 14 days"
          }
        ],
        order: {
          "U2x.count": "desc"
        },
        filters: [
          { 
            dimension: "U2x.type",
            operator: "equals",
            values: ["Song"]
          }
	]
      },
      chartType: "bar"
    }
  },
  {
    id: 103,
    size: 12,
    name: "Song Play Frequency [Last 30 days]",
    description: "The total number of times the selected song was played daily in the last 30 days.",
    vizState: {
      query: {
        measures: ["U2x.count"],
	dimensions: [],
        timeDimensions: [
          {
            dimension: "U2x.timestamp",
            granularity: "day",
            dateRange: "last 30 days"
          }
        ],
        order: {
          "U2x.count": "desc"
        },
        filters: [
          { 
            dimension: "U2x.type",
            operator: "equals",
            values: ["Song"]
          }
	]
      },
      chartType: "area"
    }
  }
];

const dashboardItemsWithFilter = (dashboardItems, statusFilter) => {
  if (statusFilter === "none") {
    return [];
  }

  const filterObj = {
    or: [
      { and: [
        {
          dimension: "U2x.artist",
          operator: "contains",
          values: ["U2", "Passengers"]
	},
        {
          dimension: "U2x.artist",
          operator: "notContains",
          values: ["U2 X-Radio", "#U2XRadio"]
	},
        {
          member: "U2x.title",
          operator: "contains",
          values: getMatchingSongs(statusFilter)
        },
        { 
          member: "U2x.title",
          operator: "notContains",
          values: getNonMatchingSongs(statusFilter)
        }
      ]},
      { and: [
	{
          member: "U2x.artist",
	  operator: "contains",
	  values: getMatchingSongs(statusFilter)
        },
        {
          member: "U2x.artist",
          operator: "notContains",
          values: getNonMatchingSongs(statusFilter)
        },
	{
	  member: "U2x.artist",
	  operator: "contains",
	  values: ["LIVE", "LIV"]
	}
      ]}
    ]	
  };

  return dashboardItems.map(({ vizState, ...dashboardItem }) => (
    {
      ...dashboardItem,
      vizState: {
        ...vizState,
        query: {
          ...vizState.query,
	  filters: (vizState.query.filters || []).concat(filterObj),
        },
      }
    }
  ))
};

const SongsPage = () => {

  const [statusFilter, setStatusFilter] = useState("none");

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
      <DashboardItem title={item.name} description={item.description}>
        <ChartRenderer vizState={item.vizState} />
      </DashboardItem>
    </Col>
  );

  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
      backgroundColor: theme.palette.primary.dark
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
      backgroundColor: theme.palette.primary.light
    },
  }));

  const classes = useStyles();
  const [state, setState] = React.useState({
    song: '',
    name: 'none',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const song = event.target.value;
    setState({
      ...state,
      [name]: song,
    });
    setStatusFilter(song);
  };

  return state.song ? ([
    <Dashboard>
    <Col
      span={24}
      lg={8}
      key={0}
      style={{
        textAlign: "center",
        marginBottom: "24px"
      }}
    >
      <DashboardItem title="Song Title" description="Select a Song from the list.">
        <Select
          native 
	  value={state.song}
	  onChange={handleChange}
	  className={classes.selectEmpty} 
	  inputProps={{ name: 'song', id: 'song-native-helper' }}
	  color={"primary"}
        >
          {SongNames.map(value => (
            <option value={value} style={{cursor: "touch"}}>{value}</option>
          ))}
        </Select>
      </DashboardItem>
    </Col>
      {dashboardItemsWithFilter(DashboardItems, statusFilter).map(dashboardItem)}
      <div>
        <p>(c) @harrykantas for @u2songs, 2020</p>
      </div>
    </Dashboard>
  ]) : (
    <Dashboard>
    <Col
      span={24}
      lg={8}
      key={0}
      style={{
        textAlign: "center",
        marginBottom: "24px"
      }}
    >
      <DashboardItem title="Song Title" description="Select a Song from the list.">
        <Select
          native 
	  value={state.song}
	  onChange={handleChange}
	  className={classes.selectEmpty} 
	  inputProps={{ name: 'song', id: 'song-native-helper' }}
	  color={"primary"}
        >
	  <option aria-label="None" value="none">Select A Song...</option>
          {SongNames.map(value => (
            <option value={value} style={{cursor: "touch"}}>{value}</option>
          ))}
        </Select>
      </DashboardItem>
    </Col>
    <Col span={24} lg={8} key={1} style={{textAlign: "center", marginBottom: "24px"}}></Col>
    <Col span={24} lg={8} key={2} style={{textAlign: "center", marginBottom: "24px"}}></Col>
    </Dashboard>
  );
};

export default SongsPage;
