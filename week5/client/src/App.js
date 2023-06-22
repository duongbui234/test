import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoute from "./pages/AuthRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import EditTask from "./pages/EditTask";
import { ToastContainer } from "react-toastify";

function App() {
  const isLogged = window.localStorage.getItem("userInfo");
  console.log(isLogged);
  console.log("hello");
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Navigate to='/todo' />} />
        <Route
          path='/login'
          element={isLogged ? <Navigate to='/todo' /> : <Login />}
        />
        <Route
          path='/register'
          element={isLogged ? <Navigate to='/todo' /> : <Register />}
        />
        <Route path='/todo' element={<AuthRoute />}>
          <Route path='/todo' element={<HomePage />} />
        </Route>
        <Route path='/todo/:id' element={<AuthRoute />}>
          <Route path='/todo/:id' element={<EditTask />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
