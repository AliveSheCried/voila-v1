import {
  faArrowRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useUser } from "../../providers/UserProvider";

function Login({ onLogin }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [timer, setTimer] = useState(null);
  const { user, setUser } = useUser();

  //email regex
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //Function to toggle password visibility
  function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const currentType = passwordInput.getAttribute("type");

    if (currentType === "password") {
      passwordInput.setAttribute("type", "text");
      setPasswordVisible(true);
    } else {
      passwordInput.setAttribute("type", "password");
      setPasswordVisible(false);
    }
  }

  //Function to validate email
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Clear the existing timer if there is one
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer
    setTimer(
      setTimeout(() => {
        setIsEmailValid(emailPattern.test(newEmail));
      }, 500) // 500ms delay
    );
  };

  //Function to validate password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(e.target.value.length < 8);
  };

  useEffect(() => {
    console.log("user state updated", user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      alert("Please enter a valid email address.");
      return;
    }
    if (isPasswordValid) {
      alert("Please enter a valid password.");
      return;
    }
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //credentials: "include",
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    console.log("data", data.user);
    setUser(data.user);
    // console.log("user", user);
    onLogin(email);
  };

  // Clear the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return (
    <div className="container__login">
      <div className="container__login--grid">
        <div className="container__login--form">
          <span className="login__icon">*</span>
          <h5 className="sp-top-lg">Sign into Voila!</h5>
          <p className="sp-bottom-xxxl text-xs">
            New user?{" "}
            <a href="#" className="a--primary">
              Create an account
            </a>
          </p>
          <form onSubmit={handleSubmit} className="sp-lg">
            <div
              className={`input__field text-sm ${
                !isEmailValid ? "input__field--error" : ""
              }`}
            >
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <label htmlFor="email">Email</label>
              <div
                className="input__field--error-message text-xxs"
                style={{ height: "20px" }}
              >
                {!isEmailValid && "Please enter a valid email"}
              </div>
            </div>
            <div
              className={`input__field text-sm ${
                isPasswordValid ? "input__field--error" : ""
              }`}
            >
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <label htmlFor="password">Password</label>
              <div
                className="input__field--error-message text-xxs"
                style={{ height: "16px" }}
              >
                {isPasswordValid &&
                  "Please enter a valid password - min 8 characters"}
              </div>

              <span
                className="input__field--toggle-password"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={passwordVisible ? faEye : faEyeSlash} //if passwordVisible is true, show faEye, else show faEyeSlash
                  size="sm"
                  style={{ color: "#f4f2f2" }}
                />
              </span>
            </div>
            <p className="text-xs right">
              <a href="#">Forgot password?</a>
            </p>
            <button className="btn btn--primary btn--icon sp-top-sm">
              Sign in
              <span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ color: "#ffffff" }}
                />
              </span>
            </button>
          </form>
        </div>
        <div className="container__login--image"></div>
      </div>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func,
};

export default Login;
