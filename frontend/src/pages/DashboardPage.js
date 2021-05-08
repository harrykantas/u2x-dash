import React, { useState } from "react";
import { Col } from "antd";
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
import Tooltip from '@material-ui/core/Tooltip';

const LiveSchedule = {
  id: 99,
  name: "Live Schedule",
  description: "The last 5 tracks played.",
  vizState: {
    query: {
      measures: [],
      timeDimensions: [
        {
          dimension: "U2x.timestamp",
          dateRange: "from 2 hours ago to now"
        }
      ],
      order: {
        "U2x.timestamp": "desc"
      },
      filters: [],
      dimensions: ["U2x.title", "U2x.artist", "U2x.album", "U2x.timestamp"],
      limit: 5
    },
    chartType: "tableLive"
  }
};

const MiscItems = [
  {
    id: 0,
    size: 8,
    name: "U2 Tracks Played [All Time]",
    description: "The total number of U2 tracks ever played. (Yes, Passengers too!)",
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
          },
          {
            dimension: "U2x.artist",
            operator: "contains",
            values: ["U2", "Passengers"]
          }
        ]
      },
      chartType: "number"
    }
  },
  {
    id: 1,
    size: 8,
    name: "U2 Music Played [All Time]",
    description: "The total time all U2 songs ever played have amounted to. (Yes, Passengers too!)",
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
          },
          {
            dimension: "U2x.artist",
            operator: "contains",
            values: ["U2", "Passengers"]
          }
        ]
      },
      chartType: "numberHoursMins"
    }
  },
  {
    id: 2,
    size: 8,
    name: "Non-U2 Music Played [All Time]",
    description: "The total time non U2 songs ever played have amounted to.",
    vizState: {
      query: {
        dimensions: [],
        timeDimensions: [
          {
            dimension: "U2x.timestamp"
          }
        ],
        order: {},
        measures: ["U2x.duration"],
        filters: [
          {
            dimension: "U2x.type",
            operator: "equals",
            values: ["Song"]
          },
          {
            dimension: "U2x.artist",
            operator: "notContains",
            values: ["U2", "Passengers"]
          }
        ]
      },
      chartType: "numberHoursMins"
    }
  },
  {
    id: 3,
    size: 12,
    name: "Top20 Most Played U2 Tracks [Last 30 Days]",
    description: "Play count for the 20 most played U2 tracks in the last 30 days.",
    vizState: {
      query: {
        measures: ["U2x.count"],
        timeDimensions: [
          {
            dimension: "U2x.timestamp",
            dateRange: "last 30 days"
          }
        ],
        order: {
          "U2x.count": "desc"
        },
        dimensions: ["U2x.title"],
        filters: [
          {
            dimension: "U2x.type",
            operator: "equals",
            values: ["Song"]
          },
          {
            dimension: "U2x.artist",
            operator: "contains",
            values: ["U2", "Passengers"]
          }
        ],
        limit: 20
      },
      chartType: "pie"
    }
  },
  {
    id: 4,
    size: 12,
    name: "Top20 Least Played U2 Tracks [Last 30 Days]",
    description: "Play count for the 20 least played U2 tracks in the last 30 days.",
    vizState: {
      query: {
        measures: ["U2x.count"],
        timeDimensions: [
          {
            dimension: "U2x.timestamp",
            dateRange: "last 30 days"
          }
        ],
        order: {
          "U2x.count": "asc"
        },
        dimensions: ["U2x.title"],
        filters: [
          {
            dimension: "U2x.type",
            operator: "equals",
            values: ["Song"]
          },
          {
            dimension: "U2x.artist",
            operator: "contains",
            values: ["U2", "Passengers"]
          }
        ],
        limit: 20
      },
      chartType: "pie"
    }
  },
  {
    id: 5,
    size: 12,
    name: "Top20 Most Played Live U2 Shows [Last 30 Days]",
    description: "Play count for the 20 most played U2 shows in the last 30 days.",
    vizState: {
      query: {
          "measures": [
          "U2x.count"
        ],
        "timeDimensions": [
          {
            "dimension": "U2x.timestamp",
            "dateRange": "Last 7 days"
          }
        ],
        "order": {
          "U2x.count": "desc"
        },
        "dimensions": [
          "U2x.title"
        ],
        "filters": [
          {
            "dimension": "U2x.artist",
            "operator": "contains",
            "values": ["LIV"]
          }
        ],
        limit: 20
      },
      chartType: "pie"
    }
  },
  {
    id: 6,
    size: 12,
    name: "U2 Songs Played by Decade [Last 30 Days]",
    description: "The number of U2 songs played from each decade in the last 30 days.",
    vizState: {
      query: {
        measures: [
          "U2x.numU2Releases80s",
          "U2x.numU2Releases90s",
          "U2x.numU2Releases00s",
          "U2x.numU2Releases10s",
          "U2x.numU2Releases20s"
        ],
        timeDimensions: [
          {
            dimension: "U2x.timestamp",
            granularity: "day",
            dateRange: "last 30 days"
          }
        ],
        order: {
          "U2x.timestamp": "asc"
        },
        dimensions: [],
        filters: []
      },
      chartType: "bar"
    }
  },
  {
    id: 7,
    size: 12,
    name: "U2 VS Non-U2 Songs Played [Last 30 Days]",
    description: "A comparison of how many U2 vs non U2 songs were played per day for the last 30 days.",
    vizState: {
      query: {
        measures: ["U2x.numU2Songs", "U2x.numNonU2Songs"],
        timeDimensions: [
          {
            dimension: "U2x.timestamp",
            granularity: "day",
            dateRange: "Last 30 days"
          }
        ],
        order: {
          "U2x.timestamp": "desc"
        },
        filters: []
      },
      chartType: "area"
    }
  },
  {
    id: 8,
    size: 12,
    name: "Top20 Non-U2 Artists Played [Last 14 Days]",
    description: "Play count for the 20 most played non U2 artists in the last 14 days.",
    vizState: {
      query: {
        measures: ["U2x.count"],
        timeDimensions: [
          {
            dimension: "U2x.timestamp",
            dateRange: "last 14 days"
          }
        ],
        order: {
          "U2x.timestamp": "desc"
        },
        dimensions: ["U2x.artist"],
        filters: [
          {
            dimension: "U2x.type",
            operator: "equals",
            values: ["Song"]
          },
          {
            dimension: "U2x.artist",
            operator: "notContains",
            values: [
              "U2",
              "Passengers",
              "Bono",
              "Edge",
              "Adam Clayton",
              "Larry Mullen",
              "LIVE",
	      "BBC Studios 9.3.81"
            ]
          },
          {
            dimension: "U2x.album",
            operator: "notContains",
            values: ["Live", "Wide Awake"]
          }
        ],
        limit: 20
      },
      chartType: "pie"
    }
  },
  {
    id: 9,
    size: 12,
    name: "U2X Show Host Air Time [Last 14 Days]",
    description: "The 10 lengthiest U2X host segments aired in the last 14 days. (Total time is in seconds)",
    vizState: {
      query: {
        measures: ["U2x.duration"],
        timeDimensions: [
          {
            dimension: "U2x.timestamp",
	    dateRange: "last 14 days"
          }
        ],
        order: {
          "U2x.duration": "desc"
        },
        dimensions: [
	  "U2x.artist",
	  "U2x.title"
	],
        filters: [
          {
            dimension: "U2x.album",
            operator: "notSet"
          },
	  {
	    dimension: "U2x.type",
	    operator: "notEquals",
	    values: ["Song", "Exp"]
	  },
          {
            dimension: "U2x.title",
            operator: "notContains",
            values: [
              "desire@siriusxm.com",
              "#U2XRadio",
              "917-540-8477",
	      "Tonight",
	      "Tonite",
	      "Today",
	      "Tmrw"
            ]
          },
          {
            dimension: "U2x.artist",
            operator: "notContains",
            values: [
              "U2 X-Radio",
	      "desire@siriusxm.com"
            ]
          }
        ],
        limit: 10
      },
      chartType: "pie"
    }
  },
  {
    id: 10,
    size: 12,
    name: "Desire Show Host Air Time [Last 14 Days]",
    description: "Desire host segments aired in the last 14 days. Sorted by duration. (Total time is in seconds)",
    vizState: {
      query: {
        measures: ["U2x.duration"],
        timeDimensions: [
          {
            dimension: "U2x.timestamp",
	    dateRange: "last 14 days"
          }
        ],
        order: {
          "U2x.duration": "desc"
        },
        dimensions: [
	  "U2x.title"
	],
        filters: [
          {
            dimension: "U2x.album",
            operator: "notSet"
          },
	  {
	    dimension: "U2x.type",
	    operator: "equals",
	    values: ["Link"]
	  },
          {
            dimension: "U2x.title",
            operator: "notEquals",
            values: [
              "desire@siriusxm.com",
              "917-540-8477"
            ]
          },
          {
            dimension: "U2x.artist",
            operator: "equals",
            values: [
              "U2 X-Radio"
            ]
          }
        ]
      },
      chartType: "pie"
    }
  }
];

MiscItems.push(LiveSchedule);
const DashboardItems = MiscItems;

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
      <DashboardItem title={item.name} description={item.description}>
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
      <div>
        <p>(c) @harrykantas for @u2songs, 2020</p>
      </div>
    </Dashboard>
  ) : (
    <Empty />
  );

};

export default DashboardPage;
