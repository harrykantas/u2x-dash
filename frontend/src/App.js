import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./body.css";
//import "antd/dist/antd.css";
import "antd/dist/antd.dark.css";
import { Layout } from "antd";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import Header from "./components/Header";
import WebSocketTransport from "@cubejs-client/ws-transport";

const CUBEJS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDAzMDgzODh9.bWdyWACT1BcyQY9AuRp8yTHTSAEwZoX-LhoDfD3_2J4";
const WS_URL = "wss://u2x.u2songs.com/ws";
//const API_URL = "https://u2x.u2songs.com/cubejs-api/v1";

const cubejsApi = cubejs({
  transport: new WebSocketTransport({
    authorization: CUBEJS_TOKEN,
    apiUrl: WS_URL
  })
});

//const cubejsApi = cubejs(CUBEJS_TOKEN, {
//  apiUrl: API_URL
//});

const AppLayout = ({ children }) => (
  <Layout
    style={{
      height: "100%"
    }}
  >
    <Header />
    <Layout.Content>{children}</Layout.Content>
  </Layout>
);

const App = ({ children }) => (
  <CubeProvider cubejsApi={cubejsApi}>
    <AppLayout>{children}</AppLayout>
  </CubeProvider>
);

export default App;
