import { TextField } from "@mui/material";
import Axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import "./App.css";
function Login() {
  const [emailError, setEmailError] = useState("");
  const [email1, setEmail1] = useState("");
  const [pass, setPass] = useState("");
  const [error] = useState(false);

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail1(e.target.value);
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Enter valid Email!");
    }
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    Axios.post("http://localhost:7000/login", {
      email: email1,
      password: pass,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    });
  };
  return (
    <div className="App">
      <ToastContainer />
      <form
        style={{
          alignItems: "center",
          display: "flex",
          margin: "auto",
          textAlign: "center",
          justifyContent: "center",
          marginTop: "12%",
        }}
      >
        <div
          style={{
            backgroundColor: "lightgray",
            borderRadius: "20px",
            width: "50%",
          }}
        >
          <h1>Login Here</h1>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            className="kush"
            placeholder="EmailId"
            value={email1}
            onChange={(e) => handleEmailChange(e)}/>
          <br />
          <span style={{ color: "red" }}>{emailError}</span>
          <br />
          <br />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            className="kush"
            placeholder="Password"
            value={pass}
            onChange={(e) => handlePassChange(e)}
          />
          <br />
          {error || pass.length > 10 ? (
            <span
              style={{
                textAlign: "center",
                margin: "auto",
                display: "block",
                color: "red",
              }}
            >
              Password cannot be more than 10
            </span>
          ) : (
            ""
          )}
          <br />
          <br />
          <button
            type="button"
            style={{ padding: "20px" }}
            onClick={handleSubmit}
            disabled={pass.length < 4 || pass.length > 10 || email1.length < 8}
          >
            Sign Up
          </button>
          <br />
          <h3 style={{ marginTop: "15px", marginBottom: "15px" }}>
            Not Registered Yet!! :
            <b>
              <Link to="/">Sign Up</Link>
            </b>
          </h3>
        </div>
      </form>
    </div>
  );
}
export default Login;
