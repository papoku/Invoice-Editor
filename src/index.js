/*main page that renders
when the site gets first hit */

import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import reducers from "./reducers/index";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
