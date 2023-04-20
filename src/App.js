import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Items from './components/Items';
import MyCart from './components/MyCart';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <>
    <Navbar/>
    <div className="my-3">
      <Routes>
        <Route path="/" element={ <Items/> } />
        <Route exact path="MyCart" element={ <MyCart/> } />
      </Routes>
    </div>
    </>
  );
}

export default App;
