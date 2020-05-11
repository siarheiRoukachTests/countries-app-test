import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./App.jsx";
import store from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./i18n";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
