import './App.css';
import NavBar from './components/Navbar';
import { Routes, Route } from "react-router-dom"
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/register" element={<Register />}/>
        {/* <Route path="/" exact element={ <Homepage/> } /> */}
      </Routes>
    </div>
  );
}

export default App;
