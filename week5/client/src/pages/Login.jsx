import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authApi from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    setError("");
    try {
      e.preventDefault();
      const { data } = await authApi.login(email, password);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          token: data.data.authToken,
          user: data.data.user[0],
          refreshToken: data.data.refreshToken,
        })
      );
      navigate("/todo");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <div className='task-input'>
          <input
            id='title'
            type='email'
            placeholder='Enter email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='task-input'>
          <input
            id='description'
            type='password'
            placeholder='Enter password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className='text-orange-500 m-6'>{error}</p>
        <div className='controls' style={{ justifyContent: "space-between" }}>
          <p>
            Không có tài khoản?
            <Link to='/register'>
              <strong> Đăng ký</strong>
            </Link>
          </p>
          <button type='submit' className='add-btn'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
