// import React, { useState } from "react";
// import Axios from "axios";
// import "./App.css";
// import TextField from "@mui/material/TextField";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// function Otp() {
//   const navigate = useNavigate();
//   const [otp1, setOtp1] = useState("");
//   const handleVerify = () => {
//     Axios.post("http://localhost:7000/otpverify", {
//       otp: otp1,
//     }).then((response) => {
//       console.log(response);
//       if (response.data.success === false) {
//         // setLoginStatus(response.data.message);
//         toast.error(response.data.message);
//       } else {
//         // setLoginStatus(response.data[0]);
//         toast.success(response.data.message);
//         //   console.log(response);
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 3000);
//       }
//     });
//   };
//   return (
//     <form
//       style={{
//         alignItems: "center",
//         display: "flex",
//         margin: "auto",
//         textAlign: "center",
//         justifyContent: "center",
//         marginTop: "12%",
//       }}
//     >
//       <div
//         className="App"
//         style={{
//           backgroundColor: "lightgray",
//           borderRadius: "20px",
//           width: "30%",
//         }}
//       >
//         <ToastContainer />
//         {/* <br/> */}
//         <h1>Verify OTP</h1>
//         <TextField
//           type="text"
//           label="OTP"
//           variant="outlined"
//           className="kush"
//           value={otp1}
//           onChange={(e) => setOtp1(e.target.value)}
//           //   style={{ textAlign: "center", margin: "auto", display: "flex", marginBottom: "35px" }}
//         />
//         <br />
//         <br />
//         <button
//           onClick={handleVerify}
//           style={{ padding: "20px", marginBottom: "15px" }}
//           type="button"
//         >
//           Verify
//         </button>
//       </div>
//     </form>
//   );
// }

// export default Otp;
