import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./sass/Index.scss";

import DashboardLayout from "./screens/dashboard/layout/layout.screen";

import LoginScreen from "./screens/LoginScreen/login.screen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/" component={DashboardLayout} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
