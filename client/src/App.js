import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Update from "./Update";
import Add from "./Add";
// import Otp from "./Otp";
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/dashboard/update/:id" element={<Update />}></Route>
          <Route path="/dashboard/add" element={<Add />}></Route>
          {/* <Route path="/dashboard/update/otp" element={<Otp />}></Route> */}
        </Routes>
    </Router>
  );
}

export default App;
