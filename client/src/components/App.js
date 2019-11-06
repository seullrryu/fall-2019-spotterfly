import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login.js";
import Profile from "./components/Profile.js";

class App extends Component {
  render() {
    return (
      <router>
        <div className="App">
          <Route path="/Login" Component={Login} />
          <Route path="/Profile" Component={Profile} />

          <footer>
            Copyright © Seulmin Ryu, Yena Park, Alexander Goldman, Zhongheng Sun
            2019
          </footer>
        </div>
      </router>
    );
  }
}

export default App;
