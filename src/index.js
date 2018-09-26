import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Counter from "./components/counter";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(<Counter />, document.getElementById("root"));
registerServiceWorker();
