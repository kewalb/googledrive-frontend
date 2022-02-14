import "./App.css";
import NavBar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import UserNavbar from "./components/UserNavbar";
import jwt_decode from "jwt-decode";

function App() {
  const [name, setName] = useState("");
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("username"));
  }, [name]);

  return (
    <div className="App">
      {navbar ? <UserNavbar setNavbar={setNavbar} name={name} /> : <NavBar />}
      <Routes>
        <Route
          path="/"
          element={<Login navbar={navbar} setNavbar={setNavbar} />}
        />
        <Route path="/dashboard/*" element={<RequireAuth redirectTo={'/'}> <Dashboard /> </RequireAuth> } />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/hello" element={<RequireAuth />} /> */}
      </Routes>
    </div>
  );
}

export default App;

function RequireAuth({ children, redirectTo }) {
  const token = localStorage.getItem("token") ? localStorage.getItem("token") : false;
  const getAuth = () => {
    if (token) {
      const { exp } = jwt_decode(token);
      
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  let isAuthenticated = getAuth();
  return  isAuthenticated ? children : <Navigate to={redirectTo} />;
}
