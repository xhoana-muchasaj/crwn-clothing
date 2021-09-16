import React from "react";
import FormIput from "../form-input/form-input.component";


class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    console.log({ value, name });
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormIput
            name="email"
            type="email"
            value={this.state.email}
            //label="email"
            required
            handleChange={this.handleChange}
          />

          <FormIput
            name="password"
            type="password"
            value={this.state.password}
            //label="password"
            required
            handleChange={this.handleChange}
          />

          <input type="submit" value="Submit the form" />
        </form>
      </div>
    );
  }
}

export default SignIn;