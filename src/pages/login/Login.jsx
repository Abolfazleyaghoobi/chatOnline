import "./Login.css";
import assets from "../../assets/assets";
import { useState } from "react";
import { sinup, login,resetPass } from "../../config/firebase";
function Login() {
  const [currState, setCurrState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "Sign Up") {
      sinup(userName, email, password);
    }
    else{
      login(email,password);
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="login_form">
        <h2>{currState === "Sign Up" ? "Sign Up" : "Login"}</h2>
        {currState === "Sign Up" ? (
          <input
            type="text"
            placeholder="username"
            required
            className="form_input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        ) : null}
        <input
          type="text"
          placeholder="Email Address"
          required
          className="form_input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="password"
          required
          className="form_input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
          {currState === "login" ?     <p className="login_toggle">
              Forgot Password{"  "}
              <span onClick={() => resetPass(email)}>reset here</span>
            </p> : null}
        </div>
      </form>
    </div>
  );
}

export default Login;
