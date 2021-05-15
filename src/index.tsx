import React from "react";
import ReactDOM from "react-dom";
import "lib-flexible";
import "antd-mobile/dist/antd-mobile.css";
import App from "./App";
import { Toast } from "antd-mobile";
import { BrowserRouter } from "react-router-dom";
Toast.config({ mask: false });
ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById("root")
);
