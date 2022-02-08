import './App.css';
import NavBar from './components/Navbar';
import { Routes, Route } from "react-router-dom"
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={ <Login/> } />
        {/* <Route path="/list" element={ <List/> } />
        <Route path="/edit/:id" element={<Edit />}/>
        <Route path="/" exact element={ <Homepage/> } /> */}
      </Routes>
    </div>
  );
}

export default App;
