import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  email: "",
  mobile: "",
  password: "",
};
function Update() {
  const [kush, setKush] = useState(initialState);
  const { email, mobile, password } = kush;
  const [hidden, setHidden] = useState(false);
  const [otp2, setOtp2] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    Axios.get(`http://localhost:7000/api/get/${id}`).then((resp) => {
      if (resp.data.success === false) {
        setKush(resp.data.message);
      } else {
        setKush({ ...resp.data.result[0] });
      }
      toast.success(resp.data.message);
    });
  }, [id]);
  const handleInputChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setKush({ ...kush, [name]: value });
  };
  // console.log(setKush);
  const handleSubmit = () => {
    if (!email || !mobile || !password) {
      alert("Fill All The Details Carefully");
    } else {
      Axios.put(`http://localhost:7000/api/put/${id}`, {
        email,
        mobile,
        password,
      })
        .then(() => {
          setKush({ email: "", mobile: "", password: "" });
        })
        .catch((error) => toast.error(error.resp.data));
      toast.success("updated successfully");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  const handleOtp = () => {
    Axios.post("http://localhost:7000/otp", {});
    setHidden(!hidden);
  };
  const handleVerifyOtp = () => {
    Axios.post("http://localhost:7000/otpverify", {
      otp: otp2,
    }).then((response) => {
      console.log(response);
      if (response.data.success === false) {
        // setLoginStatus(response.data.message);
        toast.error(response.data.message);
      } else {
        // setLoginStatus(response.data[0]);
        toast.success(response.data.message);
        console.log(response);
        setHidden(!hidden);
      }
    });
  };
  return (
    <div className="App">
      <ToastContainer style={{ zIndex: "10" }} />
      <br />
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
          <h1>Update Here</h1>
          <TextField
            type="email"
            label="Email"
            name="email"
            variant="outlined"
            className="kush"
            placeholder="EmailId"
            value={email || ""}
            onChange={handleInputChange}
          />
          <br />
          <button type="button" onClick={() => handleOtp()}>
            verify
          </button>
          <br />
          {hidden && hidden ? (
            <>
              <TextField
                type="number"
                lebel="Otp"
                variant="outlined"
                className="kush"
                placeholder="Enter Otp"
                value={otp2}
                onChange={(e) => setOtp2(e.target.value)}
              />
              <br />
              <button onClick={handleVerifyOtp} type="button">
                Submit
              </button>
            </>
          ) : (
            ""
          )}
          <br />
          <br />
          <TextField
            type="number"
            label="Mobile"
            name="mobile"
            variant="outlined"
            className="kush"
            placeholder="Mobile No"
            value={mobile || ""}
            onChange={handleInputChange}
          />

          <br />
          <br />
          <br />
          <TextField
            type="text"
            label="Password"
            name="password"
            variant="outlined"
            className="kush"
            placeholder="Password"
            value={password || ""}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <br />
          <button
            type="button"
            style={{ padding: "20px", marginBottom: "25px" }}
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
export default Update;
