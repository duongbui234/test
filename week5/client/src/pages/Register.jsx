import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authApi from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    setMessage("");
    e.preventDefault();
    try {
      await authApi.register(email, password);
      setMessage("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <div className='task-input'>
          <input
            type='email'
            placeholder='Enter email'
            name='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='task-input'>
          <input
            type='password'
            placeholder='Enter password'
            name='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className='text-orange-500 m-6'>{message}</p>
        <div className='controls' style={{ justifyContent: "space-between" }}>
          <p>
            Đã có tài khoản?
            <Link to='/login'>
              <strong> Đăng nhập</strong>
            </Link>
          </p>
          <button type='submit' className='add-btn'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
