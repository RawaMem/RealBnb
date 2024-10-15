import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import InputField from "../../ui/TextField";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import * as sessionActions from "../../store/session";
import "../LoginFormModal/LoginForm.css";

function SignupForm({ setShowSignUpModal }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const signupDisabled =
    !email.length ||
    !username.length ||
    !password.length ||
    !confirmPassword.length ||
    !firstName.length ||
    !lastName.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email,
          username,
          password,
          firstName,
          lastName,
        })
      )
        .then(() => setShowSignUpModal(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  const responseGoogle = async (response) => {
    const decodedToken = jwtDecode(response.credential);
    console.log({ decodedToken });
    await dispatch(
      sessionActions.signup({
        username: decodedToken.name,
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name,
        email: decodedToken.email,
        password: decodedToken.sub,
      })
    );
    if (user) {
      history.push("/feed");
    }

    return response;
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-inner-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="signup-form-formContainer">
          <ul className="signup-form-error-lists">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>

          <div className="signup-form-email-container">
            <InputField
              size={{ m: 2, width: "35ch" }}
              setter={setEmail}
              val={email}
              label={"Email"}
              id={"standard-basic"}
              multiline={false}
              variant={"standard"}
              labelFontSize={"20px"}
            />
          </div>
          <div className="signup-form-username-container">
            <InputField
              size={{ m: 2, width: "35ch" }}
              setter={setUsername}
              val={username}
              label={"Username"}
              id={"standard-basic"}
              multiline={false}
              variant={"standard"}
              labelFontSize={"20px"}
            />
          </div>
          <div className="signup-form-username-container">
            <InputField
              size={{ m: 2, width: "35ch" }}
              setter={setFirstName}
              val={firstName}
              label={"First Name"}
              id={"standard-basic"}
              multiline={false}
              variant={"standard"}
              labelFontSize={"20px"}
            />
          </div>
          <div className="signup-form-username-container">
            <InputField
              size={{ m: 2, width: "35ch" }}
              setter={setLastName}
              val={lastName}
              label={"Last Name"}
              id={"standard-basic"}
              multiline={false}
              variant={"standard"}
              labelFontSize={"20px"}
            />
          </div>
          <div className="signup-form-password-container">
            <InputField
              size={{ m: 2, width: "35ch" }}
              setter={setPassword}
              val={password}
              label={"Password"}
              id={"standard-basic"}
              multiline={false}
              variant={"standard"}
              labelFontSize={"20px"}
            />
          </div>
          <div className="signup-form-password-container">
            <InputField
              size={{ m: 2, width: "35ch" }}
              setter={setConfirmPassword}
              val={confirmPassword}
              label={"Confirm Password"}
              id={"standard-basic"}
              multiline={false}
              variant={"standard"}
              labelFontSize={"20px"}
            />
          </div>

          <div className="signup-form-login-btn-container">
            <button
              type="submit"
              className={
                !signupDisabled ? "signup-form-btn" : "signup-form-btn-diabled"
              }
              disabled={signupDisabled}
            >
              Sign Up
            </button>
          </div>
        </form>
        <GoogleLogin
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          // onClick={(e) => {
          //   e.preventDefault();
          //   history.push(`/feed`);
          // }}
        ></GoogleLogin>
      </div>
    </div>
  );
}

export default SignupForm;
