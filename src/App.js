import React,{useEffect} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./sass/Index.scss";

import DashboardLayout from "./screens/dashboard/layout/layout.screen";

import LoginScreen from "./screens/LoginScreen/login.screen";

import {signInIfAlreadySigned} from "./redux/actions/user.actions";

function App(props) {

  //Login if there exists a token in local storage
  const signInIfAlreadySigned = props.signInIfAlreadySigned;
  useEffect(()=>{
    signInIfAlreadySigned();
  },[signInIfAlreadySigned])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              props.user  ? <DashboardLayout /> : <LoginScreen />
            }
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps,{signInIfAlreadySigned})(App);
