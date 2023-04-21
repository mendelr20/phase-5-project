// index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import{UserContext}  from "./components/UserContext";
import App from "./components/App";

ReactDOM.render(
  <Router>
    <UserContext>
      <App />
    </UserContext>
  </Router>,
  document.getElementById("root")
);
