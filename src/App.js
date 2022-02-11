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
  const user = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  console.log(jwt_decode(token))
  const getAuth = () => {
    if (user && email && token) {
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
  // console.log(isAuthenticated)
  // if(isAuthenticated === false){localStorage.clear()}
  return  isAuthenticated ? children : <Navigate to={redirectTo} />;
}
