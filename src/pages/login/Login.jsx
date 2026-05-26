import "./Login.css";
import assets from "../../assets/assets";
import { useState } from "react";
function Login() {
  const [currState, setCurrState] = useState("Sign Up");
  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login_form">
        <h2>{currState === "Sign Up" ? "Sign Up" : "Login"}</h2>
        {currState === "Sign Up" ? (
          <input
            type="text"
            placeholder="username"
            required
            className="form_input"
          />
        ) : null}
        <input
          type="text"
          placeholder="Email Address"
          required
          className="form_input"
        />
        <input
          type="text"
          placeholder="password"
          required
          className="form_input"
        />
        <button type="submit">
          {currState === "Sign Up" ? "Sign Up" : "Login"}
        </button>
        <div className="login_term">
          <input type="checkbox" />
          <p>Agree to the term of use & privacy policy</p>
        </div>
        <div className="login_forgot">
          {currState === "Sign Up" ? (
            <p className="login_toggle">
              Already have an account
              <span onClick={() => setCurrState("login")}>click here</span>
            </p>
          ) : (
            <p className="login_toggle">
              create an account {"  "}
              <span onClick={() => setCurrState("Sign Up")}>click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
