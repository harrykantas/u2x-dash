//const CubejsServer = require('@cubejs-backend/server');
const MySQLDriver = require('@cubejs-backend/mysql-driver');
const bodyParser = require('body-parser');
const path = require('path');
const serveStatic = require('serve-static');
require('dotenv').config();

// Cube.js configuration options: https://cube.dev/docs/config
module.exports = {
  webSockets: true,
  webSocketsBasePath: "/ws",
  initApp: (app) => {
    app.use(require('cors')());
    app.use(bodyParser.json({ limit: '50mb' }));
    if (process.env.NODE_ENV === 'production') {
      app.use(serveStatic(path.join(__dirname, '../frontend/build')));
    }
  },
  externalDriverFactory: () => new MySQLDriver({
       host: process.env.CUBEJS_EXT_DB_HOST,
       database: process.env.CUBEJS_EXT_DB_NAME,
       port: process.env.CUBEJS_EXT_DB_PORT,
       user: process.env.CUBEJS_EXT_DB_USER,
       password: process.env.CUBEJS_EXT_DB_PASS,
       ssl: undefined,
  }),
  scheduledRefreshTimer: true,
  processSubscriptionsInterval: 1,
  orchestratorOptions: {
    queryCacheOptions: {
      refreshKeyRenewalThreshold: 1
    }
  }
};
