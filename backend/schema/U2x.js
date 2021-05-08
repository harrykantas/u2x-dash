cube(`U2x`, {
  sql: `SELECT * FROM u2x.u2x`,

  refreshKey: {
    sql: `SELECT UNIX_TIMESTAMP()`
  },
  
  joins: {},
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [timestamp, title]
    },
    
    duration: {
      sql: `duration`,
      type: `sum`
    },

    numU2Releases80s: {
      type: `count`,
      drillMembers: [timestamp, title],
      title: 'Releases from 1980-1989',
      filters: [
        { sql: `${CUBE}.artist like '%U2%'` },
        { sql: `${CUBE}.type = 'Song'` },
        { sql: 
	  `
	   ${CUBE}.album like '%Boy%' OR
	   ${CUBE}.album like '%October%' OR
	   ${CUBE}.album like '%War%' OR
	   ${CUBE}.album like '%Blood Red Sky%' OR
	   ${CUBE}.album like '%Red Rocks%' OR
	   ${CUBE}.album like '%Unforgettable Fire%' OR
	   ${CUBE}.album like '%Wide Awake In America%' OR
	   ${CUBE}.album like '%Joshua Tree%' OR
	   ${CUBE}.album like '%Rattle and Hum%' OR
	   ${CUBE}.album like '%Best Of 1980%' OR
           ${CUBE}.album like '%Best Of U2-1980-90%' OR
           ${CUBE}.album like '%Live From Paris%' OR
           ${CUBE}.album like '%Live From The Point Depot%'
	  `
	}
      ]
    },

    numU2Releases90s: {
      type: `count`,
      drillMembers: [timestamp, title],
      title: 'Releases from 1990-1999',
      filters: [
        { sql: `${CUBE}.artist like '%U2%' OR ${CUBE}.artist like '%Passengers%'` },
        { sql: `${CUBE}.type = 'Song'` },
        { sql: 
	  `
	   ${CUBE}.album like '%Achtung Baby%' OR
           ${CUBE}.album like '%Zooropa%' OR
           ${CUBE}.album like '%Pop%' OR
           ${CUBE}.album like '%Original Soundtracks 1%' OR
           ${CUBE}.album like '%Best Of 1990%' OR
           ${CUBE}.album like '%Wild Horses%' OR
           ${CUBE}.album like '%Zoo TV%' OR
           ${CUBE}.album like '%Hasta La Vista Baby%' OR
           ${CUBE}.album like '%Please%'
	  `
	}
      ]
    },

    numU2Releases00s: {
      type: `count`,
      drillMembers: [timestamp, title],
      title: 'Releases from 2000-2009',
      filters: [
        { sql: `${CUBE}.artist like '%U2%'` },
        { sql: `${CUBE}.type = 'Song'` },
        { sql: 
	  `
	   ${CUBE}.album like '%All That You Can_t Leave Behind%' OR
           ${CUBE}.album like '%How To Dismantle An Atomic Bomb%' OR
           ${CUBE}.album like '%No Line On The Horizon%' OR
           ${CUBE}.album like '%25th Anniversary Rock%' OR
           ${CUBE}.album like '%U2 Go Home%' OR
           ${CUBE}.album like '%Live From Slane Castle%' OR
           ${CUBE}.album like '%From The Ground Up%' OR
           ${CUBE}.album like '%Under The Brooklyn Bridge%' OR
           ${CUBE}.album like '%U22%' OR
           ${CUBE}.album like '%The Breakthrough%' OR
           ${CUBE}.album like '%Rose Bowl%' OR
	   ${CUBE}.album like '%Medium, Rare & Remastered%' OR
	   ${CUBE}.album like '%Artificial Horizon%'
	  `
	}
      ]
    },

    numU2Releases10s: {
      type: `count`,
      drillMembers: [timestamp, title],
      title: 'Releases from 2010-2019',
      filters: [
        { sql: `${CUBE}.artist like '%U2%'` },
        { sql: `${CUBE}.type = 'Song'` },
        { sql: 
	  `
	   ${CUBE}.album like '%Songs Of Innocence%' OR
           ${CUBE}.album like '%Songs Of Experience%'
	  `
	}
      ]
    },

    numU2Releases20s: {
      type: `count`,
      drillMembers: [timestamp, title],
      title: 'Releases from 2020-Present',
      filters: [
        { sql: `${CUBE}.artist like '%U2%'` },
        { sql: `${CUBE}.type = 'Song'` },
        { sql: 
	  `
	   ${CUBE}.album like '%Angelheaded Hipster%'
	  `
	}
      ]
    },

    numU2Songs: {
      type: `count`,
      drillMembers: [timestamp, title],
      title: "U2 Songs",
      filters: [
        { sql: `${CUBE}.artist like '%U2%' OR ${CUBE}.artist like '%Passengers%'` },
	{ sql: `${CUBE}.type = 'Song'` }
      ]
    },

    numNonU2Songs: {
      type: `count`,
      drillMembers: [timestamp, title],
      title: "Non-U2 Songs",
      filters: [
        { sql: `${CUBE}.artist NOT like '%U2%' AND ${CUBE}.artist NOT like '%Passengers%'` },
	{ sql: `${CUBE}.type = 'Song'` }
      ]
    },

    sumBonoTime: {
      sql: `duration`,
      type: `sum`,
      drillMembers: [timestamp, title],
      title: "Bono Air Time",
      filters: [
        { sql: `${CUBE}.artist like '%Bono%' OR ${CUBE}.title like '%Bono%'` },
	{ sql: `${CUBE}.type = 'Link'` }
      ]
    },

    sumEdgeTime: {
      sql: `duration`,
      type: `sum`,
      drillMembers: [timestamp, title],
      title: "Edge Air Time",
      filters: [
        { sql: `${CUBE}.artist like '%Edge%' OR ${CUBE}.title like '%Edge%'` },
	{ sql: `${CUBE}.type = 'Link'` }
      ]
    },

    sumAdamTime: {
      sql: `duration`,
      type: `sum`,
      drillMembers: [timestamp, title],
      title: "Adam Air Time",
      filters: [
        { sql: `${CUBE}.artist like '%Adam Clayton%' OR ${CUBE}.title like '%Adam Clayton%'` },
	{ sql: `${CUBE}.type = 'Link'` }
      ]
    },

    sumLarryTime: {
      sql: `duration`,
      type: `sum`,
      drillMembers: [timestamp, title],
      title: "Larry Air Time",
      filters: [
        { sql: `${CUBE}.artist like '%Larry Mullen%' OR ${CUBE}.title like '%Larry Mullen%'` },
	{ sql: `${CUBE}.type = 'Link'` }
      ]
    },
  },
  
  dimensions: {
    album: {
      sql: `album`,
      type: `string`
    },
    
    artist: {
      sql: `artist`,
      type: `string`
    },
    
    artwork: {
      sql: `artwork`,
      type: `string`,
      format: `imageUrl`
    },

    timestamp: {
      sql: `timestamp`,
      type: `time`,
      primaryKey: true,
      shown: true
    },
    
    title: {
      sql: `title`,
      type: `string`
    },
    
    type: {
      sql: `type`,
      type: `string`
    }
  },

  segments: {},

  preAggregations: {
    dimByTimestamp: {
      type: `rollup`,
      dimensionReferences: [title, artist, album],
      timeDimensionReference: timestamp,
      granularity: `hour`,
      partitionGranularity: `day`,
      external: true,
      scheduledRefresh: true
    },
    cdByTimestamp: {
      type: `rollup`,
      measureReferences: [count, duration],
      dimensionReferences: [title, artist, album, type],
      timeDimensionReference: timestamp,
      granularity: `day`,
      partitionGranularity: `month`,
      external: true,
      scheduledRefresh: true
    },
    numsByTimestamp: {
      type: `rollup`,
      measureReferences: [numU2Releases80s, numU2Releases90s, numU2Releases00s, numU2Releases10s, numU2Songs, numNonU2Songs],
      timeDimensionReference: timestamp,
      granularity: `day`,
      partitionGranularity: `month`,
      external: true,
      scheduledRefresh: true
    }
  }
});

