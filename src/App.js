import './App.css';
import NavBar from './components/Navbar';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* <Route path="/create" element={ <Create/> } />
        <Route path="/list" element={ <List/> } />
        <Route path="/edit/:id" element={<Edit />}/>
        <Route path="/" exact element={ <Homepage/> } /> */}
      </Routes>
    </div>
  );
}

export default App;
