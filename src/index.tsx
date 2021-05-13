import React from "react";
import ReactDOM from "react-dom";
import "lib-flexible";
import "antd-mobile/dist/antd-mobile.css";
import App from "./App";
import { Toast } from "antd-mobile";
Toast.config({ mask: false });
ReactDOM.render(<App />, document.getElementById("root"));
