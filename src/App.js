import './App.css';
import Header from './components/Header';
import Footer from "./components/Footer";
import Home from "./pages/Home"
import Login from "./pages/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import { UserProvider } from './components/UserContext';
import EmployeePage from './pages/EmployeePage';


function App() {
  return (
    <Router>
    <div className="App">
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/employee-list" element={<EmployeePage/>}/>

        </Routes>
      </UserProvider>
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
