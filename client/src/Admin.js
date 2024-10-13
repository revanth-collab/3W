import React, { useState } from "react";
import { Link, useNavigate,Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, { expires: 30, path: '/' });
      navigate('/admin'); // Redirect to Admin Dashboard after successful login
    } else {
      setShowSubmitError(true);
      setErrorMsg(data.error_msg);
    }
  };

  const onUserPage = () => {
    navigate("/user"); // Redirect to User Form
  };

  const cookie = Cookies.get("jwt_token");
  if (cookie === undefined) {
    return (
      <div className="Admin">
        <form className="adminCard" onSubmit={submitForm}>
          <h1 className="heading">Admin Login</h1>
          <div className="input-container">
            <label htmlFor="username" className="label-element">Username:</label>
            <input type="text" id="username" className="input-element" onChange={e => setUsername(e.target.value)} placeholder="username" />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label-element">Password:</label>
            <input type="password" id="password" className="input-element" onChange={e => setPassword(e.target.value)} placeholder="password" />
          </div>
          <button className="button" type="submit">Login</button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <button type="button" className="button" onClick={onUserPage}>User Page</button>
        </form>
      </div>
    );
  }

  // If already logged in, show the Admin Dashboard
  return <Navigate to="/admin" />;
};

export default Admin;
