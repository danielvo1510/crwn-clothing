import React from "react";
import "./sign-up.style.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, creatUserProfileDocument } from "../../firebase/firebase.utils";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, confirmPassword, password, displayName } = this.state;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await creatUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, confirmPassword, password, displayName } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            value={displayName}
            handleChange={this.handleChange}
            required
            label="Display Name"
          ></FormInput>
          <FormInput
            name="email"
            type="email"
            value={email}
            handleChange={this.handleChange}
            required
            label="email"
          ></FormInput>

          <FormInput
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={password}
            required
            label="password"
          ></FormInput>

          <FormInput
            name="confirmPassword"
            type="confirmPassword"
            handleChange={this.handleChange}
            value={confirmPassword}
            required
            label="confirm password"
          ></FormInput>
          <div className="button">
            <CustomButton type="submit">Sign up</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
