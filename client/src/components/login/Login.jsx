import { Alert, CircularProgress, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [err, setErr] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.status === 400 || !data) {
      // window.alert("Invalid Signin");
      setErr(true);
      console.log("Invalid Signin");
    } else {
      setLogin(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  };

  // console.log(login);
  return (
    <>
      <div className="box">
        <div className="container">
          <form method="POST">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="passwordDiv">
                <input
                  type={visibility ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  autoComplete="off"
                ></input>

{
            visibility ?
            <VisibilityIcon
              style={{fontSize:"1.9rem"}}
              onClick={() => setVisibility(!visibility)}
            />
            :
            <VisibilityOffIcon
              style={{fontSize:"1.9rem"}}
              onClick={() => setVisibility(!visibility)}
            />
          }
              </div>
            </div>
            <div className="button-container">
              <button
                disabled={loading}
                type="submit"
                name="signin"
                id="signin"
                className="auth-button"
                onClick={handleClick}
              >
                Sign In
                {loading && (
                  <div className="spinner">
                    <CircularProgress size={16} color="primary" thickness={6} />
                  </div>
                )}
              </button>
            </div>
          </form>
          <p className="redirect">
            Don't have an account? <NavLink to="/register">Register</NavLink>
          </p>
        </div>
      </div>
      {err && (
        <Snackbar
          open={err}
          autoHideDuration={2000}
          onClose={() => setErr(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            Invalid Signin
          </Alert>
        </Snackbar>
      )}
      {login && (
        <Snackbar
          open={login}
          autoHideDuration={2000}
          onClose={() => setLogin(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Login Successful
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Login;