import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import InputField from "../../ui/TextField";
import "./LoginForm.css";

function LoginForm( {setShowLogInModal} ) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const LoginBtnDisabled = !credential.length || !password.length

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
    .then(() => setShowLogInModal(false))
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemoUser1 = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
    .then(setShowLogInModal(false))
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    )
  }

  const handleDemoUser2 = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'MacBookProEnergy', password: 'password' }))
    .then(setShowLogInModal(false))
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    )
  }

  return (
    <div className="login-form-container">
      <div className="login-form-inner-container">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className="login-form-formContainer">
          <ul className="login-form-error-lists">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="login-form-credential-container">
            <div className="login-form-username-container">
              <InputField 
                size={{ m: 3, width: "35ch"}}
                setter={setCredential}
                val={credential}
                label={"Username or Email"}
                id={"standard-basic"}
                multiline={false}
                variant={"standard"}
                labelFontSize={"20px"}
              />
            </div>

            <div className="login-form-username-container">
              <InputField 
                size={{ m: 3, width: "35ch"}}
                setter={setPassword}
                val={password}
                label={"Password"}
                id={"standard-basic"}
                multiline={false}
                variant={"standard"}
                labelFontSize={"20px"}
              />
            </div>
          </div>
          <div className="login-form-login-btn-container">
            <button 
            type="submit" 
            className={!LoginBtnDisabled ? "login-form-login-btn" : "login-form-login-btn-disabled"}
            disabled={LoginBtnDisabled}
            >
              Log In
            </button>

          </div>

        </form>

        <div className="login-form-demo-button-container">
          <button
            className="demoUserButton"
            onClick={handleDemoUser1}>Demo user 1</button>
          <button
            className="demoUserButton"
            onClick={handleDemoUser2}>Demo user 2</button>
        </div>
      </div>

    </div>
  );
}

export default LoginForm;
