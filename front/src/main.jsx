// 8 https://www.youtube.com/watch?v=g5LG5DVfImM&list=PLQeZxRj52I-EBYSYiFmK41efqLUcjw_BA&index=11
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
