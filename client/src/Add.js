import "./App.css";
import React, { useState } from "react";
import Axios from "axios";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

function Add() {
  const [emailError, setEmailError] = useState("");
  const [email1, setEmail1] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [pass, setPass] = useState("");
  const [error] = useState(false);

  // console.log(email1,mobile1,pass)
  const handleEmailChange = (e) => {
    setEmail1(e.target.value);
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('Enter valid Email!')
    }
  };
  const handleMobileChange = (e) => {
    setMobile1(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit=()=>{
if(!email1||!mobile1||!pass)
{
    alert("Fill All The Details Carefully")
}else{
    Axios.post("http://localhost:7000/verify", {
      email: email1,
      password: pass,
    }).then((response)=>{
        if(response.data.success===false){
            Axios.post("http://localhost:7000/register",{
                email:email1,
                mobile:mobile1,
                password:pass
            }).then((response)=>{
                console.log(response)
            })
            setEmail1("");setMobile1("");setPass("");
            toast.success(response.data.message)
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        }else{
            toast.error(response.data.message)
        }
    })
}
  }

  const downkey = ["e", "E", "+", "-", "."];

  return (
    <div className="App">
      <ToastContainer style={{zIndex:"10"}}/>
      <br />
      <form
        style={{
          alignItems: "center",
          display: "flex",
          margin: "auto",
          textAlign: "center",
          justifyContent: "center",
          marginTop:'12%'
        }}
      >
        <div
          style={{
            backgroundColor: "lightgray",
            borderRadius: "20px",
            width: "50%",
          }}
        >
      <h1>Add User</h1>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            className="kush"
            placeholder="EmailId"
            value={email1}
            onChange={(e) => handleEmailChange(e)}
            style={{
            //   marginTop: "30px",
            }}
          />
          {/* <br></br> */}
          {/* <button type="button" style={{
              marginTop: "30px",
            }} disabled={mobile1.length>=11}><b>Verify</b></button> */}
          <br />
          <span style={{color:"red"}}>{emailError}</span>
          <br />
          <br />

          <TextField
            type="number"
            label="Mobile"
            variant="outlined"
            className="kush"
            placeholder="Mobile No"
            value={mobile1}
            onChange={(e) => handleMobileChange(e)}
            onKeyDown={(e) => downkey.includes(e.key) && e.preventDefault()}
          /> 
          {error || mobile1.length > 10 ? (
            <span
              style={{
                textAlign: "center",
                margin: "auto",
                display: "block",
                color: "red",
              }}
            >
              Mobile cannot be more than 10
            </span>
          ) : (
            ""
          )}
          <br/>
          <br/>
          <br/>
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
            style={{ padding: "20px", marginBottom: "25px" }}
            onClick={handleSubmit}
            disabled={
                mobile1.length>10 ||
                mobile1.length<10 ||
                pass.length<4||
                pass.length>10||
                email1.length<8
            }
          >
            Add
          </button>
          &nbsp;
          {/* <button
            type="button"
            style={{ padding: "20px", marginBottom: "25px" }} */}
            {/* // onClick={handleCheck} */}
          {/* > */}
            {/* Check
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default Add;
