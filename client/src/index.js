import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import { UserContext } from "./components/UserContext";

ReactDOM.render(
  <Router>
    <UserContext.Provider value={{
      user: null,
      setUser: () => {},
      showLoginForm: true,
      setShowLoginForm: () => {},
      posts: null,
      setPosts: () => {},
      showLogin: true,
      setShowLogin: () => {},
      categories: null,
      setCategories: () => {}
    }}>
      <App />
    </UserContext.Provider>
  </Router>,
  document.getElementById("root")
);
