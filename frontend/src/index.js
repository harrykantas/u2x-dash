import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SongsPage from "./pages/SongsPage";
import FaqPage from "./pages/FaqPage";
import TimelinePage from "./pages/TimelinePage";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Route key="index" exact path="/" component={DashboardPage} />
        <Route key="index" exact path="/songs" component={SongsPage} /> 
        <Route key="index" exact path="/faq" component={FaqPage} /> 
        <Route key="index" exact path="/enilemit" component={TimelinePage} /> 
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
); 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
