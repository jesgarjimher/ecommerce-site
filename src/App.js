import './App.css';
import Header from './views/Header';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./views/Login"
import Register from "./views/Register"
import UpdateProduct from './views/UpdateProduct';
import AddProduct from "./views/AddProduct"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <h1>Ecommerce project</h1>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/updateproduct" element={<UpdateProduct/>} />
          <Route path="/addproduct" element={<AddProduct/>} />
        </Routes>
        
      </BrowserRouter>
      
     
    </div>
  );
}

export default App;
