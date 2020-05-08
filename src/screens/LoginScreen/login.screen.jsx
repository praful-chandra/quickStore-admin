import React, { Component } from "react";

import TextBox from "../../components/textBox/textBox.component";
import ActionButton from "../../components/actionButton/actionButton.component";

class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
  };

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-content">
          <div className="login-content-head">
            <img src={require("../../Assets/logo.png")} alt="Logo" />
            <div>Login As Admin</div>
          </div>

          <div className="login-content-body">
            <TextBox
              title="E-mail"
              placeholder="user@mail.com"
              size="43"
              type="text"
              value={this.state.email}
              cb={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
            <TextBox
              title="Password"
              placeholder="****"
              size="43"
              type="password"
              value={this.state.password}
              cb={(e) => {
                this.setState({ password: e.target.value });
              }}
            />

            <ActionButton
              title="Login"
              size="19"
              cb={() => {
                console.log(this.state);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
