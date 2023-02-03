import Axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
function Dashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const loadData = async () => {
    const response = await Axios("http://localhost:7000/get");
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are You Sure You Want To Delete")) {
      Axios.delete(`http://localhost:7000/delete/${id}`);
      toast.success("Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div>
      <ToastContainer />
      <Link to="/dashboard/add">
        <button
          style={{
            padding: "30px 60px 30px 60px",
            marginBottom: "25px",
            display: "flex",
            margin: "auto",
            marginTop:"12px"
          }}
        >
          Add
        </button>
      </Link>
      <br />
      <table>
        <thead>
          <tr>
            <th>Email Id</th>
            <th>Mobile No.</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <>
                <tr key={item.id}>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.password}</td>
                  <td>
                    <button
                      style={{ padding: "8px" }}
                      onClick={() => navigate(`/dashboard/update/${item.id}`)}
                    >
                      Edit
                    </button>{" "}
                    &nbsp;
                    <button
                      style={{ padding: "8px" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
