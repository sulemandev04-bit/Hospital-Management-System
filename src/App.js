
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Component/Home";
import About from "./Component/About";
import Signin from './Component/Signin';
import Login from './Login';
import Dashboard from './Component/Dashboard';
import Payment from './Component/Payment';
import AllApointment from './Component/AllApointmet';
function App() {
  return (
    
  <div className='app-background'>
      <BrowserRouter>
      <Routes>
    
        <Route exact path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard/*" element={<Dashboard/>} />
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/appointment' element={<AllApointment/>}/>
      </Routes>
    </BrowserRouter>
  </div>

  );
}

export default App;
