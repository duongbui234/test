import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const isLogged = localStorage.getItem("userInfo");
  console.log(isLogged);

  return !isLogged ? <Navigate to='/login' /> : <Outlet />;
};

export default AuthRoute;
