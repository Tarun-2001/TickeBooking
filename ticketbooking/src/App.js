import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import BookingScreen from './components/bookscreen';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from './components/signup';


function App() {
  return (
    <>
    <Router>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/book" element={<BookingScreen/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<SignUp   />} />
            </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;
