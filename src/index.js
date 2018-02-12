import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import { Provider } from "react-redux";
import logger from "redux-logger";

import reducers from "./reducers";
import Calendar from "./containers/calendar";

const createStoreWithMiddleware = applyMiddleware(promise, logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Calendar />
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
